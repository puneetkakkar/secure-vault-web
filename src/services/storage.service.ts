import { StorageService } from "@/abstractions/storage.abstraction";
import { StorageType } from "@/enums/storage.enum";
import { StorageItem } from "@/types/storage";

export class WebStorageService extends StorageService {
  protected storage: Storage | null = null;

  constructor(storageType: StorageType = StorageType.LOCAL) {
    super();

    if (typeof window === "undefined") {
      console.warn(
        "WebStorageService instantiated in a non-browser environment."
      );
      return;
    }

    this.storage =
      storageType === StorageType.LOCAL ? localStorage : sessionStorage;
  }

  set<T>(key: string, value: T): void {
    if (!this.storage) return;

    const serializedItem = this.serializeValue(value);
    try {
      this.storage.setItem(key, JSON.stringify(serializedItem));
    } catch (error) {
      console.error("Failed to set item in storage:", error);
    }
  }

  get<T>(key: string): T | null {
    if (!this.storage) return null;

    const itemString = this.storage.getItem(key);
    if (!itemString) return null;

    try {
      const item: StorageItem<T> = JSON.parse(itemString);

      return item.value;
    } catch (error) {
      console.error("Error parsing storage item:", error);
      return null;
    }
  }

  remove(key: string): void {
    if (!this.storage) return;
    this.storage.removeItem(key);
  }

  clear(): void {
    if (!this.storage) return;
    this.storage.clear();
  }
}
