import axios from 'axios'

const API_URL = import.meta.env.VITE_API

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const refreshApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const auth = localStorage.getItem('auth')

  if (auth) {
    const session = JSON.parse(auth)

    if (session.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const sessionExpired = error.response?.status !== 401

    if (
      sessionExpired ||
      !originalRequest ||
      originalRequest._retried
    ) {
      return Promise.reject(error)
    }

    originalRequest._retried = true

    try {
      const session = await refresh()

      originalRequest.headers.Authorization =
        `Bearer ${session.accessToken}`

      return api(originalRequest)
    } catch (refreshError) {
      localStorage.removeItem('auth')
      window.location.href = '/login'

      return Promise.reject(refreshError)
    }
  },
)

let refreshPromise: Promise<any> | null = null

export async function refresh() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const auth = localStorage.getItem('auth')

      if (!auth) {
        throw new Error('Sessão não encontrada')
      }

      const session = JSON.parse(auth)

      if (!session.refreshToken) {
        throw new Error('Refresh token não encontrado')
      }

      const response = await refreshApi.post('/auth/refresh', {
        refreshToken: `Bearer ${session.refreshToken}`,
      })

      const newSession = {
        ...session,
        ...response.data,
      }

      localStorage.setItem('auth', JSON.stringify(newSession))

      return newSession
    })().finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}

export default api
