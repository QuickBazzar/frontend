import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../App'

function RoleRoute({ children, allowedRoles }) {
  const { user } = useContext(UserContext)

  // ✅ IMPORTANT: block only AFTER checking sessionStorage
  if (user === null) {
    return <h3>Loading...</h3>
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />
  }

  return children
}

export default RoleRoute
