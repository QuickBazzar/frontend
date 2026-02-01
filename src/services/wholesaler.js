import axios from "axios"
import config from "../utils/config"

const getAuthHeaders = () => ({
  Authorization: `Bearer ${sessionStorage.getItem("token")}`
})

export async function getMyWholesalerProfile() {
  try {
    const response = await axios.get(
      `${config.BASE_URL}/wholesaler/my`,
      { headers: getAuthHeaders() }
    )
    return response.data
  } catch (error) {
    return error.response?.data || {
      status: "error",
      error: "Failed to fetch wholesaler profile",
      data: null
    }
  }
}

export async function registerWholesaler(data) {
  try {
    const response = await axios.post(
      `${config.BASE_URL}/wholesaler/add`,
      data,
      { headers: getAuthHeaders() }
    )
    return response.data
  } catch (error) {
    return error.response?.data || {
      status: "error",
      error: "Failed to register wholesaler",
    }
  }
}

export async function updateWholesalerProfile(data) {
  try {
    const response = await axios.put(
      `${config.BASE_URL}/wholesaler/update`,
      data,
      { headers: getAuthHeaders() }
    )
    return response.data
  } catch (error) {
    return error.response?.data || {
      status: "error",
      error: "Failed to update wholesaler profile"
    }
  }
}

export async function getWholesalerFullProfile() {
  try {
    const response = await axios.get(
      `${config.BASE_URL}/wholesaler/profile`,
      { headers: getAuthHeaders() }
    )
    return response.data
  } catch (error) {
    return {
      status: "error",
      error: error.response?.data?.error || "Failed to fetch profile",
    }
  }
}

export async function getWholesalerDashboardStats() {
  try {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    }

    const response = await axios.get(
      `${config.BASE_URL}/wholesaler/dashboard`,
      { headers }
    )

    return response.data
  } catch (error) {
    return error.response?.data || {
      status: "error",
      error: "Failed to load dashboard",
    }
  }
}
