import { PBKDF2Config } from "@/config/pbkdf";

export abstract class KeyGenerationService {
  abstract deriveKeyFromPassword(
    password: string | Uint8Array,
    salt: string | Uint8Array,
    PBKDF2Config: PBKDF2Config
  ): Promise<Uint8Array>;
}
