import { CryptoService as CryptoServiceAbstraction } from "@/abstractions/crypto";
import { PBKDF2Config } from "@/config/pbkdf";
import { HashPurpose } from "@/enums/hash-purpose";
import { EncString } from "@/models/enc-string";
import { SymmetricCryptoKey } from "@/models/symmetric-crypto-key";
import { MasterKey, UserKey } from "@/types/key";
import { Utils } from "@/utils";
import { CryptoFunctionService } from "./crypto-function";
import { EncryptService } from "./encrypt";
import { KeyGenerationService } from "./key-generation";

export class CryptoService implements CryptoServiceAbstraction {
  private keyGenerationService: KeyGenerationService;
  private encryptService: EncryptService;
  private cryptoFunctionService: CryptoFunctionService;

  constructor() {
    this.keyGenerationService = new KeyGenerationService();
    this.encryptService = new EncryptService();
    this.cryptoFunctionService = new CryptoFunctionService(window);
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
  ): Promise<string | null> {
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

    return Utils.fromBufferToB64(hash);
  }
}
