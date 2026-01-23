import { NavLink } from "react-router-dom"

const AdminSidebar = () => {
    return (
        <div className="bg-dark text-white vh-100 p-3" style={{width: "220px"}}>
            <h5 className="mb-4">Admin Panel</h5>

            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink to="/admin" end className="nav-link text-white">
                    Dashboard
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/admin/getAllUsers" className="nav-link text-white">
                    Users
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/admin/getAllRetailers" className="nav-link text-white">
                    Retailers
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/admin/getAllWholesalers" className="nav-link text-white">
                    Wholesalers
                    </NavLink>
                </li>

            </ul>
        </div>
    )
}

export default AdminSidebar