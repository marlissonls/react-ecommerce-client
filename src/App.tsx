import { RouterProvider } from 'react-router'
import { router } from './router'
import { CartProvider } from './hooks/useCart'

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}


export default App