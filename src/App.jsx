import { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Unauthorized from './pages/Unauthorized';
import RoleRoute from './components/RoleRoute';
import Signin from './pages/signin';
import Signup from './pages/signup';
import { ToastContainer } from 'react-toastify';
import RetailerHome from './pages/Retailer/RetailerHome';
import AdminHome from './pages/Admin/AdminHome';
import WholesalerHome from './pages/WholeSaler/WholeSalerHome';
import RetailersList from './pages/Admin/RetailersList';
import Navbar from './components/NavBar';
import EditRetailer from './pages/Admin/EditRetailer';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UsersList from './pages/Admin/UsersList';
import EditUser from './pages/Admin/EditUser';
import WholesalerList from './pages/Admin/WholesalerList';
import { EditWholesaler } from './pages/Admin/EditWholesaler';

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
        <Routes>
          <Route path='*' element={<Signin />}/>
          <Route path='/register' element={<Signup />} />
          <Route path='/unauthorized' element={<Unauthorized />} />

          <Route path='/retailer'
            element={
              <RoleRoute allowedRoles={['RETAILER']}>
                <RetailerHome />
                
              </RoleRoute>
            }>

            {/* <Route path='profile' /> */}
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
