import { AuthApiService } from "@/app/[locale]/(auth)/_services/auth-api.service";
import { AuthService } from "@/app/[locale]/(auth)/_services/auth.service";
import { env } from "@/lib/env/env";
import { ApiConfig } from "@/types/api";
import { ApiService } from "./api.service";

class ServiceFactory {
  private static instance: ServiceFactory;
  private apiService: ApiService | null = null;
  private authService: AuthService | null = null;
  private authApiService: AuthApiService | null = null;
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
