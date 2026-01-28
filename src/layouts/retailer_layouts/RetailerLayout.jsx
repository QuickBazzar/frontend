import { Outlet } from "react-router-dom";
import Sidebar from "../../components/retailercomponents/Sidebar";

const RetailerLayout = () => {
  return (
    <>
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>

        <Sidebar />

        <div className="flex-grow-1 bg-light p-3 overflow-auto">
          <Outlet />
        </div>

      </div>
    </>
  );
};

export default RetailerLayout;


