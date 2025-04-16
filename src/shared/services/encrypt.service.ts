import { EncryptService as EncryptServiceAbstraction } from "@/shared/abstractions";
import { EncString } from "@/shared/models/enc-string";
import { EncryptedObject } from "@/shared/models/encrypted-object";
import { SymmetricCryptoKey } from "@/shared/models/symmetric-crypto-key";
import { fromBufferToB64, fromUtf8ToArray } from "@/shared/utils";
import { CryptoFunctionService } from "./crypto-function.service";
import { serviceFactory } from "./service-factory";

export class EncryptService implements EncryptServiceAbstraction {
  private cryptoFunctionService: CryptoFunctionService;

  constructor() {
    this.cryptoFunctionService = serviceFactory.getCryptoFunctionService();
  }

  private async aesEncrypt(
    data: Uint8Array,
    key: SymmetricCryptoKey
  ): Promise<EncryptedObject> {
    const obj = new EncryptedObject();
    obj.key = key;

    if (typeof obj.key?.encKey === "undefined") {
      throw new Error("Unable to find encyrption key");
    }

    obj.iv = await this.cryptoFunctionService.randomBytes(16);
    obj.data = await this.cryptoFunctionService.aesEncrypt(
      data,
      obj.iv,
      obj.key.encKey
    );

    if (obj.key.macKey != null) {
      const macData = new Uint8Array(obj.iv.byteLength + obj.data.byteLength);
      macData.set(new Uint8Array(obj.iv), 0);
      macData.set(new Uint8Array(obj.data), obj.iv.byteLength);
      obj.mac = await this.cryptoFunctionService.hmac(
        macData,
        obj.key.macKey,
        "sha256"
      );
    }

    return obj;
  }

  async encrypt(
    plainValue: string | Uint8Array,
    key: SymmetricCryptoKey
  ): Promise<EncString> {
    if (key == null) {
      throw new Error("No encryption key provided.");
    }

    if (plainValue == null) {
      return Promise.resolve(new EncString(""));
    }

    let plainBuf: Uint8Array;
    if (typeof plainValue === "string") {
      plainBuf = fromUtf8ToArray(plainValue);
    } else {
      plainBuf = plainValue;
    }

    const encObj = await this.aesEncrypt(plainBuf, key);
    const iv = fromBufferToB64(encObj.iv?.buffer as ArrayBuffer);
    const data = fromBufferToB64(encObj.data?.buffer as ArrayBuffer);
    const mac =
      encObj.mac != null
        ? fromBufferToB64(encObj.mac.buffer as ArrayBuffer)
        : undefined;

    return new EncString(encObj?.key?.encType, data, iv, mac);
  }
}
