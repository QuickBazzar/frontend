import { createContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Unauthorized from './pages/Unauthorized';
import RoleRoute from './components/RoleRoute';
import Signin from './pages/signin';
import Signup from './pages/signup';
import { ToastContainer } from 'react-toastify';


import RetailerLayout from './layouts/retailer_layouts/RetailerLayout'
import AdminHome from './pages/Admin/AdminHome';
import WholesalerHome from './pages/WholeSaler/WholeSalerHome';

import Cart from "./pages/Retailer/pages/Cart";
import Orders from "./pages/Retailer/pages/Orders";
import Profile from "./pages/Retailer/pages/Profile";
import CreateProfile from "./pages/Retailer/pages/CreateProfile";
import Dashboard from "./pages/Retailer/pages/Dashboard";
import Payment from "./pages/Retailer/pages/Payment";



// import Dashboard from './pages/Retailer/pages/Dashboard'
// import Cart from "./pages/Retailer/Cart";
// import Orders from "./pages/Retailer/Orders";
// import Profile from "./pages/Retailer/Profile";
// import CreateProfile from "./pages/Retailer/CreateProfile";
// import Payment from './pages/Retailer/Payment';

import RetailerProfileGuard from "./components/retailercomponents/RetailerProfileGuard";
import ProductsPage from "./pages/Retailer/products/ProductsPage";
import ProductsByWholesaler from "./pages/Retailer/products/ProductsByWholesaler";
// import ProductsByWholesaler from './pages/Retailer/ProductsByWholesaler';
// import ProductsPage from './pages/Retailer/products/ProductsPage';



export const UserContext = createContext()
function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      <UserContext.Provider value={{ user, setUser }} >
        <Routes>
          <Route path='*' element={<Signin />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/unauthorized' element={<Unauthorized />} />

          {/* Retailer Routes */}

          <Route path="/retailer/create-profile"
            element={
              <RoleRoute allowedRoles={["RETAILER"]}>
                <CreateProfile />
              </RoleRoute>
            }
          />


          <Route path='/retailer'
            element={
              <RoleRoute allowedRoles={['RETAILER']}>
                <RetailerProfileGuard>
                  <RetailerLayout />
                </RetailerProfileGuard>
              </RoleRoute>
            }>

            {/* <Route path='profile' /> */}

            <Route index element={<Dashboard />} />

            <Route path='dashboard' element={<Dashboard />} />
            {/* <Route path="products" element={<ProductList />} /> */}
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:wholesalerId" element={<ProductsByWholesaler />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="payment" element={<Payment />} />
            <Route path="profile" element={<Profile />} />

            <Route
              path="/retailer/edit-profile"
              element={
                <RoleRoute allowedRoles={["RETAILER"]}>
                  <CreateProfile />
                </RoleRoute>
              }
            />


          </Route>

          <Route
            path='/admin'
            element={
              <RoleRoute allowedRoles={['ADMIN']}>
                <AdminHome />
              </RoleRoute>
            }
          >
            {/* <Route path='addItems'/> */}
          </Route>

          <Route
            path='/wholesaler'
            element={
              <RoleRoute allowedRoles={['WHOLESALER']}>
                <WholesalerHome />
              </RoleRoute>
            }
          />

        </Routes>
      </UserContext.Provider>
      <ToastContainer />
    </>
  )
}

export default App
