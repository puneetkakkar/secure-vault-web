export const API_ENDPOINTS = {
  AUTH: {
    SEND_VERIFICATION_EMAIL: "/v1/auth/send-email-verification",
    LOGIN: "/v1/auth/login",
    REGISTER: "/v1/auth/register",
    LOGOUT: "/v1/auth/logout",
    REFRESH_TOKEN: "/v1/auth/refresh-token",
  },
  // USER: {
  //   PROFILE: "/v1/user/profile",
  //   UPDATE_PROFILE: "/v1/user/profile",
  //   CHANGE_PASSWORD: "/v1/user/change-password",
  // },
  // VAULT: {
  //   LIST: "/v1/vault",
  //   CREATE: "/v1/vault",
  //   GET: (id: string) => `/v1/vault/${id}`,
  //   UPDATE: (id: string) => `/v1/vault/${id}`,
  //   DELETE: (id: string) => `/v1/vault/${id}`,
  //   SHARE: (id: string) => `/v1/vault/${id}/share`,
  // },
  // SHARED: {
  //   LIST: "/v1/shared",
  //   ACCEPT: (id: string) => `/v1/shared/${id}/accept`,
  //   REJECT: (id: string) => `/v1/shared/${id}/reject`,
  // },
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS;
