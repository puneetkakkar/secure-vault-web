export type LoginResponse = {
  token: string;
  expiresIn: { token: number };
  /** User ID */
  userId: string;

  /** User email */
  email: string;

  /** Access token for authentication */
  accessToken: string;

  /** Refresh token for obtaining new access tokens */
  refreshToken?: string;

  /** Indicates if the user is authenticated */
  authenticated: boolean;
};
