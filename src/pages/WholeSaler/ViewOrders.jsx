import { useEffect, useState } from 'react'
import WholesalerNavbar from './WholesalerNavbar'
import { toast } from 'react-toastify'
import { getAllOrders } from '../../services/order'

function ViewOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const res = await getAllOrders()
      if (res.data.status === 'success') {
        console.log(res.data)
        setOrders(res.data.data)
      } else {
        toast.error('Failed to load orders')
      }
    } catch {
      toast.error('Failed to load orders')
    }
  }

  const deliveryBadge = (status) => {
    const map = {
      PENDING: 'badge bg-warning text-dark',
      SHIPPED: 'badge bg-primary',
      DELIVERED: 'badge bg-success',
      CANCELLED: 'badge bg-danger'
    }
    return map[status] || 'badge bg-secondary'
  }

  const paymentBadge = (status) =>
    status === 'PAID'
      ? 'badge bg-success'
      : 'badge bg-danger'

  return (
    <>
      <WholesalerNavbar />

      <div className="container mt-4">
        <h3 className="text-center mb-4">Retailer Orders</h3>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Retailer ID</th>
                <th>Order Date</th>
                <th>Sub Total</th>
                <th>GST</th>
                <th>Total</th>
                <th className="text-center">Payment</th>
                <th className="text-center">Delivery</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.OrderID}>
                    <td>{order.OrderID}</td>
                    <td>{order.RetailerID}</td>
                    <td>{new Date(order.OrderDate).toLocaleString()}</td>
                    <td>₹ {order.SubTotal}</td>
                    <td>₹ {order.GSTAmount}</td>
                    <td className="fw-bold text-success">
                      ₹ {order.GrandTotal}
                    </td>

                    <td className="text-center">
                      <span className={paymentBadge(order.PaymentStatus)}>
                        {order.PaymentStatus}
                      </span>
                    </td>

                    <td className="text-center">
                      <span className={deliveryBadge(order.DeliveryStatus)}>
                        {order.DeliveryStatus}
                      </span>
                    </td>

                    <td className="text-center">
                      <button className="btn btn-outline-primary btn-sm me-2">
                        View
                      </button>

                      {order.DeliveryStatus === 'PENDING' && (
                        <button className="btn btn-outline-success btn-sm">
                          Process
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ViewOrders
