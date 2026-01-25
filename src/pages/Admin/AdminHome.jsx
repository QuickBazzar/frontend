import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/AdminSidebar'

function AdminHome() {
  return (
    <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>

      <AdminSidebar />

      <div className="flex-grow-1 bg-light p-3 overflow-auto">
        <Outlet />
      </div>

    </div>
  )
}

export default AdminHome