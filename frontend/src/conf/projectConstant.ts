export enum DefaultRoutes {
  Root = '/',
  users = '/users',
  History = '/history',
  Profile = '/profile',
}

const baseUrl = import.meta.env.VITE_APP_API_URL

export const apis = {
  GET_RANDOM_USERS: (query: string): string =>
    `${baseUrl}/users?result=${query}`,
  CREATE_USER: (query: string): string => `${baseUrl}/history/user?id=${query}`,
  UPDATE_USER: (query: string): string => `${baseUrl}/history/user?id=${query}`,
  DELETE_USER: (query: string): string => `${baseUrl}/history/user?id=${query}`,
  GET_ALL_HISTORY_USERS: `${baseUrl}/history/users`,
}
