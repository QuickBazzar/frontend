import { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Unauthorized from './pages/Unauthorized';
import RoleRoute from './components/RoleRoute';
import Signin from './pages/signin';
import Signup from './pages/signup';
import { ToastContainer } from 'react-toastify';


import RetailerLayout from './layouts/retailer_layouts/RetailerLayout'
import AdminHome from './pages/Admin/AdminHome';
import WholesalerHome from './pages/WholeSaler/WholeSalerHome';
import RetailersList from './pages/Admin/Retailer/RetailersList';
import Navbar from './components/NavBar';
import EditRetailer from './pages/Admin/Retailer/EditRetailer';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UsersList from './pages/Admin/User/UsersList';
import EditUser from './pages/Admin/User/EditUser';
import WholesalerList from './pages/Admin/Wholesaer/WholesalerList';
import { EditWholesaler } from './pages/Admin/Wholesaer/EditWholesaler';
import CreateUser from './pages/Admin/User/CreateUser';
import ProductsList from './pages/Admin/Products/ProductsList';
import LowStockProducts from './pages/Admin/Products/LowStockProducts';
import OrdersList from './pages/Admin/Orders/OrdersList';
import { OrderDetails } from './pages/Admin/Orders/OrderDetails';
import { DeliveryReports } from './pages/Admin/Reports/DeliveryReports';
import { PaymentReports } from './pages/Admin/Reports/PaymentReports';
import PaymentsList from './pages/Admin/Payments/PaymentsList';
import PaymentDetails from './pages/Admin/Payments/PaymentDetails';
import GSTReports from './pages/Admin/Reports/GSTReports';
import RetailerOrdersReport from './pages/Admin/Reports/RetailerOrdersReport';
import WholesalerProductReport from './pages/Admin/Reports/WholesalerProductReport';

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

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    const role = sessionStorage.getItem("role")

    if(token && role){
      setUser({token, role})
    }
  }, [])

  return (
    <>
      <UserContext.Provider value={{user, setUser}} >
        <Navbar />
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
                <RetailerHome />
                
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
            <Route index element={<AdminDashboard />} />
            <Route path='getAllRetailers' element={<RetailersList />}/>
            <Route path='retailers/edit/:id' element={<EditRetailer />} />
            <Route path='getAllUsers' element={<UsersList />}/>
            <Route path='user/edit/:id' element={<EditUser />}/>
            <Route path='getAllWholesalers' element={<WholesalerList />}/>
            <Route path='wholesaler/edit/:id' element={<EditWholesaler />}/>
            <Route path='create-user' element={<CreateUser />}/>
            <Route path='products' element={<ProductsList />}/>
            <Route path='products/low-stock' element={<LowStockProducts />}/>
            <Route path='orders' element={<OrdersList />}/>
            <Route path='orders/:id' element={<OrderDetails />}/>
            <Route path='reports/delivery' element={<DeliveryReports />}/>
            <Route path='reports/payments' element={<PaymentReports />}/>
            <Route path="payments" element={<PaymentsList />} />
            <Route path="payments/order/:id" element={<PaymentDetails />} />
            <Route path="reports/gst" element={<GSTReports />} />
            <Route path='reports/retailers' element={<RetailerOrdersReport />}/>
            <Route path='reports/wholesalers' element={<WholesalerProductReport />} />
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
