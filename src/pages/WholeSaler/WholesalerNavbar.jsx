import { useNavigate } from 'react-router-dom'

function WholesalerNavbar() {
  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.clear()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold">Wholesaler Panel</span>

      <button className="btn btn-outline-light btn-sm" onClick={logout}>
        Logout
      </button>
    </nav>
  )
}

export default WholesalerNavbar
