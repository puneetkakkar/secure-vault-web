import { KeyGenerationService as KeyGenerationServiceAbstraction } from "@/abstractions/key-generation";
import { PBKDF2Config } from "@/config/pbkdf";
import { PBKDF2_ITERATIONS } from "@/enums/pbkdf2.enum";
import { CryptoFunctionService } from "./crypto-function";

export class KeyGenerationService implements KeyGenerationServiceAbstraction {
  private cryptoFunctionService: CryptoFunctionService;

  constructor() {
    this.cryptoFunctionService = new CryptoFunctionService(window);
  }

  async deriveKeyFromPassword(
    password: string | Uint8Array,
    salt: string | Uint8Array,
    pbkdf2Config: PBKDF2Config
  ): Promise<Uint8Array> {
    const iterations = pbkdf2Config.iterations ?? PBKDF2_ITERATIONS;
    return this.cryptoFunctionService.pbkdf2(
      password,
      salt,
      "sha256",
      iterations
    );
  }
}
