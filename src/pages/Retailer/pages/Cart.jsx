import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import config from "@/utils/config";
import { incrementQuantityAction, decrementQuantityAction, clearCartAction } from "@/redux/slices/cartSlice";
import { createOrder, addOrderItem } from "@/services/retailer/order";
import { toast } from "react-toastify";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(0);
  const [placing, setPlacing] = useState(false);


  // Calculate totals
  useEffect(() => {
    let totalAmount = 0;
    let quantity = 0;
    cartItems.forEach((p) => {
      totalAmount += Number(p.price) * Number(p.quantity);
      quantity += Number(p.quantity);
    });
    setTotal(totalAmount);
    setQty(quantity);
  }, [cartItems]);


  //Place Order → Redirect to Payment
  const placeOrder = async () => {
    if (cartItems.length === 0) {
      toast.warning("Cart is empty");
      return;
    }
    try {
      setPlacing(true);

      //Create Order
      const orderResult = await createOrder(total);
      console.log("Order result:", orderResult);
      if (orderResult.status !== "success") {
        toast.error("Order creation failed");
        return;
      }
      const orderId = orderResult.data.OrderID;


      //Add Order Items
      for (const item of cartItems) {
        const itemResult = await addOrderItem(orderId, item);
        console.log("Add order item result:", itemResult);
        if (itemResult.status !== "success") {
          toast.error(itemResult.error || "Failed to add order item");
          return;
        }
      }

      //Clear Cart
      dispatch(clearCartAction());

      //Redirect to Payment Page
      navigate("/retailer/payment", {
        state: {
          orderId,
          amount: total,
        },
      });
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="row">
      
      {/* Cart Items */}
      <div className="col-md-8">
        {cartItems.length === 0 && (
          <p className="text-muted m-3">Your cart is empty  </p>
        )}

        {cartItems.map((p) => (
          <div
            className="d-flex m-3 border-bottom pb-3 align-items-center"
            key={p.pid}
          >
            <img
              src={`${config.BASE_URL}/productimages/${p.image}`}
              alt={p.name}
              style={{
                width: "120px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              onError={(e) => (e.target.src = "/no-image.png")}
            />
            
            {/* Product Details */} 
            <div className="ms-3 flex-grow-1">
              <h6 className="fw-semibold">{p.name}</h6>
              <p className="mb-1">₹ {p.price}</p>

              {/* Quantity Controls */}
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => dispatch(incrementQuantityAction(p.pid))}
                >
                  +
                </button>

                <span className="mx-2">{p.quantity}</span>

                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => dispatch(decrementQuantityAction(p.pid))}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))} 

      </div>


      {/* Order Summary */}
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">Order Summary</h5>

            <table className="table table-sm">
              <tbody>
                <tr>
                  <td>Items</td>
                  <th>{cartItems.length}</th>
                </tr>
                <tr>
                  <td>Total Quantity</td>
                  <th>{qty}</th>
                </tr>
                <tr>
                  <td className="fw-bold">Total Amount</td>
                  <th className="fw-bold">₹ {total}</th>
                </tr>
              </tbody>
            </table>

            <button
              className="btn btn-primary w-100"
              onClick={placeOrder}
              disabled={cartItems.length === 0 || placing}
            >
              {placing ? "Placing Order..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;


