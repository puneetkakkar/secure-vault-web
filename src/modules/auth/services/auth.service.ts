"use client";

import { PBKDF2Config } from "@/core/config/pbkdf";
import { serviceFactory } from "@/shared/services/service-factory";
import { CryptoService } from "@/shared/abstractions";
import { PBKDF2_ITERATIONS } from "@/shared/enums";
import { ApiError } from "@/shared/types/api";
import {
	finishRegistrationApiAction,
	loginApiAction,
	sendVerificationEmailApiAction,
	verifyEmailApiAction,
} from "../actions/server/auth.action";

export class AuthService {
  private cryptoService: CryptoService;

  constructor() {
    this.cryptoService = serviceFactory.getCryptoService();
  }

  async initiateRegistration(payload: { email: string; name: string }) {
    const result = await sendVerificationEmailApiAction(payload, {});

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

  async verifyEmail(payload: { token: string; email: string }) {
    const result = await verifyEmailApiAction(payload);

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

  async finishRegistration(payload: {
    email: string;
    masterPassword: string;
    masterPasswordHint: string;
    hint: string;
  }) {
    const pbkdf2Config = new PBKDF2Config(PBKDF2_ITERATIONS);
    const masterKey = await this.cryptoService.makeMasterKey(
      payload.masterPassword,
      payload.email,
      pbkdf2Config
    );
    const [newUserKey, newEncUserKey] =
      await this.cryptoService.makeUserKey(masterKey);

    if (!newUserKey || !newEncUserKey) {
      throw new Error("User key could not be created");
    }

    const masterKeyHash = await this.cryptoService.hashMasterKey(
      payload.masterPassword,
      masterKey
    );

    const { encryptedString } = newEncUserKey;

    const signupRequestPayload = {
      email: payload.email,
      masterPasswordHash: masterKeyHash,
      userKey: encryptedString,
      pbkdf2Iterations: pbkdf2Config.iterations,
      masterPasswordHint: payload.hint,
    };

    const result = await finishRegistrationApiAction(signupRequestPayload);

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

  async login(payload: {
    email: string;
    masterPassword: string;
    rememberMe: boolean;
  }) {
    const pbkdf2Config = new PBKDF2Config(PBKDF2_ITERATIONS);
    const masterKey = await this.cryptoService.makeMasterKey(
      payload.masterPassword,
      payload.email,
      pbkdf2Config
    );

    const masterKeyHash = await this.cryptoService.hashMasterKey(
      payload.masterPassword,
      masterKey
    );

    const loginRequestPayload = {
      email: payload.email,
      masterPasswordHash: masterKeyHash,
      rememberMe: payload.rememberMe,
    };

    const result = await loginApiAction(loginRequestPayload, {});

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
