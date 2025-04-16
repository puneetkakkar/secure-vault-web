export class UnhandledError extends Error {
  constructor(
    public message: string,
    public status: number,
    public timestamp: string,
    public code: string
  ) {
    super(message);
    this.name = "UnhandledError";
  }
}
