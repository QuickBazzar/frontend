import { NavLink } from "react-router-dom"

const RetailerSidebar = () => {
  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div
        className="bg-dark text-white px-3 py-3 d-none d-lg-block"
        style={{ width: "250px", minHeight: "100vh" }}
        id="Sidebar"
      >
        <h5 className="mb-4">Retailer Panel</h5>
        <SidebarLinks />
      </div>

      {/* MOBILE SIDEBAR (OFFCANVAS) */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="retailerSidebar"
        style={{ width: "250px" }}
      >
        <div className="offcanvas-header">
          <h5>Retailer Panel</h5>
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

    <NavItem to="/retailer" label="Dashboard" end />

    <NavItem to="/retailer/products" label="Products" />
    <NavItem to="/retailer/cart" label="Cart" />
    <NavItem to="/retailer/orders" label="Orders" />
    <NavItem to="/retailer/profile" label="Profile" />

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

export default RetailerSidebar