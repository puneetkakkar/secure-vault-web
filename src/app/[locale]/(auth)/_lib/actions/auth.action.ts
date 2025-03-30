"use server";

import { AuthApiService } from "@/app/[locale]/(auth)/_services/auth-api.service";
import {
  SignUpRequest,
  SignupResponse,
} from "@/app/[locale]/(auth)/_models/signup.model";
import { NextResponse } from "next/server";

export async function signupUserAction(
  signupRequestPayload: any,
): Promise<NextResponse<SignupResponse>> {
  try {
    const authApiService = new AuthApiService();
    return await authApiService.signupUser(signupRequestPayload);
  } catch (ex: any) {
    console.error(ex);
    throw ex;
  }
}
