import { EncryptedString } from "@/types";

export class SignUpRequest {
  masterPasswordHint: string | null;

  constructor(
    public email: string,
    public name: string,
    public masterPasswordHash: string | null,
    masterPasswordHint: string | null,
    public userKey: EncryptedString | undefined,
    public kdfIterations: number,
  ) {
    this.masterPasswordHint = masterPasswordHint ? masterPasswordHint : null;
  }
}

export interface SignupResponse {
  status: number;
}
