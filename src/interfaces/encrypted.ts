import { EncryptionType } from "@/enums/encryption-type.enum";

export interface Encrypted {
  encryptionType?: EncryptionType;
  dataBytes: Uint8Array;
  macBytes: Uint8Array;
  ivBytes: Uint8Array;
}
