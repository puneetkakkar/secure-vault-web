import { ApiError } from "@/shared/types/api";
import { getUserInfoApiAction } from "../actions/client/user.action";

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
