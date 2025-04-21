export enum StorageType {
  LOCAL = "localStorage",
  SESSION = "sessionStorage",
  COOKIE = "cookie",
}

export enum LocalStorageKey {}

export enum SessionStorageKey {
  ACCESS_TOKEN = "sv.atkn",
}

export enum CookieKey {
  REFRESH_TOKEN = "sv.rftkn",
}
