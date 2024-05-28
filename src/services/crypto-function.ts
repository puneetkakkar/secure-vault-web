import { CryptoFunctionService as CryptoFunctionServiceAbstraction } from "@/abstractions/crypto-function";
import { Utils } from "@/utils";

export class CryptoFunctionService implements CryptoFunctionServiceAbstraction {
  private crypto: Crypto;
  private subtle: SubtleCrypto;

  constructor(globalContext: Window | typeof global) {
    this.crypto = globalContext.crypto ?? null;
    this.subtle = this.crypto.subtle ?? null;
  }

  private toBuffer(value: string | Uint8Array): Uint8Array {
    if (typeof value === "string") {
      return Utils.fromUtf8ToArray(value);
    }

    return value;
  }

  private toWebCryptoAlgorithm(algorithm: "sha256" | "sha512"): string {
    return algorithm === "sha256" ? "SHA-256" : "SHA-512";
  }

  async pbkdf2(
    password: string | Uint8Array,
    salt: string | Uint8Array,
    algorithm: "sha256" | "sha512",
    iterations: number
  ): Promise<Uint8Array> {
    const keyLength = algorithm === "sha256" ? 256 : 512;
    const passwordBuffer = this.toBuffer(password);
    const saltBuffer = this.toBuffer(salt);

    const importedKey = await this.subtle.importKey(
      "raw",
      passwordBuffer,
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );

    const params = {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations,
      hash: { name: this.toWebCryptoAlgorithm(algorithm) },
    };
    const derivation = await this.subtle.deriveBits(
      params,
      importedKey,
      keyLength
    );

    return new Uint8Array(derivation);
  }
}
