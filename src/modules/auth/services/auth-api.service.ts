import { API_ENDPOINTS } from "@/core/config/api-endpoints";
import { ApiService } from "@/shared/services/api.service";
import { EncryptedString } from "@/shared/types";
import { ServerActionResponse } from "@/shared/types/action";
import { LoginResponse } from "../types/auth.type";

export class AuthApiService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async sendVerificationEmail(
    payload: {
      email: string;
      name: string;
    },
    config?: Partial<RequestInit>
  ): Promise<ServerActionResponse> {
    return this.apiService.post(
      API_ENDPOINTS.AUTH.SEND_VERIFICATION_EMAIL,
      payload,
      config
    );
  }

  async verifyEmail(
    payload: {
      token: string;
      email: string;
    },
    config?: Partial<RequestInit>
  ): Promise<ServerActionResponse> {
    return this.apiService.get(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      payload,
      config
    );
  }

  async finishRegistration(
    payload: {
      email: string;
      masterPasswordHash: string | null;
      userKey: EncryptedString | undefined;
      pbkdf2Iterations: number;
      masterPasswordHint: string;
    },
    config?: Partial<RequestInit>
  ): Promise<ServerActionResponse> {
    return this.apiService.post(
      API_ENDPOINTS.AUTH.FINISH_REGISTRATION,
      payload,
      config
    );
  }

  async login(
    payload: {
      email: string;
      masterPasswordHash: string;
      rememberMe: boolean;
    },
    config?: Partial<RequestInit>
  ): Promise<ServerActionResponse<LoginResponse>> {
    return this.apiService.post(API_ENDPOINTS.AUTH.LOGIN, payload, config);
  }

  async refreshToken(
    config?: Partial<RequestInit>
  ): Promise<ServerActionResponse<LoginResponse>> {
    return this.apiService.get(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      undefined,
      config
    );
  }
}
