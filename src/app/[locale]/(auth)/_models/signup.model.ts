import { EncryptedString } from "@/types";

export class SignUpRequest {
  // masterPasswordHint: string | null;

  constructor(
    public email: string,
    public name: string,
    // public masterPasswordHash: string | null,
    // masterPasswordHint: string | null,
    // public userKey: EncryptedString | undefined,
    // public kdfIterations: number,
  ) {
    // this.masterPasswordHint = masterPasswordHint ? masterPasswordHint : null;
  }

  toJSON() {
    return {
      email: this.email,
      name: this.name,
      // masterPasswordHash: this.masterPasswordHash,
      // masterPasswordHint: this.masterPasswordHint,
      // userKey: this.userKey,
      // kdfIterations: this.kdfIterations,
    };
  }
}

export interface SignupResponse {
  status: number;
}
