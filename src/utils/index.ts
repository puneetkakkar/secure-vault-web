export class Utils {
  static fromUtf8ToArray(str: string): Uint8Array {
    const textEncoder = new TextEncoder();
    const arr = textEncoder.encode(str);

    return arr;
  }
}
