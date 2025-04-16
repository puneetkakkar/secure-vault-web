import { Tagged } from "type-fest";

export type CsprngArray = Tagged<Uint8Array, "CSPRNG">;
