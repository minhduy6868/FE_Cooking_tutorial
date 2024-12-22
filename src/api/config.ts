export const config = {
  baseURL: 'http://localhost:8080',
  path: {
    refreshToken: 'auth/refresh-tokens',
  },
  key: {
    refreshToken: 'refresh_token',
    accessToken: 'access_token',
  },
  retryStatusCodes: [401, 403],
}
