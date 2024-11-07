export const config = {
  baseURL: 'http://localhost:8080',
  path: {
    refreshToken: 'auth/refresh-tokens',
  },
  key: {
    refreshToken: 'refresh_token', //KEY SAVED IN LOCALSTORAGEFlocalStorage
    accessToken: 'access_token', //KEY SAVED IN LOCALSTORAGE
  },
  retryStatusCodes: [401, 403],
}
