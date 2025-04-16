import { env } from "@/core/env";
import { AuthApiService, AuthService } from "@/modules/auth";
import { VaultApiService, VaultService } from "@/modules/vault";
import { ApiConfig } from "@/shared/types/api";
import { ApiService } from "./api.service";
import { CryptoFunctionService } from "./crypto-function.service";
import { CryptoService } from "./crypto.service";
import { EncryptService } from "./encrypt.service";
import { KeyGenerationService } from "./key-generation.service";

class ServiceFactory {
  private static instance: ServiceFactory;
  private apiService: ApiService | null = null;
  private authService: AuthService | null = null;
  private authApiService: AuthApiService | null = null;
  private cryptoService: CryptoService | null = null;
  private encryptService: EncryptService | null = null;
  private keyGenerationService: KeyGenerationService | null = null;
  private cryptoFunctionService: CryptoFunctionService | null = null;
  private vaultApiService: VaultApiService | null = null;
  private vaultService: VaultService | null = null;

  private constructor() {}

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  getAuthService(): AuthService {
    if (!this.authService) {
      this.authService = new AuthService();
    }
    return this.authService;
  }

  getAuthApiService(): AuthApiService {
    if (!this.authApiService) {
      this.authApiService = new AuthApiService(this.getApiService());
    }
    return this.authApiService;
  }

  getVaultService(): VaultService {
    if (!this.vaultService) {
      this.vaultService = new VaultService();
    }
    return this.vaultService;
  }

  getVaultApiService(): VaultApiService {
    if (!this.vaultApiService) {
      this.vaultApiService = new VaultApiService(this.getApiService());
    }
    return this.vaultApiService;
  }

  getCryptoService(): CryptoService {
    if (!this.cryptoService) {
      this.cryptoService = new CryptoService();
    }
    return this.cryptoService;
  }

  getEncryptService(): EncryptService {
    if (!this.encryptService) {
      this.encryptService = new EncryptService();
    }
    return this.encryptService;
  }

  getKeyGenerationService(): KeyGenerationService {
    if (!this.keyGenerationService) {
      this.keyGenerationService = new KeyGenerationService();
    }
    return this.keyGenerationService;
  }

  getCryptoFunctionService(): CryptoFunctionService {
    if (!this.cryptoFunctionService) {
      this.cryptoFunctionService = new CryptoFunctionService();
    }
    return this.cryptoFunctionService;
  }

  private getApiService(): ApiService {
    if (!this.apiService) {
      const config: ApiConfig = {
        baseUrl: env.API_BASE_URL,
        timeout: 30000,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      this.apiService = new ApiService(config);
    }
    return this.apiService;
  }
}

export const serviceFactory = ServiceFactory.getInstance();
