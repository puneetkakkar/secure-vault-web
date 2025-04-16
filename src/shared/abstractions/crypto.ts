import { PBKDF2Config } from "@/core/config";

import { EncString } from "@/shared/models/enc-string";
import { MasterKey, UserKey } from "@/shared/types/key";
import { HashPurpose } from "../enums";

export abstract class CryptoService {
  /**
   * Generates the master key from provided password.
   * @param password The user's master password
   * @param email The user's email
   * @param PBKDFConfig The user's key derivation config
   * @returns a master key derived from the provided password
   */
  abstract makeMasterKey(
    password: string,
    email: string,
    PBKDFConfig: PBKDF2Config
  ): Promise<MasterKey>;

  abstract makeUserKey(key: MasterKey): Promise<[UserKey, EncString]>;

  abstract hashMasterKey(
    password: string,
    key: MasterKey,
    hashPurpose?: HashPurpose
  ): Promise<string>;
}
