import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  HouseFill,
  PlusSquareFill,
  EyeFill,
  PersonFill,
  BagCheckFill,
  BoxArrowRight,
} from 'react-bootstrap-icons'

function WholesalerSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { name: 'Dashboard', path: '/wholesaler', icon: <HouseFill /> },
    { name: 'Add Product', path: '/wholesaler/add-product', icon: <PlusSquareFill /> },
    { name: 'View Products', path: '/wholesaler/view-products', icon: <EyeFill /> },
    { name: 'Orders', path: '/wholesaler/orders', icon: <BagCheckFill /> },
    { name: 'Profile', path: '/wholesaler/profile', icon: <PersonFill /> },
  ]

  const handleLogout = () => {
    sessionStorage.clear()
    localStorage.removeItem('token')
    navigate('/', { replace: true })
  }

  return (
    <div
      className="bg-light border-end d-flex flex-column"
      style={{ width: '230px', minHeight: '100vh', position: 'sticky', top: 0 }}
    >
      {/* MENU */}
      <ul className="nav flex-column p-3 gap-2 flex-grow-1">
        {menuItems.map(item => {
          const isActive = location.pathname.startsWith(item.path)

          return (
            <li key={item.name} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center gap-2 ${
                  isActive
                    ? 'active bg-primary text-white rounded'
                    : 'text-dark'
                }`}
                style={{ padding: '10px 15px', borderRadius: '8px' }}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* LOGOUT */}
      <div className="p-3 border-top">
        <button
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={handleLogout}
        >
          <BoxArrowRight />
          Logout
        </button>
      </div>
    </div>
  )
}

export default WholesalerSidebar
