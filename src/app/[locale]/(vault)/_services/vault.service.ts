import { ApiError } from "@/types/api";
import { getUserInfoApiAction } from "../_actions/client/user.action";

export class VaultService {
  constructor() {}

  async getUserInfo() {
    const result = await getUserInfoApiAction();

    if (!result.success) {
      throw new ApiError(
        result.message,
        result.status,
        new Date().toISOString(),
        result.code,
        result.errors
      );
    }

    return result;
  }
}
