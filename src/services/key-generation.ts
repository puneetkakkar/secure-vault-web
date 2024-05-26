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
    PBKDF2Config: PBKDF2Config
  ): Promise<Uint8Array> {
    let key: Uint8Array;

    if (PBKDF2Config.iterations == null) {
      PBKDF2Config.iterations = PBKDF2_ITERATIONS;
    }

    key = await this.cryptoFunctionService.pbkdf2(
      password,
      salt,
      "sha256",
      PBKDF2Config.iterations
    );

    return key;
  }
}
