import { ApiService, ApiServiceConfig } from "@/services/api.service";
import {
  SignUpRequest,
  SignupResponse,
} from "@/app/[locale]/(auth)/_models/signup.model";
import { NextResponse } from "next/server";
import { env } from "@/lib/env/env";

export class AuthApiService {
  private readonly apiServiceConfig: ApiServiceConfig;
  private apiService: ApiService;

  constructor() {
    this.apiServiceConfig = {
      baseUrl: env.API_BASE_URL,
    };
    this.apiService = new ApiService(this.apiServiceConfig);
  }

  async signupUser(
    signupRequestPayload: any,
  ): Promise<NextResponse<SignupResponse>> {
    try {
      const response = await this.apiService.post<
        SignUpRequest,
        NextResponse<SignupResponse>
      >(env.AUTH_SIGNUP_USER, signupRequestPayload);
      console.log("SignupResponse", response);

      return response;
    } catch (ex: unknown) {
      console.log("User register failed: ", ex);
      throw ex;
    }
  }
}
