import { useCallback, useState } from 'react'
import { refresh } from '@/api'

const publicRoutes = [
  'Login',
  'Register',
  'Home',
  'Catalog',
  'Category',
  'Product',
]

const customerRoutes = [
  'Customer',
  // 'ShoppingCart',
  // 'Checkout',
  // 'Orders',
]

const managerRoutes = [
  'Customer', // Temporário
  'ProductsManagement',
  'ProductsManagementDetails',
  // 'CategoryManagement',
  // 'CategoryManagementDetails',
  // 'BrandManagement',
  // 'BrandManagementDetails'
]

const adminRoutes = [
  // 'UserManagement',
  // 'UserManagementDetails',
  // 'RoleManagement',
  // 'RoleManagementDetails'
]

const rolePermissions: Record<string, string[]> = {
  ROLE_CUSTOMER: [...publicRoutes, ...customerRoutes],
  ROLE_MANAGER: [...publicRoutes, ...managerRoutes],
  ROLE_ADMIN: [...publicRoutes, ...adminRoutes],
}

export interface IUser {
  id: string
  name: string
  email: string
  roles: string[]
  accessToken: string
  refreshToken: string
}

const emptyUser: IUser = {
  id: '',
  name: '',
  email: '',
  roles: ['ROLE_CUSTOMER'],
  accessToken: '',
  refreshToken: '',
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

  const saveSession = useCallback((session: IUser) => {
    localStorage.setItem('auth', JSON.stringify(session))
    setUser(session)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('auth')
    setUser(emptyUser)
  }, [])

  const hasPermission = useCallback(
    (resource: string) =>
      user.roles.some((role) =>
        rolePermissions[role]?.includes(resource)
      ),
    [user.roles],
  )

  const isSessionExpired = useCallback((): boolean => {
    if (!user.accessToken) return true

    try {
      const [, payload] = user.accessToken.split('.')

      if (!payload) {
        logout()
        return true
      }

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

      if (typeof exp !== 'number') {
        logout()
        return true
      }

      return Math.floor(Date.now() / 1000) >= exp
    } catch {
      logout()
      return true
    }
  }, [user.accessToken, logout])

  const refreshSession = useCallback(async () => {
    try {
      const session = await refresh()
      setUser(session)
      return true
    } catch {
      logout()
      return false
    }
  }, [logout])
  
  const verifySession = useCallback(async () => {
    if (!isSessionExpired()) {
      return true
    }
  
    return await refreshSession()
  }, [isSessionExpired, refreshSession])

  return {
    user,
    saveSession,
    hasPermission,
    verifySession,
    isSessionExpired,
    refreshSession,
    logout,
  }
}
