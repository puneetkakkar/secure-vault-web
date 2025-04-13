import { API_ENDPOINTS } from "@/config/api-endpoints";
import { ApiService } from "@/services/api.service";
import { EncryptedString } from "@/types";
import { ServerActionResponse } from "@/types/action";
import { LoginResponse } from "../_types/auth.type";

export class AuthApiService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async sendVerificationEmail(payload: {
    email: string;
    name: string;
  }): Promise<ServerActionResponse> {
    return this.apiService.post(
      API_ENDPOINTS.AUTH.SEND_VERIFICATION_EMAIL,
      payload
    );
  }

  async verifyEmail(payload: {
    token: string;
    email: string;
  }): Promise<ServerActionResponse> {
    return this.apiService.get(API_ENDPOINTS.AUTH.VERIFY_EMAIL, payload);
  }

  async finishRegistration(payload: {
    email: string;
    masterPasswordHash: string | null;
    userKey: EncryptedString | undefined;
    pbkdf2Iterations: number;
    masterPasswordHint: string;
  }): Promise<ServerActionResponse> {
    return this.apiService.post(
      API_ENDPOINTS.AUTH.FINISH_REGISTRATION,
      payload
    );
  }

  async login(payload: {
    email: string;
    masterPasswordHash: string;
    rememberMe: boolean;
  }): Promise<ServerActionResponse<LoginResponse>> {
    return this.apiService.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  }
}
