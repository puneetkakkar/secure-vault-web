import { EncString } from "@/models/enc-string";
import { SymmetricCryptoKey } from "@/models/symmetric-crypto-key";

export abstract class EncryptService {
  abstract encrypt(
    plainValue: string | Uint8Array,
    key: SymmetricCryptoKey
  ): Promise<EncString>;
}
