import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../utils/config";
import {
  incrementQuantityAction,
  decrementQuantityAction,
  clearCartAction,
} from "../../slices/cartSlice";
import { createOrder, addOrderItem } from "../../services/order";
import { toast } from "react-toastify";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ hook INSIDE component

  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(0);

  // 🔹 Calculate totals
  useEffect(() => {
    let totalAmount = 0;
    let quantity = 0;

    for (const p of cartItems) {
      totalAmount += Number(p.price) * Number(p.quantity);
      quantity += Number(p.quantity);
    }

    setTotal(totalAmount);
    setQty(quantity);
  }, [cartItems]);

  // 🔹 Place Order (FINAL)
  const placeOrder = async () => {
    if (cartItems.length === 0) {
      toast.warning("Cart is empty");
      return;
    }

    // 1️⃣ Create order (backend expects SubTotal)
    const orderResult = await createOrder(total);

    if (orderResult.status !== "success") {
      toast.error("Order creation failed");
      return;
    }

    const orderId = orderResult.data.insertId; // ✅ MySQL insertId

    // 2️⃣ Add order items
    for (const item of cartItems) {
      const itemResult = await addOrderItem(orderId, item);
      if (itemResult.status !== "success") {
        toast.error("Failed to add order item");
        return;
      }
    }

    toast.success("Order placed successfully ✅");

    dispatch(clearCartAction());
    navigate("/retailer/orders"); // ✅ refresh Orders page
  };

  return (
    <div className="row">
      {/* CART ITEMS */}
      <div className="col-8">
        {cartItems.length === 0 && (
          <p className="text-muted m-3">Your cart is empty</p>
        )}

        {cartItems.map((p) => (
          <div className="d-flex m-3" key={p.pid}>
            <img
              src={config.BASE_URL + "/productimages/" + p.image}
              alt={p.name}
              style={{ width: "120px", height: "100px" }}
            />

            <div className="ms-3">
              <h6>{p.name}</h6>
              <h6>₹ {p.price}</h6>

              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    dispatch(incrementQuantityAction(p.pid))
                  }
                >
                  +
                </button>

                <div className="mx-2">{p.quantity}</div>

                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    dispatch(decrementQuantityAction(p.pid))
                  }
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ORDER SUMMARY */}
      <div className="col-4">
        <table className="table">
          <tbody>
            <tr>
              <th colSpan={2}>Order Summary</th>
            </tr>
            <tr>
              <td>Items</td>
              <th>{cartItems.length}</th>
            </tr>
            <tr>
              <td>Total Qty</td>
              <th>{qty}</th>
            </tr>
            <tr>
              <th>Total Amount</th>
              <th>₹ {total}</th>
            </tr>
          </tbody>
        </table>

        <button
          className="btn btn-primary w-100"
          onClick={placeOrder}
          disabled={cartItems.length === 0}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
