"use client";

import { ApiError } from "@/types/api";
import { sendVerificationEmailApiAction } from "../_lib/actions/auth.action";

export class AuthService {
  async initiateSignup(payload: { email: string; name: string }) {
    const result = await sendVerificationEmailApiAction(payload);

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

  // async signupUser(
  // email: string,
  // masterPassword: string,
  // name: string,
  // hint: string,
  // ) {
  // const pbkdf2Config = new PBKDF2Config(PBKDF2_ITERATIONS);
  // const masterKey = await this.cryptoService.makeMasterKey(
  //   masterPassword,
  //   email,
  //   pbkdf2Config,
  // );
  // const [newUserKey, newEncUserKey] =
  //   await this.cryptoService.makeUserKey(masterKey);

  // if (!newUserKey || !newEncUserKey) {
  //   throw new Error("User key could not be created");
  // }

  // const masterKeyHash = await this.cryptoService.hashMasterKey(
  //   masterPassword,
  //   masterKey,
  // );

  // const { encryptedString } = newEncUserKey;
  // const signupRequest = this.buildSignupRequest(
  //   email,
  //   name,
  //   masterKeyHash,
  //   hint,
  //   encryptedString,
  //   pbkdf2Config.iterations,
  // );

  // const signUpRequest = new SignUpRequest(email, name);

  // const actionWithExtraParameters = signupUserAction.bind(
  //   null,
  //   signUpRequest.toJSON(),
  // );

  // return await actionWithExtraParameters();
  // }

  // private buildSignupRequest(
  //   email: string,
  //   name: string,
  //   masterKeyHash: string | null,
  //   hint: string,
  //   encryptedUserKey: EncryptedString | undefined,
  //   pbkdf2Iterations: number,
  // ) {
  //   return new SignUpRequest(
  //     email,
  //     name,
  //     masterKeyHash,
  //     hint,
  //     encryptedUserKey,
  //     pbkdf2Iterations,
  //   );
  // }
}
