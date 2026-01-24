import { useEffect, useState } from "react";
import { getRetailerOrders, getOrderItems } from "../../services/order";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const result = await getRetailerOrders();
    if (result.status === "success") {
      setOrders(result.data);
    } else {
      toast.error("Failed to load orders");
    }
  };

  const viewOrderItems = async (orderId) => {
    const result = await getOrderItems(orderId);
    if (result.status === "success") {
      setOrderItems(result.data);
      setSelectedOrderId(orderId);
    } else {
      toast.error("Failed to load order items");
    }
  };

  return (
    <div className="container">
      <h4 className="mb-3">My Orders</h4>

      {/* ORDERS TABLE */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>₹ {o.totalAmount}</td>
              <td>{o.status}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => viewOrderItems(o.id)}
                >
                  View Items
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ORDER ITEMS */}
      {selectedOrderId && (
        <>
          <h5 className="mt-4">
            Order Items (Order #{selectedOrderId})
          </h5>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>₹ {item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹ {item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Orders;
