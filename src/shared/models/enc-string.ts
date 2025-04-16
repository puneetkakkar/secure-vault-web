import { EncryptionType } from "@/shared/enums";
import { Encrypted, EncryptedString } from "@/shared/types";
import { fromB64ToArray } from "@/shared/utils";
import { Jsonify } from "type-fest";

export class EncString implements Encrypted {
  encryptedString?: EncryptedString;
  encryptionType?: EncryptionType;
  decryptedValue?: string;
  data?: string | null;
  iv?: string | null;
  mac?: string | null;

  constructor(
    encryptedStringOrType: string | EncryptionType | undefined,
    data?: string | null,
    iv?: string | null,
    mac?: string | null
  ) {
    if (data != null) {
      this.initFromData(encryptedStringOrType as EncryptionType, data, iv, mac);
    }
  }

  get ivBytes(): Uint8Array {
    return this.iv == null ? new Uint8Array() : fromB64ToArray(this.iv);
  }

  get macBytes(): Uint8Array {
    return this.mac == null ? new Uint8Array() : fromB64ToArray(this.mac);
  }

  get dataBytes(): Uint8Array {
    return this.data == null ? new Uint8Array() : fromB64ToArray(this.data);
  }

  toJSON() {
    return this.encryptedString as string;
  }

  static fromJSON(obj: Jsonify<EncString>): EncString {
    if (obj == null) {
      return new EncString("");
    }

    return new EncString(obj);
  }

  private initFromData(
    encType: EncryptionType,
    data: string,
    iv: string | undefined | null,
    mac: string | undefined | null
  ) {
    if (iv != null) {
      this.encryptedString = (encType +
        "." +
        iv +
        "|" +
        data) as EncryptedString;
    } else {
      this.encryptedString = (encType + "." + data) as EncryptedString;
    }

    if (mac != null) {
      this.encryptedString = (this.encryptedString +
        "|" +
        mac) as EncryptedString;
    }

    this.encryptionType = encType;
    this.data = data;
    this.iv = iv;
    this.mac = mac;
  }
}
