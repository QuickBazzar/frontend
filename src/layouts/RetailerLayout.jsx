import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

const RetailerLayout = () => {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RetailerLayout;
