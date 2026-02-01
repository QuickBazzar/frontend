import { useNavigate } from 'react-router-dom'

function WholesalerNavbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.clear()
    localStorage.removeItem('token')
    navigate('/', { replace: true })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 px-md-4 shadow-sm">
      <span className="navbar-brand fw-bold">
        Wholesaler Panel
      </span>

      {/* Right side */}
      <div className="ms-auto">
        <button
          className="btn btn-outline-light btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default WholesalerNavbar