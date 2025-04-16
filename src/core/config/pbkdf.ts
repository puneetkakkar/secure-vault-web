import { PBKDF2_ITERATIONS } from "@/shared/enums";

export class PBKDF2Config {
  iterations: number;

  constructor(iterations?: number) {
    this.iterations = iterations ?? PBKDF2_ITERATIONS;
  }
}
