import axios from "axios";
import config from "../../utils/config";

// Create a new order
export async function createOrder(subTotal) {
  try {
    const url = config.BASE_URL + "/orders/";
    const headers = {Authorization: "Bearer " + sessionStorage.getItem("token"),};

    const response = await axios.post(url,{ SubTotal: subTotal },{ headers });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}

// Add an item to an order
export async function addOrderItem(orderId, item) {
  try {
    const url = config.BASE_URL + "/orderitem/";
    const headers = { Authorization: "Bearer " + sessionStorage.getItem("token"), };

    const body = {
      OrderID: orderId,
      ProductID: item.pid,
      Quantity: item.quantity,
      PriceAtPurchase: item.price,
    };

    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        status: "error",
        error: "Failed to add order item",
      }
    )
  }
}


// Get all orders for the retailer
export async function getRetailerOrders() {
  try {
    const url = config.BASE_URL + "/orders/retailer/orders";
    const headers = { Authorization: "Bearer " + sessionStorage.getItem("token"), };

    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}

// Get items for a order by order ID
export async function getOrderItems(orderId) {
  try {
    const url = config.BASE_URL + "/orderitem/" + orderId;
    const headers = {Authorization: "Bearer " + sessionStorage.getItem("token"),};

    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}

// Cancel an order by order ID
export async function cancelOrder(orderId) {
  try {
    const url = `${config.BASE_URL}/orders/${orderId}/cancel`;
    const headers = { 
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };
    const res = await axios.patch(url, {}, { headers });
    console.log("Cancel response:", res.data); // Debug log
    return res.data;
  } catch (error) {
    console.error("cancelOrder error:", error);
    console.error("Error response:", error.response?.data); // Debug log
    return { status: "error", error: error.response?.data?.error || error.message };
  }
}

