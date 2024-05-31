import { PBKDF2Config } from "@/config/pbkdf";
import { PBKDF2_ITERATIONS } from "@/enums/pbkdf2.enum";
import { CryptoService } from "@/services/crypto";
import { SignUpRequest } from "../model/signup";

export class SignupService {
  protected cryptoService: CryptoService;

  constructor() {
    this.cryptoService = new CryptoService();
  }

  async buildSignupRequest(
    email: string,
    masterPassword: string,
    name: string,
    hint: string
  ) {
    const pbkdf2Config = new PBKDF2Config(PBKDF2_ITERATIONS);
    const masterKey = await this.cryptoService.makeMasterKey(
      masterPassword,
      email,
      pbkdf2Config
    );
    const userKey = await this.cryptoService.makeUserKey(masterKey);
    const masterKeyHash = await this.cryptoService.hashMasterKey(
      masterPassword,
      masterKey
    );

    const request = new SignUpRequest(
      email,
      name,
      masterKeyHash,
      hint,
      userKey[1].encryptedString,
      pbkdf2Config.iterations
    );

    console.log("request", request);
  }
}
