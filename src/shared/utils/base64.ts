export function fromBufferToB64(buffer: ArrayBufferLike | null): string | null {
  if (!buffer) return null;

  const binary = String.fromCharCode(...new Uint8Array(buffer));
  return typeof window !== "undefined"
    ? btoa(binary)
    : Buffer.from(binary, "binary").toString("base64");
}

export function fromB64ToArray(str: string): Uint8Array {
  if (!str) return new Uint8Array();

  const binary =
    typeof window !== "undefined"
      ? atob(str)
      : Buffer.from(str, "base64").toString("binary");
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
