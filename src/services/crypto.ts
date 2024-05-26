import { CryptoService as CryptoServiceAbstraction } from "@/abstractions/crypto";
import { PBKDF2Config } from "@/config/pbkdf";
import { MasterKey } from "@/types/key";
import { KeyGenerationService } from "./key-generation";

export class CryptoService implements CryptoServiceAbstraction {
  protected keyGenerationService: KeyGenerationService;
  constructor() {
    this.keyGenerationService = new KeyGenerationService();
  }

  async makeMasterKey(
    password: string,
    email: string,
    PBKDFConfig: PBKDF2Config
  ): Promise<MasterKey> {
    return (await this.keyGenerationService.deriveKeyFromPassword(
      password,
      email,
      PBKDFConfig
    )) as MasterKey;
  }
}
