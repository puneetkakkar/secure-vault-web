"use client";

import { PBKDF2Config } from "@/core/config";
import { CryptoService as CryptoServiceAbstraction } from "@/shared/abstractions";
import { HashPurpose } from "@/shared/enums";
import { EncString } from "@/shared/models/enc-string";
import { SymmetricCryptoKey } from "@/shared/models/symmetric-crypto-key";
import { MasterKey, UserKey } from "@/shared/types/key";
import { fromBufferToB64 } from "@/shared/utils";
import { CryptoFunctionService } from "./crypto-function.service";
import { EncryptService } from "./encrypt.service";
import { KeyGenerationService } from "./key-generation.service";
import { serviceFactory } from "./service-factory";

export class CryptoService implements CryptoServiceAbstraction {
  private keyGenerationService: KeyGenerationService;
  private encryptService: EncryptService;
  private cryptoFunctionService: CryptoFunctionService;

  constructor() {
    this.keyGenerationService = serviceFactory.getKeyGenerationService();
    this.encryptService = serviceFactory.getEncryptService();
    this.cryptoFunctionService = serviceFactory.getCryptoFunctionService();
  }

  private async buildProtectedSymmetricKey<T extends SymmetricCryptoKey>(
    encryptionKey: SymmetricCryptoKey,
    newSymKey: Uint8Array
  ): Promise<[T, EncString]> {
    let protectedSymKey: EncString;
    if (encryptionKey.key.byteLength === 32) {
      const stretchedEncryptionKey =
        await this.keyGenerationService.stretchKey(encryptionKey);
      protectedSymKey = await this.encryptService.encrypt(
        newSymKey,
        stretchedEncryptionKey
      );
    } else if (encryptionKey.key.byteLength === 64) {
      protectedSymKey = await this.encryptService.encrypt(
        newSymKey,
        encryptionKey
      );
    } else {
      throw new Error("Invalid key size.");
    }

    return [new SymmetricCryptoKey(newSymKey) as T, protectedSymKey];
  }

  async makeMasterKey(
    password: string,
    email: string,
    pbkdf2Config: PBKDF2Config
  ): Promise<MasterKey> {
    return (await this.keyGenerationService.deriveKeyFromPassword(
      password,
      email,
      pbkdf2Config
    )) as MasterKey;
  }

  async makeUserKey(masterKey: MasterKey): Promise<[UserKey, EncString]> {
    if (masterKey == null) {
      throw new Error("No Master Key found.");
    }

    const newUserKey = await this.keyGenerationService.createKey(512);

    return this.buildProtectedSymmetricKey(masterKey, newUserKey.key);
  }

  async hashMasterKey(
    password: string,
    key: MasterKey,
    hashPurpose?: HashPurpose
  ): Promise<string> {
    if (password == null || key == null) {
      throw new Error("Invalid parameters.");
    }

    const iterations = hashPurpose === HashPurpose.LocalAuthorization ? 2 : 1;
    const hash = await this.cryptoFunctionService.pbkdf2(
      key.key,
      password,
      "sha256",
      iterations
    );

    const hashString = fromBufferToB64(hash.buffer as ArrayBuffer);

    if (hashString == null) {
      throw new Error("Master key hash could not be created");
    }

    return hashString;
  }
}
