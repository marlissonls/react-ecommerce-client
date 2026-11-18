import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
  useMatches
} from 'react-router'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import StoreLayout from '@/layouts/StoreLayout'
import Home from '@/pages/public/Home'
import Category from '@/pages/public/Category'
import Catalog from '@/pages/public/Catalog'
import ManagerLayout from '@/layouts/ManagerLayout'
import ProductManagement from '@/pages/manager/ProductManagement'
import ProductManagementDetails from '@/pages/manager/ProductManagementDetails'
import AuthLayout from '@/layouts/AuthLayout'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import Product from '@/pages/public/Product'
import Customer from '@/pages/customer/Customer'
import CustomerLayout from '@/layouts/CustomerLayout'
import ShoppingCart from '@/pages/customer/ShoppingCart'
import Checkout from '@/pages/customer/Checkout'
import OrderConfirmation from '@/pages/customer/OrderConfirmation'
  
function ProtectedRoute() {
  const auth = useAuth()
  const location = useLocation()
  const matches = useMatches()

  const [isVerified, setIsVerified] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    auth.verifySession().then((result) => {
      setIsAuthenticated(result)
      setIsVerified(true)
    })
  }, [])

  if (!isVerified) return null

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  const resource = matches.at(-1)?.handle as string | undefined

  if (resource && !auth.hasPermission(resource)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
  
function PublicRoute() {
  return <Outlet />
}

function GuestRoute() {
  const auth = useAuth()
  const [isVerified, setIsVerified] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    auth.verifySession().then((result) => {
      setIsAuthenticated(result)
      setIsVerified(true)
    })
  }, [])

  if (!isVerified) return null

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
      // Rotas públicas: somente usuário deslogado.
      {
        element: <GuestRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { 
                path: 'login',
                element: <Login />,
                handle: 'Login'
              },
              { 
                path: 'register',
                element: <Register />,
                handle: 'Register'
              },
            ]
          }
        ],
      },

      // Rotas públicas: usuário logado ou deslogado.
      {
        element: <StoreLayout />,
        children: [
          {
            path: '/',
            element: <Home />,
            handle: 'Home',
          },
          {
            path: 'categoria/:slug',
            element: <Category />,
            handle: 'Category',
          },
          {
            path: 'catalogo',
            element: <Catalog />,
            handle: 'Catalog',
          },
          {
            path: 'produtos/:slug',
            element: <Product />,
            handle: 'Product',
          },
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
          {
            path: '/carrinho',
            element: <ShoppingCart />,
            handle: 'ShoppingCart'
          },
          {
            path: '/finalizar-pedido',
            element: <Checkout />,
            handle: 'Checkout'
          },
          {
            path: '/pedido-confirmado',
            element: <OrderConfirmation />,
            handle: 'OrderConfirmation'
          },
        ],
      },
      {
        element: <CustomerLayout />,
        children: [
          {
            path: 'meus-dados',
            element: <Customer />,
            handle: 'Customer',
          },
        ]
      },
      {
        path: 'painel',
        element: <ManagerLayout />,
        children: [
          {
            path: 'produtos',
            children: [
              {
                index: true,
                element: <ProductManagement />,
                handle: 'ProductsManagement',
              },
              {
                path: 'novo',
                element: <ProductManagementDetails />,
                handle: 'ProductsManagementDetails',
              },
              {
                path: ':id',
                element: <ProductManagementDetails />,
                handle: 'ProductsManagementDetails',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])