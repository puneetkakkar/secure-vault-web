import { EncString } from "@/shared/models/enc-string";
import { SymmetricCryptoKey } from "@/shared/models/symmetric-crypto-key";

export abstract class EncryptService {
  abstract encrypt(
    plainValue: string | Uint8Array,
    key: SymmetricCryptoKey
  ): Promise<EncString>;
}
