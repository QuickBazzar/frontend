import axios from "axios";
import config from "../utils/config";

export async function createOrder(total) {
  try {
    const url = config.BASE_URL + "/order";
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };

    const response = await axios.post(
      url,
      { SubTotal: total }, 
      { headers }
    );
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}


export async function addOrderItem(orderId, item) {
  try {
    const url = config.BASE_URL + "/orderitem";
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };

    const body = {
      OrderID: orderId,
      ProductID: item.pid,
      Quantity: item.quantity,
      PriceAtPurchase: item.price,
    };

    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}



export async function getRetailerOrders() {
  try {
    const url = config.BASE_URL + "/order/retailer/orders";
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };

    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}

export async function getOrderItems(orderId) {
  try {
    const url = config.BASE_URL + "/orderitem/" + orderId;
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    };

    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}
