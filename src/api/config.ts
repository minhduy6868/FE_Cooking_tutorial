export const config = {
  baseURL: 'https://jsonplaceholder.typicode.com',
  path: {
    refreshToken: 'auth/refresh-tokens',
  },
  key: {
    refreshToken: 'refresh_token', //KEY SAVED IN LOCALSTORAGE
    accessToken: 'access_token', //KEY SAVED IN LOCALSTORAGE
  },
  retryStatusCodes: [401, 403],
}
