import { SymmetricCryptoKey } from "./symmetric-crypto-key";

export class EncryptedObject {
  iv: Uint8Array | null = null;
  data: Uint8Array | null = null;
  mac: Uint8Array | null = null;
  key: SymmetricCryptoKey | null = null;
}
