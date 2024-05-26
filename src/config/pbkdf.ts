import { PBKDF2_ITERATIONS } from "@/enums/pbkdf2.enum";

export class PBKDF2Config {
  iterations: number;

  constructor(iterations?: number) {
    this.iterations = iterations ?? PBKDF2_ITERATIONS;
  }
}
