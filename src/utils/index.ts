export class Utils {
  static inited = false;
  static global: typeof global;
  static isBrowser = true;

  static init() {
    if (Utils.inited) {
      return;
    }

    Utils.inited = true;
    Utils.isBrowser = typeof window !== "undefined";

    if (Utils.isBrowser) {
      Utils.global = window;
    }
  }

  static fromUtf8ToArray(str: string): Uint8Array {
    const textEncoder = new TextEncoder();
    const arr = textEncoder.encode(str);

    return arr;
  }

  static fromBufferToB64(buffer: ArrayBuffer | null): string | null {
    if (buffer == null) {
      return null;
    }

    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return Utils.global.btoa(binary);
  }

  static fromB64ToArray(str: string): Uint8Array {
    if (str == null) {
      return new Uint8Array();
    }

    const binaryString = Utils.global.atob(str);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  static concatenateUint8Arrays(arrays: Uint8Array[]): Uint8Array {
    let totalLength = 0;
    for (const array of arrays) {
      totalLength += array.length;
    }

    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const array of arrays) {
      result.set(array, offset);
      offset += array.length;
    }
    return result;
  }
}

Utils.init();
