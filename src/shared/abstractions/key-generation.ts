import { PBKDF2Config } from "@/core/config";
import { SymmetricCryptoKey } from "@/shared/models/symmetric-crypto-key";

export abstract class KeyGenerationService {
  abstract deriveKeyFromPassword(
    password: string | Uint8Array,
    salt: string | Uint8Array,
    PBKDF2Config: PBKDF2Config
  ): Promise<SymmetricCryptoKey>;

  abstract createKey(bitLength: 256 | 512): Promise<SymmetricCryptoKey>;

  /**
   * Derives a 64 byte key from a 32 byte key using a key derivation function.
   * @param key 32 byte key.
   * @returns 64 byte derived key.
   */
  abstract stretchKey(key: SymmetricCryptoKey): Promise<SymmetricCryptoKey>;
}
