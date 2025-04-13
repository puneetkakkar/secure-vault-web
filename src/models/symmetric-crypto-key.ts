import { EncryptionType } from "@/enums/encryption-type.enum";
import { Utils } from "@/utils";

export class SymmetricCryptoKey {
  key: Uint8Array;
  encKey?: Uint8Array;
  macKey?: Uint8Array;
  encType: EncryptionType;

  keyB64: string | null = null;
  encKeyB64: string | null = null;
  macKeyB64: string | null = null;

  meta: any;

  constructor(key: Uint8Array, encType?: EncryptionType) {
    if (key == null) {
      throw new Error("Must provide key");
    }

    if (encType == null) {
      if (key.byteLength === 32) {
        encType = EncryptionType.AesCbc256_B64;
      } else if (key.byteLength === 64) {
        encType = EncryptionType.AesCbc256_HmacSha256_B64;
      } else {
        throw new Error("Unable to determine encType.");
      }
    }

    this.key = key;
    this.encType = encType;

    if (encType === EncryptionType.AesCbc256_B64 && key.byteLength === 32) {
      this.encKey = key;
      this.macKey = new Uint8Array();
    } else if (
      encType === EncryptionType.AesCbc128_HmacSha256_B64 &&
      key.byteLength === 32
    ) {
      this.encKey = key.slice(0, 16);
      this.macKey = key.slice(16, 32);
    } else if (
      encType === EncryptionType.AesCbc256_HmacSha256_B64 &&
      key.byteLength === 64
    ) {
      this.encKey = key.slice(0, 32);
      this.macKey = key.slice(32, 64);
    } else {
      throw new Error("Unsupported encType/key length.");
    }

    if (this.key != null) {
      this.keyB64 = Utils.fromBufferToB64(this.key);
    }
    if (this.encKey != null) {
      this.encKeyB64 = Utils.fromBufferToB64(this.encKey);
    }
    if (this.macKey != null) {
      this.macKeyB64 = Utils.fromBufferToB64(this.macKey);
    }
  }

  toJSON() {
    return { keyB64: this.keyB64 };
  }

  // static fromString(s: string): SymmetricCryptoKey {
  //   if (s == null) {
  //     return new SymmetricCryptoKey(new Uint8Array());
  //   }

  //   const arrayBuffer = Utils.fromB64ToArray(s);
  //   return new SymmetricCryptoKey(arrayBuffer);
  // }

  // static fromJSON(obj: Jsonify<SymmetricCryptoKey>): SymmetricCryptoKey {
  //   return SymmetricCryptoKey.fromString(obj?.keyB64);
  // }
}
