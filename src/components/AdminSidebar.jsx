import { NavLink } from "react-router-dom"

const AdminSidebar = () => {
  return (
    <>
      <div className="bg-dark text-white px-3 py-3 d-none d-lg-block" style={{ width: '250px', minHeight: '100vh' }}>
        <h5 className="mb-4">Admin Panel</h5>
        <SidebarLinks />
      </div>

      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="adminSidebar"
        style={{ width: '250px' }}
      >
        <div className="offcanvas-header">
          <h5>Admin Panel</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          />
        </div>
        <div className="offcanvas-body">
          <SidebarLinks />
        </div>
      </div>
    </>
  )
}

const SidebarLinks = () => (
  <ul className="nav flex-column gap-1">

    <NavItem to="/admin" label="Dashboard" end />

    <NavItem to="/admin/getAllUsers" label="Users" />
    <NavItem to="/admin/getAllRetailers" label="Retailers" />
    <NavItem to="/admin/getAllWholesalers" label="Wholesalers" />
    <NavItem to="/admin/create-user" label="Create User" />

    <hr className="text-secondary" />

    <NavItem to="/admin/products" label="Products" />
    <NavItem to="/admin/products/low-stock" label="Low Stock Products" />

    <hr className="text-secondary" />

    <NavItem to="/admin/orders" label="Orders" />
    <NavItem to="/admin/payments" label="Payments" />

    <hr className="text-secondary" />

    <NavItem to="/admin/reports/retailers" label="Retailer Orders Report" />
    <NavItem to="/admin/reports/wholesalers" label="Wholesaler Product Report" />
    <NavItem to="/admin/reports/gst" label="GST Reports" />
    <NavItem to="/admin/reports/delivery" label="Delivery Reports" />
    <NavItem to="/admin/reports/payments" label="Payment Reports" />

  </ul>
)

const NavItem = ({ to, label, end }) => (
  <li className="nav-item">
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `nav-link px-2 py-1 rounded ${
          isActive ? "bg-secondary text-white" : "text-white"
        }`
      }
    >
      {label}
    </NavLink>
  </li>
)

export default AdminSidebar