import { Outlet } from 'react-router-dom'
import WholesalerSidebar from './WholesalerSidebar'

function WholesalerLayout() {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <WholesalerSidebar />

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default WholesalerLayout
