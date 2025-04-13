import { KeyGenerationService as KeyGenerationServiceAbstraction } from "@/abstractions/key-generation";
import { PBKDF2Config } from "@/config/pbkdf";
import { PBKDF2_ITERATIONS } from "@/enums/pbkdf2.enum";
import { SymmetricCryptoKey } from "@/models/symmetric-crypto-key";
import { CryptoFunctionService } from "./crypto-function.service";
import { serviceFactory } from "./service-factory";

export class KeyGenerationService implements KeyGenerationServiceAbstraction {
  private cryptoFunctionService: CryptoFunctionService;

  constructor() {
    this.cryptoFunctionService = serviceFactory.getCryptoFunctionService();
  }

  async createKey(bitLength: 256 | 512): Promise<SymmetricCryptoKey> {
    const key = await this.cryptoFunctionService.aesGenerateKey(bitLength);

    return new SymmetricCryptoKey(key);
  }

  async deriveKeyFromPassword(
    password: string | Uint8Array,
    salt: string | Uint8Array,
    pbkdf2Config: PBKDF2Config
  ): Promise<SymmetricCryptoKey> {
    const iterations = pbkdf2Config.iterations ?? PBKDF2_ITERATIONS;
    const key = await this.cryptoFunctionService.pbkdf2(
      password,
      salt,
      "sha256",
      iterations
    );

    return new SymmetricCryptoKey(key);
  }

  async stretchKey(key: SymmetricCryptoKey): Promise<SymmetricCryptoKey> {
    const newKey = new Uint8Array(64);
    const encKey = await this.cryptoFunctionService.hkdfExpand(
      key.key,
      "enc",
      32,
      "sha256"
    );
    const macKey = await this.cryptoFunctionService.hkdfExpand(
      key.key,
      "mac",
      32,
      "sha256"
    );

    newKey.set(new Uint8Array(encKey));
    newKey.set(new Uint8Array(macKey), 32);

    return new SymmetricCryptoKey(newKey);
  }
}
