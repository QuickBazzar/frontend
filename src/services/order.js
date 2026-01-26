import axios from "axios";
import config from "../utils/config";

export async function getAllOrders() {
  try {
    const user = JSON.parse(sessionStorage.getItem("user"))
     const token = user?.token
    const url = "http://localhost:4000/orders"
    const headers = { Authorization: `Bearer ${user?.token}` }

    const response = await axios.get(url, { headers })
    return response.data
  } catch (error) {
    console.error("getAllOrders error:", error)
    return { status: "error", data: [] }
  }
}


export async function updateDeliveryStatus(orderId, status) {
  try {
    const user = JSON.parse(sessionStorage.getItem("user"))
    const token = user?.token

    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.patch(
      `${config.BASE_URL}/orders/${orderId}/status`,
      { DeliveryStatus: status },
      { headers }
    )
    return response.data
  } catch (error) {
    console.error("updateDeliveryStatus Error:", error)
    return error.response?.data || { status: "error", error }
  }
}