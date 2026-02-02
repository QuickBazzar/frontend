import { createContext, useEffect, useState } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Navbar from "./components/NavBar"
import RoleRoute from "./components/RoleRoute"

/* Auth */
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Unauthorized from "./pages/Unauthorized"

/* Admin */
import AdminHome from "./pages/Admin/AdminHome"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import RetailersList from "./pages/Admin/Retailer/RetailersList"
import EditRetailer from "./pages/Admin/Retailer/EditRetailer"
import UsersList from "./pages/Admin/User/UsersList"
import EditUser from "./pages/Admin/User/EditUser"
import CreateUser from "./pages/Admin/User/CreateUser"
import WholesalerList from "./pages/Admin/Wholesaer/WholesalerList"
import { EditWholesaler } from "./pages/Admin/Wholesaer/EditWholesaler"
import ProductsList from "./pages/Admin/Products/ProductsList"
import LowStockProducts from "./pages/Admin/Products/LowStockProducts"
import OrdersList from "./pages/Admin/Orders/OrdersList"
import { OrderDetails } from "./pages/Admin/Orders/OrderDetails"
import PaymentsList from "./pages/Admin/Payments/PaymentsList"
import PaymentDetails from "./pages/Admin/Payments/PaymentDetails"
import GSTReports from "./pages/Admin/Reports/GSTReports"
import { DeliveryReports } from "./pages/Admin/Reports/DeliveryReports"
import { PaymentReports } from "./pages/Admin/Reports/PaymentReports"
import RetailerOrdersReport from "./pages/Admin/Reports/RetailerOrdersReport"
import WholesalerProductReport from "./pages/Admin/Reports/WholesalerProductReport"

/* Retailer */
import RetailerLayout from "./layouts/retailer_layouts/RetailerLayout"
import RetailerProfileGuard from "./components/retailercomponents/RetailerProfileGuard"
import Dashboard from "./pages/Retailer/pages/Dashboard"
import ProductsPage from "./pages/Retailer/products/ProductsPage"
import Cart from "./pages/Retailer/pages/Cart"
import Orders from "./pages/Retailer/pages/Orders"
import Payment from "./pages/Retailer/pages/Payment"
import Profile from "./pages/Retailer/pages/Profile"
import CreateProfile from "./pages/Retailer/pages/CreateProfile"

/* Wholesaler */
import WholesalerLayout from "./pages/WholeSaler/WholesalerLayout"
import WholesalerDashboard from "./pages/WholeSaler/WholesalerDashboard"
import AddProduct from "./pages/WholeSaler/AddProduct"
import ViewProducts from "./pages/WholeSaler/ViewProducts"
import UpdateProduct from "./pages/WholeSaler/UpdateProduct"
import ViewOrders from "./pages/WholeSaler/ViewOrders"
import WholesalerProfile from "./pages/WholeSaler/WholesalerProfile"
import UpdateWholesalerProfile from "./pages/WholeSaler/UpdateWholesalerProfile"
import WholesalerProfileGuard from "./components/wholesalercomponents/WholesalerProfileGuard"
import CreateWholesalerProfile from "./pages/WholeSaler/CreateWholesalerProfile"
import ProductsByWholesaler from './pages/Retailer/products/ProductsByWholesaler';

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    const role = sessionStorage.getItem("role")
    if (token && role) setUser({ token, role })
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {user && <Navbar />}

      <Routes>
        
        <Route
          path="/"
          element={
            user
              ? user.role === "ADMIN"
                ? <Navigate to="/admin" />
                : user.role === "RETAILER"
                ? <Navigate to="/retailer" />
                : <Navigate to="/wholesaler" />
              : <Signin />
          }
        />
        <Route path="/register" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/retailer"
          element={
            <RoleRoute allowedRoles={["RETAILER"]}>
              <RetailerProfileGuard>
                <RetailerLayout />
              </RetailerProfileGuard>
            </RoleRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:wholesalerId" element={<ProductsByWholesaler />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payment" element={<Payment />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<CreateProfile />} />
        </Route>

        <Route
          path="/retailer/create-profile"
          element={
            <RoleRoute allowedRoles={["RETAILER"]}>
              <CreateProfile />
            </RoleRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={["ADMIN"]}>
              <AdminHome />
            </RoleRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="getAllRetailers" element={<RetailersList />} />
          <Route path="retailers/edit/:id" element={<EditRetailer />} />
          <Route path="getAllUsers" element={<UsersList />} />
          <Route path="user/edit/:id" element={<EditUser />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="getAllWholesalers" element={<WholesalerList />} />
          <Route path="wholesaler/edit/:id" element={<EditWholesaler />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/low-stock" element={<LowStockProducts />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="payments" element={<PaymentsList />} />
          <Route path="payments/order/:id" element={<PaymentDetails />} />
          <Route path="reports/gst" element={<GSTReports />} />
          <Route path="reports/delivery" element={<DeliveryReports />} />
          <Route path="reports/payments" element={<PaymentReports />} />
          <Route path="reports/retailers" element={<RetailerOrdersReport />} />
          <Route path="reports/wholesalers" element={<WholesalerProductReport />} />
        </Route>

        <Route
          path="/wholesaler"
          element={
            <RoleRoute allowedRoles={["WHOLESALER"]}>
              <WholesalerProfileGuard>
                <WholesalerLayout />
              </WholesalerProfileGuard>
            </RoleRoute>
          }
        >
          <Route index element={<WholesalerDashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="view-products" element={<ViewProducts />} />
          <Route path="update-product/:id" element={<UpdateProduct />} />
          <Route path="orders" element={<ViewOrders />} />
          <Route path="profile" element={<WholesalerProfile />} />
          <Route path="update-profile" element={<UpdateWholesalerProfile />} />
        </Route>

        <Route
          path="/wholesaler/create-profile"
          element={
            <RoleRoute allowedRoles={["WHOLESALER"]}>
              <CreateWholesalerProfile />
            </RoleRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ToastContainer />
    </UserContext.Provider>
  )
}

export default App