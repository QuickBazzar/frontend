import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"

import { ROLES } from "../utils/roles"
import { UserContext } from "../App"

function Navbar() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  if (!user || !user.role) return null

  const logout = () => {
    sessionStorage.clear()
    setUser(null)
    navigate("/")
  }

  const getHomePath = () => {
    if (user.role === ROLES.ADMIN) return "/admin"
    if (user.role === ROLES.RETAILER) return "/retailer"
    if (user.role === ROLES.WHOLESALER) return "/wholesaler"
    return "/"
  }

  const sidebarTarget =
    user.role === ROLES.ADMIN
      ? "#adminSidebar"
      : user.role === ROLES.RETAILER
      ? "#retailerSidebar"
      : null

  return (
    <nav
      className="navbar navbar-dark sticky-top shadow"
      style={{
        background: "linear-gradient(90deg, #ECA9C8, #DAB1D1, #C7B9DA)"
      }}
    >
      <div className="container-fluid d-flex align-items-center">

        {(user.role === ROLES.ADMIN || user.role === ROLES.RETAILER) && (
          <button
            className="btn btn-outline-light btn-sm d-lg-none me-2"
            data-bs-toggle="offcanvas"
            data-bs-target={sidebarTarget}
          >
            ☰
          </button>
        )}

        {/* SIMPLE TEXT BRAND */}
        <Link
          to={getHomePath()}
          className="navbar-brand mb-0"
          style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            color: "#ffffff",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
            textDecoration: "none"
          }}
        >
          QuickBazzar
        </Link>

        {/* LOGOUT */}
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