import axios from "axios"
import config from "../utils/config"

const getAuthHeaders = () => ({
  Authorization: `Bearer ${sessionStorage.getItem("token")}`,
})

export async function getWholesalerOrders() {
  try {
    const response = await axios.get(
      `${config.BASE_URL}/orders/wholesaler/orders`,
      { headers: getAuthHeaders() }
    )
    return response.data
  } catch (error) {
    return (
      error.response?.data || {
        status: "error",
        error: "Failed to fetch wholesaler orders",
        data: [],
      }
    )
  }
}

export async function getAllOrders() {
  try {
    const response = await axios.get(
      `${config.BASE_URL}/orders/`,
      { headers: getAuthHeaders() }
    )
    return response.data
  } catch (error) {
    return {
      status: "error",
      error: "Failed to fetch all orders",
      data: [],
    }
  }
}

// GET RETAILER ORDERS
export async function getRetailerOrders() {
  try {
    const response = await axios.get(
      `${config.BASE_URL}/orders/retailer/orders`,
      { headers: getAuthHeaders() }
    )
    return response.data
  } catch (error) {
    return error.response?.data || {
      status: "error",
      error: "Failed to fetch retailer orders",
      data: [],
    }
  }
}

// 🔹 UPDATE DELIVERY STATUS
export async function updateDeliveryStatus(orderId, status) {
  try {
    const response = await axios.patch(
      `${config.BASE_URL}/orders/${orderId}/status`,
      { DeliveryStatus: status },
      { headers: getAuthHeaders() }
    )
    return response.data
  } catch (error) {
    return error.response?.data || {
      status: "error",
      error: "Failed to update delivery status",
    }
  }
}
