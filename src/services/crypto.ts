import { CryptoService as CryptoServiceAbstraction } from "@/abstractions/crypto";
import { PBKDF2Config } from "@/config/pbkdf";
import { MasterKey } from "@/types/key";
import { KeyGenerationService } from "./key-generation";

export class CryptoService implements CryptoServiceAbstraction {
  private keyGenerationService: KeyGenerationService;

  constructor() {
    this.keyGenerationService = new KeyGenerationService();
  }

  async makeMasterKey(
    password: string,
    email: string,
    pbkdf2Config: PBKDF2Config
  ): Promise<MasterKey> {
    return (await this.keyGenerationService.deriveKeyFromPassword(
      password,
      email,
      pbkdf2Config
    )) as MasterKey;
  }
}
