import { SymmetricCryptoKey } from "@/shared/models/symmetric-crypto-key";
import { Tagged } from "type-fest";

export type UserKey = Tagged<SymmetricCryptoKey, "UserKey">;
export type MasterKey = Tagged<SymmetricCryptoKey, "MasterKey">;
