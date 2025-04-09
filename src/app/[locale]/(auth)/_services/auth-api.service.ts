import { API_ENDPOINTS } from "@/config/api-endpoints";
import { ApiService } from "@/services/api.service";
import { ServerActionResponse } from "@/types/action";

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
}
