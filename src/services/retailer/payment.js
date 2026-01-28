import axios from "axios";
import config from "../../utils/config";

const authHeaders = () => ({
  Authorization: "Bearer " + sessionStorage.getItem("token"),
});

// Initiate a payment
export async function initiatePayment(body) {
  try {
    const url = config.BASE_URL + "/payments/";
    const res = await axios.post(url, body, { headers: authHeaders() });
    return res.data;
  } catch (err) {
    return { status: "error", error: err };
  }
}

// Get payment details by order ID
export async function getPaymentByOrder(orderId) {
  try {
    const url = `${config.BASE_URL}/payments/order/${orderId}`;
    const res = await axios.get(url, { headers: authHeaders() });
    return res.data;
  } catch (err) {
    return { status: "error", error: err };
  }
}
