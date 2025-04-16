import { EncryptionType } from "@/shared/enums";
import { Tagged } from "type-fest";

export type EncryptedString = Tagged<string, "EncString">;

export interface Encrypted {
  encryptionType?: EncryptionType;
  dataBytes: Uint8Array;
  macBytes: Uint8Array;
  ivBytes: Uint8Array;
}
