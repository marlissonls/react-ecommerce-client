
import { useCallback, useState } from 'react'

const baseRoutes = [
  'Home',
  'Products',
  'ProductDetails',
  'Cart',
  'UserProfile',
]

const adminRoutes = [
  'Dashboard',
  'ProductsManagement',
  'CategoriesManagement',
  'OrdersManagement',
  'UsersManagement',
]

const rolePermissions: Record<string, string[]> = {
  ADMIN: [...baseRoutes, ...adminRoutes],
  CUSTOMER: [...baseRoutes],
  DEFAULT: [],
}

interface Company {
  _id: string
  name: string
  cnpj: string
}

export interface IUser {
  _id: string
  name: string
  email: string
  role: string
  AccessToken: string
  RefreshToken: string
  company?: Company
}

const emptyUser: IUser = {
  _id: '',
  name: '',
  email: '',
  role: 'DEFAULT',
  AccessToken: '',
  RefreshToken: '',
}

function getStoredUser(): IUser {
  try {
    const auth = localStorage.getItem('auth')

    if (!auth) return emptyUser

    return {
      ...emptyUser,
      ...JSON.parse(auth),
    }
  } catch {
    return emptyUser
  }
}

export function useAuth() {
  const [user, setUser] = useState<IUser>(getStoredUser)

  const hasPermission = useCallback(
    (resource: string) => {
      return rolePermissions[user.role]?.includes(resource) ?? false
    },
    [user.role],
  )

  const isJwtExpired = useCallback((): boolean => {
    if (!user.AccessToken) return true

    try {
      const [, payload] = user.AccessToken.split('.')

      if (!payload) return true

      const normalizedPayload = payload
        .replace(/-/g, '+')
        .replace(/_/g, '/')

      const decodedPayload = atob(
        normalizedPayload.padEnd(
          normalizedPayload.length +
            ((4 - (normalizedPayload.length % 4)) % 4),
          '=',
        ),
      )

      const { exp } = JSON.parse(decodedPayload)

      if (typeof exp !== 'number') return true

      return Math.floor(Date.now() / 1000) >= exp
    } catch {
      return true
    }
  }, [user.AccessToken])

  const saveSession = useCallback((session: IUser) => {
    localStorage.setItem('auth', JSON.stringify(session))
    setUser(session)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('auth')
    setUser(emptyUser)
  }, [])

  return {
    user,
    hasPermission,
    isJwtExpired,
    saveSession,
    logout,
  }
}
