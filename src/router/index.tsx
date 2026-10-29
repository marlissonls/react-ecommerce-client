
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    useLocation,
} from 'react-router'
import { useAuth } from '@/hooks/useAuth'
  
function ProtectedRoute() {
  const auth = useAuth()
  const location = useLocation()

  const requiresAuth = true
  const isAuthenticated = !auth.isJwtExpired()

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
  
function PublicRoute() {
  const auth = useAuth()
  const isAuthenticated = !auth.isJwtExpired()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
  
export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      // {
      //   path: '/login',
      //   lazy: () => import('@/pages/Login'),
      // },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      // Adicionar as rotas protegidas aqui.
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
])
  