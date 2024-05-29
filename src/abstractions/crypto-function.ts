import { CsprngArray } from "@/types/csprng";

export abstract class CryptoFunctionService {
  abstract pbkdf2(
    password: string | Uint8Array,
    salt: string | Uint8Array,
    algorithm: "sha256" | "sha512",
    iterations: number
  ): Promise<Uint8Array>;

  abstract aesEncrypt(
    data: Uint8Array,
    iv: Uint8Array,
    key: Uint8Array
  ): Promise<Uint8Array>;

  abstract hmac(
    value: Uint8Array,
    key: Uint8Array,
    algorithm: "sha1" | "sha256" | "sha512"
  ): Promise<Uint8Array>;

  abstract hkdfExpand(
    prk: Uint8Array,
    info: string | Uint8Array,
    outputByteSize: number,
    algorithm: "sha256" | "sha512"
  ): Promise<Uint8Array>;

  /**
   * Generates a key of the given length suitable for use in AES encryption
   */
  abstract aesGenerateKey(bitLength: 256 | 512): Promise<CsprngArray>;

  /**
   * Generates a random array of bytes of the given length. Uses a cryptographically secure random number generator.
   */
  abstract randomBytes(length: number): Promise<CsprngArray>;
}
