import { StorageItem } from "@/shared/types/storage";

export abstract class StorageService {
  protected abstract storage: Storage | null;

  abstract set<T>(key: string, value: T): void;

  abstract get<T>(key: string): T | null;

  abstract remove(key: string): void;

  abstract clear(): void;

  // This method is used to add metadata to the value before storing it in the storage.
  protected serializeValue<T>(value: T): StorageItem<T> {
    return {
      value,
    };
  }
}
