import {
    createBrowserRouter,
    Navigate,
    Outlet,
    useLocation,
} from 'react-router'
import { useAuth } from '../hooks/useAuth'
import StoreLayout from '../layouts/StoreLayouts'
import Home from '../pages/home/Home'
  
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
  return <Outlet />
}

function GuestRoute() {
  const auth = useAuth()
  const isAuthenticated = !auth.isJwtExpired()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export const router = createBrowserRouter([
  // Rotas públicas
  {
    element: <PublicRoute />,
    children: [
      // Rotas públicas: usuário logado ou deslogado.
      {
        element: <StoreLayout />,
        children: [
          { path: '/', element: <Home />, },
          // { path: '/search', element: <Search />, },
          // { path: '/products/:id', element: <Product />, },
        ],
      },

      // Rotas públicas: somente usuário deslogado.
      {
        element: <GuestRoute />,
        children: [
          // { path: '/login', element: <Login /> },
          // { path: '/register', element: <Register /> },
        ],
      },
    ],
  },

  // Rotas privadas: somente usuário autenticado.
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <StoreLayout />,
        children: [
          // { path: '/cart', element: <Cart /> },
          // { path: '/orders', element: <Orders /> },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])