import { createContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Unauthorized from './pages/Unauthorized'
import RoleRoute from './components/RoleRoute'
import Signin from './pages/signin'
import Signup from './pages/signup'
import { ToastContainer } from 'react-toastify'

import RetailerHome from './pages/Retailer/RetailerHome'
import AdminHome from './pages/Admin/AdminHome'

import RegisterForm from './pages/WholeSaler/RegisterForm'
import WholesalerDashboard from './pages/WholeSaler/WholesalerDashboard'
import AddProduct from './pages/WholeSaler/AddProduct'
import ViewProducts from './pages/WholeSaler/ViewProducts'
import UpdateProduct from './pages/WholeSaler/UpdateProduct'
import ViewOrders from './pages/WholeSaler/ViewOrders'
import WholesalerProfile from './pages/WholeSaler/WholesalerProfile';
import UpdateWholesalerProfile from './pages/WholeSaler/UpdateWholesalerProfile'
export const UserContext = createContext()

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* RETAILER */}
          <Route
            path="/retailer"
            element={
              <RoleRoute allowedRoles={['RETAILER']}>
                <RetailerHome />
              </RoleRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={['ADMIN']}>
                <AdminHome />
              </RoleRoute>
            }
          />

          {/* WHOLESALER */}
          <Route
            path="/wholesaler/register"
            element={
              <RoleRoute allowedRoles={['WHOLESALER']}>
                <RegisterForm />
              </RoleRoute>
            }
          />

          <Route
            path="/wholesaler/dashboard"
            element={
              <RoleRoute allowedRoles={['WHOLESALER']}>
                <WholesalerDashboard />
              </RoleRoute>
            }
          />

          <Route
            path="/wholesaler/add-product"
            element={
              <RoleRoute allowedRoles={['WHOLESALER']}>
                <AddProduct />
              </RoleRoute>
            }
          />

          <Route
            path="/wholesaler/view-products"
            element={
              <RoleRoute allowedRoles={['WHOLESALER']}>
                <ViewProducts />
              </RoleRoute>
            }
          />

          <Route
            path="/wholesaler/update-product/:id"
            element={
              <RoleRoute allowedRoles={['WHOLESALER']}>
                <UpdateProduct />
              </RoleRoute>
            }
          />

          <Route
  path="/wholesaler/orders"
  element={
    <RoleRoute allowedRoles={['WHOLESALER']}>
      <ViewOrders />
    </RoleRoute>
  }
/>

<Route
  path="/wholesaler/profile"
  element={
    <RoleRoute allowedRoles={['WHOLESALER']}>
      <WholesalerProfile />
    </RoleRoute>
  }
/>
<Route
  path="/wholesaler/update-profile"
  element={<UpdateWholesalerProfile />}
/>

        </Routes>
      </UserContext.Provider>

      <ToastContainer />
    </>
  )
}

export default App
