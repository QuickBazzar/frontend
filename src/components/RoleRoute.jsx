import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../App'

const RoleRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(UserContext)

  if (!user || !user.token) {
    return <Navigate to="/" />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />
  }

  return children
}

export default RoleRoute
