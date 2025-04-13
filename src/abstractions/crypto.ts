import { PBKDF2Config } from "@/config/pbkdf";
import { HashPurpose } from "@/enums/hash-purpose.enum";
import { EncString } from "@/models/enc-string";
import { MasterKey, UserKey } from "@/types/key";

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
