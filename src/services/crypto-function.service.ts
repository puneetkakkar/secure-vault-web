"use client";

import { CryptoFunctionService as CryptoFunctionServiceAbstraction } from "@/abstractions/crypto-function";
import { CsprngArray } from "@/types/csprng";
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
    iterations: number,
  ): Promise<Uint8Array> {
    const keyLength = algorithm === "sha256" ? 256 : 512;
    const passwordBuffer = this.toBuffer(password);
    const saltBuffer = this.toBuffer(salt);

    const importedKey = await this.subtle.importKey(
      "raw",
      passwordBuffer,
      { name: "PBKDF2" },
      false,
      ["deriveBits"],
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
      keyLength,
    );

    return new Uint8Array(derivation);
  }

  async aesGenerateKey(bitLength = 256 | 512): Promise<CsprngArray> {
    if (bitLength === 512) {
      // As 512 bit keys are not supported in WebCrypto, so we concat two 256 bit keys
      const key1 = await this.aesGenerateKey(256);
      const key2 = await this.aesGenerateKey(256);
      return Utils.concatenateUint8Arrays([key1, key2]) as CsprngArray;
    }

    const aesParams = {
      name: "AES-CBC",
      length: bitLength,
    };

    const key = await this.subtle.generateKey(aesParams, true, [
      "encrypt",
      "decrypt",
    ]);

    const rawKey = await this.subtle.exportKey("raw", key);

    return new Uint8Array(rawKey) as CsprngArray;
  }

  async aesEncrypt(
    data: Uint8Array,
    iv: Uint8Array,
    key: Uint8Array,
  ): Promise<Uint8Array> {
    const impKey = await this.subtle.importKey(
      "raw",
      key,
      { name: "AES-CBC" } as any,
      false,
      ["encrypt"],
    );
    const encryptedBuffer = await this.subtle.encrypt(
      { name: "AES-CBC", iv: iv },
      impKey,
      data,
    );
    return new Uint8Array(encryptedBuffer);
  }

  async hmac(
    value: Uint8Array,
    key: Uint8Array,
    algorithm: "sha256" | "sha512",
  ): Promise<Uint8Array> {
    const signingAlgorithm = {
      name: "HMAC",
      hash: { name: this.toWebCryptoAlgorithm(algorithm) },
    };

    const impKey = await this.subtle.importKey(
      "raw",
      key,
      signingAlgorithm,
      false,
      ["sign"],
    );
    const signedBuffer = await this.subtle.sign(
      signingAlgorithm,
      impKey,
      value,
    );
    return new Uint8Array(signedBuffer);
  }

  /**
   * This function expands the key using the Hash based
   * key derivation function to desired outputByteSize.
   * Reference for its algorithm - https://datatracker.ietf.org/doc/html/rfc5869
   * @param prk
   * @param info
   * @param outputByteSize
   * @param algorithm
   * @returns
   */
  async hkdfExpand(
    prk: Uint8Array,
    info: string | Uint8Array,
    outputByteSize: number,
    algorithm: "sha256" | "sha512",
  ): Promise<Uint8Array> {
    const hashLen = algorithm === "sha256" ? 32 : 64;
    if (outputByteSize > 255 * hashLen) {
      throw new Error("outputByteSize is too large.");
    }

    const prkArr = new Uint8Array(prk);
    if (prkArr.length < hashLen) {
      throw new Error("prk is too small.");
    }

    const infoBuf = this.toBuffer(info);
    const infoArr = new Uint8Array(infoBuf);

    let runningOkmLength = 0;
    let previousT = new Uint8Array(0);
    const n = Math.ceil(outputByteSize / hashLen);
    const okm = new Uint8Array(n * hashLen);
    for (let i = 0; i < n; i++) {
      const t = new Uint8Array(previousT.length + infoArr.length + 1);
      t.set(previousT);
      t.set(infoArr, previousT.length);
      t.set([i + 1], t.length - 1);
      previousT = new Uint8Array(await this.hmac(t, prk, algorithm));
      okm.set(previousT, runningOkmLength);
      runningOkmLength += previousT.length;

      if (runningOkmLength >= outputByteSize) {
        break;
      }
    }

    return okm.slice(0, outputByteSize);
  }

  randomBytes(length: number): Promise<CsprngArray> {
    const arr = new Uint8Array(length);
    this.crypto.getRandomValues(arr);
    return Promise.resolve(arr as CsprngArray);
  }
}
