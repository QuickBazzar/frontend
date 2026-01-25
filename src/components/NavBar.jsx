import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../App'
import { ROLES } from '../utils/roles'

function Navbar() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  if (!user || !user.role) return null

  const logout = () => {
    sessionStorage.clear()
    setUser(null)
    navigate('/')
  }

  const getHomePath = () => {
    if (user.role === ROLES.ADMIN) return "/admin"
    if (user.role === ROLES.RETAILER) return "/retailer"
    if (user.role === ROLES.WHOLESALER) return "/wholesaler"
    return "/"
  }

  return (
    <nav className="navbar navbar-dark bg-primary sticky-top">
      <div className="container-fluid d-flex align-items-center">

        {/* LEFT: Sidebar Toggle (Admin Mobile Only) */}
        {user.role === ROLES.ADMIN && (
          <button
            className="btn btn-outline-light btn-sm d-md-none me-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#adminSidebar"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        )}

        {/* BRAND */}
        <Link className="navbar-brand mb-0 h1" to={getHomePath()}>
          QuickBazzar
        </Link>

        {/* RIGHT: Logout */}
        <button
          className="btn btn-outline-light btn-sm ms-auto"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </nav>
  )
}

export default Navbar
