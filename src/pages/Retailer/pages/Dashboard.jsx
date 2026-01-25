import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getMyRetailerProfile,
  getRetailerWallet,
} from "../../../services/retailer/retailer";
import { getRetailerOrders } from "../../../services/retailer/order";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [wallet, setWallet] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      // Retailer profile
      const profileRes = await getMyRetailerProfile();
      if (
        profileRes.status !== "success" ||
        !profileRes.data ||
        profileRes.data.length === 0
      ) {
        toast.error("Retailer profile not found");
        return;
      }

      const retailer = profileRes.data[0];
      setProfile(retailer);

      // Wallet
      const walletRes = await getRetailerWallet(retailer.RetailerID);
      if (walletRes.status === "success" && walletRes.data.length > 0) {
        setWallet(walletRes.data[0].WalletBalance);
      }

      // Orders
      const ordersRes = await getRetailerOrders();
      if (ordersRes.status === "success") {
        setOrders(ordersRes.data);
      }

    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="alert alert-warning mt-4">
        Retailer profile not available
      </div>
    );
  }

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.DeliveryStatus === "PENDING"
  ).length;

  return (
    <div className="container-fluid">

      {/* Dashboard Header */}
      <div className="mb-4">
        <h3 className="fw-bold">Retailer Dashboard</h3>
        <p className="text-muted">
          Welcome back, <strong>{profile.ShopName}</strong>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted">Wallet Balance</h6>
              <h3 className="text-success">₹ {wallet}</h3>
              <small className="text-muted">Available balance</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted">Total Orders</h6>
              <h3>{totalOrders}</h3>
              <small className="text-muted">Orders placed</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted">Pending Orders</h6>
              <h3 className="text-warning">{pendingOrders}</h3>
              <small className="text-muted">Awaiting delivery</small>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">Recent Orders</h5>

          {orders.length === 0 ? (
            <p className="text-muted">No orders placed yet</p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.OrderID}>
                      <td className="fw-semibold">#{o.OrderID}</td>
                      <td>{new Date(o.OrderDate).toLocaleString()}</td>
                      <td>₹ {o.TotalAmount}</td>
                      <td>
                        <span className="badge bg-secondary">
                          {o.PaymentStatus}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            o.DeliveryStatus === "DELIVERED"
                              ? "bg-success"
                              : o.DeliveryStatus === "PENDING"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                        >
                          {o.DeliveryStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default Dashboard;







