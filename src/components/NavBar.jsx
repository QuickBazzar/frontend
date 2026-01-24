import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../App'

function Navbar() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  if (!user || !user.role) return null

  const logout = () => {
    sessionStorage.clear()
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          QuickBazzr
        </Link>

        {/* Sidebar Toggle Button (Mobile only) */}
        <button
          className="btn btn-outline-light me-2 d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#retailerSidebar"
        >
          ☰
        </button>

        {/* Navbar Collapse Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">

            {user.role === "RETAILER" && (
              <>
                {/* <Link className="nav-link" to="/retailer">Dashboard</Link>
                <Link className="nav-link" to="/retailer/orders">Orders</Link>
                <Link className="nav-link" to="/retailer/profile">Profile</Link> */}
              </>
            )}


            {user.role === "ADMIN" && (
              <>
                {/* <Link className="nav-link" to="/admin">Dashboard</Link>
                <Link className="nav-link" to="/admin/users">Users</Link>
                <Link className="nav-link" to="/admin/reports">Reports</Link> */}
              </>
            )}

            {user.role === "WHOLESALER" && (
              <>
                {/* <Link className="nav-link" to="/wholesaler">Dashboard</Link>
                <Link className="nav-link" to="/wholesaler/stock">Stock</Link>
                <Link className="nav-link" to="/wholesaler/orders">Orders</Link> */}
              </>
            )}

            <button
              className="nav-link btn btn-link text-white"
              onClick={logout}
            >
              Logout
            </button>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
