import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "220px", minHeight: "100vh" }}
    >
    

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
    </div>
  );
};

export default Sidebar;
