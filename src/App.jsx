import { createContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Unauthorized from './pages/Unauthorized';
import RoleRoute from './components/RoleRoute';
import Signin from './pages/signin';
import Signup from './pages/signup';
import { ToastContainer } from 'react-toastify';

import RetailerHome from './pages/Retailer/RetailerHome';
import AdminHome from './pages/Admin/AdminHome';
import WholesalerHome from './pages/WholeSaler/WholeSalerHome';




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

          <Route path="/retailer/create-profile"
              element={
                <RoleRoute allowedRoles={["RETAILER"]}>
                  <CreateProfile />
                </RoleRoute>
              }
            />

          {/* Retailer Routes */}
          <Route path='/retailer'
            element={
              <RoleRoute allowedRoles={['RETAILER']}>
                <RetailerHome />
              </RoleRoute>
            }
          >

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
