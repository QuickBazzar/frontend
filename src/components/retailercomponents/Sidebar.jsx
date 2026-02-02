import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      {/* MOBILE SIDEBAR */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="Sidebar"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Retailer Panel</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <SidebarLinks />
        </div>
      </div>


      {/* DESKTOP SIDEBAR */}
      <div className="d-none d-md-block bg-dark text-white vh-100 p-3">
        <SidebarLinks />
      </div>
    </>
  );
};

const SidebarLinks = () => (
  <ul className="nav nav-pills flex-column gap-2">
    <li className="nav-item">
      <Link className="nav-link text-white" to="/retailer/dashboard">
        Dashboard
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-white" to="/retailer/products">
        Products
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-white" to="/retailer/cart">
        Cart
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-white" to="/retailer/orders">
        Orders
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-white" to="/retailer/profile">
        Profile
      </Link>
    </li>
  </ul>
);

export default Sidebar;



