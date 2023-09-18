
// import './App.css'

import { useDispatch, useSelector } from 'react-redux';
import Protected from './components/auth/Protected';
import ProtectedAdmin from './components/auth/ProtectedAdmin';
import CartPage from './pages/CartPage';
import CheckOutPage from './pages/CheckOutPage';
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import ProductDetailPage from './pages/ProductDetailPage';
import SignUpPage from './pages/SignUpPage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { selectLoggedInUser } from './redux/authSlice';
import { useEffect } from 'react';
import { fetchItemsByUserIdAsync } from './redux/cartSlice';
import PageNotFound from './pages/404';
import UsersOrderPage from './pages/UsersOrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './redux/userSlice';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LogOut from './components/auth/LogOut';
import AdminHome from './pages/AdminHome';
import AdminProductFromPage from './pages/AdminProductFromPage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminOrderPage from './pages/AdminOrderPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/cart",
    element: <Protected> <CartPage /></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected> <CheckOutPage /></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected> <ProductDetailPage /></Protected>,
  },
  {
    path: "/order-success/:id",
    element: <Protected> <OrderSuccessPage /> </Protected>,
  },
  {
    path: "/orders",
    element: <Protected> <UsersOrderPage /></Protected>,
  },
  {
    path: "/profile",
    element: <Protected> <UserProfilePage /></Protected>,
  },
  {
    path: '/logout',
    element: <LogOut />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFromPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFromPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrderPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const user = useSelector(selectLoggedInUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))

    }
  }, [dispatch, user])

  return (
    <>
      <>
        <div className="App">
          <RouterProvider router={router} />
          {/* Link must be inside the Provider */}
          <ToastContainer />
        </div>
      </>
    </>
  )
}

export default App
