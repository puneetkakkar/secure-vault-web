import { API_ENDPOINTS } from "@/core/config/api-endpoints";
import { ApiService } from "@/shared/services/api.service";
import { ServerActionResponse } from "@/shared/types/action";
import { UserInfo } from "../types/user.type";

export class VaultApiService {
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
  }

  async getUserInfo(
    config: Partial<RequestInit>
  ): Promise<ServerActionResponse<UserInfo>> {
    return this.apiService.get(API_ENDPOINTS.USER.INFO, undefined, config);
  }
}
