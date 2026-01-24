import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getMyRetailerProfile, getRetailerWallet } from "../../services/retailer"
import { getRetailerOrders } from "../../services/order"

function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [wallet, setWallet] = useState(0)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      setLoading(true)

      // 1️⃣ Retailer profile
      const profileRes = await getMyRetailerProfile()
      if (profileRes.status !== "success") {
        toast.error("Failed to load retailer profile")
        return
      }

      const retailer = profileRes.data[0]
      setProfile(retailer)

      // 2️⃣ Wallet balance
      const walletRes = await getRetailerWallet(retailer.RetailerID)
      if (walletRes.status === "success") {
        setWallet(walletRes.data[0].WalletBalance)
      }

      // 3️⃣ Orders
      const ordersRes = await getRetailerOrders()
      if (ordersRes.status === "success") {
        setOrders(ordersRes.data)
      }

    } catch (err) {
      toast.error("Dashboard loading failed")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    )
  }

  const totalOrders = orders.length
  const pendingOrders = orders.filter(
    (o) => o.DeliveryStatus === "PENDING"
  ).length

  return (
    <div>
      {/* HEADER */}
      <div className="mb-4">
        <h4>Dashboard</h4>
        <p className="text-muted">
          Welcome, <strong>{profile.ShopName}</strong>
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Wallet Balance</h6>
              <h3 className="text-success">₹ {wallet}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Orders</h6>
              <h3>{totalOrders}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Pending Orders</h6>
              <h3 className="text-warning">{pendingOrders}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="card mt-4 shadow-sm border-0">
        <div className="card-body">
          <h5 className="mb-3">Recent Orders</h5>

          {orders.length === 0 ? (
            <p className="text-muted">No orders placed yet</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Total Amount</th>
                    <th>Payment Status</th>
                    <th>Delivery Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.OrderID}>
                      <td>{o.OrderID}</td>
                      <td>₹ {o.TotalAmount}</td>
                      <td>
                        <span
                          className={`badge ${
                            o.PaymentStatus === "PAID"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
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
                              : "bg-secondary"
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
  )
}

export default Dashboard
