import { StorageService } from "@/shared/abstractions";
import { StorageType } from "@/shared/enums";
import { WebStorageService } from "./storage.service";

export default class ClientServiceFactory {
  private static instance: ClientServiceFactory;
  private isClient: boolean = false;
  private localStorageService: StorageService | null = null;
  private sessionStorageService: StorageService | null = null;
  private cookieStorageService: StorageService | null = null;

  private constructor() {
    if (typeof window !== "undefined") {
      this.isClient = true;
    }
  }

  static getInstance(): ClientServiceFactory {
    if (!ClientServiceFactory.instance) {
      ClientServiceFactory.instance = new ClientServiceFactory();
    }
    return ClientServiceFactory.instance;
  }

  getLocalStorageService(): StorageService | null {
    if (this.isClient && !this.localStorageService) {
      this.localStorageService = new WebStorageService(StorageType.LOCAL);
    }
    return this.localStorageService;
  }

  getSessionStorageService(): StorageService | null {
    if (this.isClient && !this.sessionStorageService) {
      this.sessionStorageService = new WebStorageService(StorageType.SESSION);
    }
    return this.sessionStorageService;
  }

  getCookieStorageService(): StorageService | null {
    if (this.isClient && !this.cookieStorageService) {
      this.cookieStorageService = new WebStorageService(StorageType.COOKIE);
    }
    return this.cookieStorageService;
  }
}
