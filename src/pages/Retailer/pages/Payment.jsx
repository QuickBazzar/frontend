import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { initiatePayment } from "@/services/retailer/payment";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { orderId, amount } = location.state || {};

  const [paymentMode, setPaymentMode] = useState("CASH");
  const [processing, setProcessing] = useState(false);

  if (!orderId || !amount) {
    toast.error("Invalid payment session");
    navigate("/retailer/orders");
    return null;
  }

  const handlePayment = async () => {
    setProcessing(true);

    const payload = {
      orderId,
      paymentMode,
      amount,
    };

    const res = await initiatePayment(payload);

    if (res.status !== "success") {
      toast.error("Payment initiation failed");
      setProcessing(false);
      return;
    }

    // Cash on Delivery
    if (paymentMode === "CASH") {
      toast.info("Cash on Delivery selected. Pay at delivery.");
      navigate("/retailer/orders");
      return;
    }

    // Other payment modes can be handled here (e.g., UPI, CARD, WALLET) 
    toast.success("Payment successful :) ");
    navigate("/retailer/orders");

    setProcessing(false);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">Payment</h4>

          <p className="text-muted mb-2">
            <strong>Order ID:</strong> #{orderId}
          </p>
          <p className="text-muted mb-4">
            <strong>Amount:</strong> ₹ {amount}
          </p>

          {/* Payment Mode */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Select Payment Method
            </label>

            <select
              className="form-select"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="CASH">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="CARD">Card</option>
              <option value="WALLET">Wallet</option>
            </select>
          </div>

          {/* Pay Button */}
          <button
            className="btn btn-success w-100"
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? "Processing..." : "Confirm Payment"}
          </button>

          {/* Info */}
          {paymentMode === "CASH" && (
            <p className="text-muted mt-3 small">
               You will pay the amount at the time of delivery.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;


