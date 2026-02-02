import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getRetailerOrders, getOrderItems, cancelOrder } from "@/services/retailer/order";
import { getMyRetailerProfile } from "@/services/retailer/retailer";


function Orders() {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [retailer, setRetailer] = useState(null);

  useEffect(() => {
    loadOrders();
    loadRetailer();
  }, []);

 
  // Load Orders
  const loadOrders = async () => {
    const res = await getRetailerOrders();
    if (res.status === "success") {
      setOrders(res.data);
    } else {
      toast.error("Failed to load orders");
    }
  };

  // Load Retailer Profile
  const loadRetailer = async () => {
    const res = await getMyRetailerProfile();
    if (res.status === "success") {
      setRetailer(res.data[0]);
    }
  };

  // View Order Items
  const viewItems = async (order) => {
    setSelectedOrder(order);
    const res = await getOrderItems(order.OrderID);
    if (res.status === "success") {
      setItems(res.data);
    } else {
      toast.error("Failed to load items");
    }
  };

  // Cancel Order
  const cancel = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;

    const res = await cancelOrder(orderId);
    if (res.status === "success") {
      toast.success("Order cancelled");
      loadOrders();
      setSelectedOrder(null);
    } else {
      toast.error(res.error);
    }
  };

  // Download Invoice
  const downloadInvoice = (order) => {
    const wholesaler =
      JSON.parse(sessionStorage.getItem("selectedWholesaler")) || {};

    const win = window.open("", "_blank");

    win.document.write(`
      <html>
      <head>
        <title>Invoice #${order.OrderID}</title>
        <style>
          body { font-family: Arial; padding: 20px }
          table { width: 100%; border-collapse: collapse; margin-top: 15px }
          th, td { border: 1px solid #000; padding: 8px }
          .right { text-align: right }
        </style>
      </head>
      <body>
        <h2>QuickBazar Invoice</h2>

        <p><b>Order ID:</b> ${order.OrderID}</p>
        <p><b>Date:</b> ${new Date(order.OrderDate).toLocaleString()}</p>

        <hr/>

        <p><b>Retailer:</b> ${retailer?.ShopName}</p>
        <p><b>Retailer GST:</b> ${retailer?.GSTNumber || "N/A"}</p>
        <p><b>Retailer Address:</b> ${retailer?.Address || "N/A"}</p>

        <p><b>Wholesaler:</b> ${wholesaler.BusinessName || "N/A"}</p>
        <p><b>Wholesaler Address:</b> ${wholesaler.Address || "N/A"}</p>

        <table>
          <tr>
            <th>Product</th>
            <th class="right">Price</th>
            <th class="right">Qty</th>
            <th class="right">Total</th>
          </tr>

          ${items
            .map(
              (i) => `
            <tr>
              <td>${i.ProductName}</td>
              <td class="right">₹ ${i.PriceAtPurchase}</td>
              <td class="right">${i.Quantity}</td>
              <td class="right">₹ ${i.PriceAtPurchase * i.Quantity}</td>
            </tr>
          `
            )
            .join("")}
        </table>

        <br/>

        <table>
          <tr>
            <td>Sub Total</td>
            <td class="right">₹ ${order.SubTotal}</td>
          </tr>
          <tr>
            <td>GST (${order.GSTPercentage}%)</td>
            <td class="right">₹ ${order.GSTAmount}</td>
          </tr>
          <tr>
            <th>Grand Total</th>
            <th class="right">₹ ${order.GrandTotal}</th>
          </tr>
        </table>

        <p><b>Payment Status:</b> ${order.PaymentStatus}</p>
        <p><b>Delivery Status:</b> ${order.DeliveryStatus}</p>

      </body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  return (
    <div className="container mt-3">
      <h4>My Orders</h4>

      {/* Orders Table */}
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>SubTotal</th>
            <th>GST</th>
            <th>Grand Total</th>
            <th>Payment</th>
            <th>Delivery</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center">
                No orders found
              </td>
            </tr>
          )}

          {orders.map((o) => (
            <tr key={o.OrderID}>
              <td>{o.OrderID}</td>
              <td>{new Date(o.OrderDate).toLocaleString()}</td>
              <td>₹ {o.SubTotal}</td>
              <td>₹ {o.GSTAmount}</td>
              <td>
                <b>₹ {o.GrandTotal}</b>
              </td>
              <td>{o.PaymentStatus}</td>
              <td>{o.DeliveryStatus}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => viewItems(o)}
                >
                  View
                </button>

                {o.PaymentStatus === "PENDING" &&
                  o.DeliveryStatus === "PENDING" && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => cancel(o.OrderID)}
                    >
                      Cancel
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Items */}
      {selectedOrder && (
        <>
          <h5 className="mt-4">
            Items for Order #{selectedOrder.OrderID}
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
              {items.map((i) => (
                <tr key={i.OrderItemID}>
                  <td>{i.ProductName}</td>
                  <td>₹ {i.PriceAtPurchase}</td>
                  <td>{i.Quantity}</td>
                  <td>₹ {i.PriceAtPurchase * i.Quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="btn btn-success"
            onClick={() => downloadInvoice(selectedOrder)}
          >
            Download Invoice
          </button>
        </>
      )}
    </div>
  );
}

export default Orders;


