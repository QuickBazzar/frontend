import axios from "axios";
import config from "../utils/config"; // make sure this exists with BASE_URL

// 🔹 Helper: Get auth headers
function authHeaders() {
  const token = localStorage.getItem("token"); // or sessionStorage if you store it there
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 🔍 Check wholesaler profile (first-time or existing)
export async function getMyWholesalerProfile() {
  try {
    const url = config.BASE_URL + "/wholesaler/my";
    const response = await axios.get(url, { headers: authHeaders() });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}

// ➕ Register wholesaler (first time only)
export async function registerWholesaler(data) {
  try {
    const url = config.BASE_URL + "/wholesaler/add";
    const response = await axios.post(url, data, { headers: authHeaders() });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}

// 🔐 Optional: Check if wholesaler is already registered (alternative way)
export async function checkWholesalerStatus() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user || !user.token) return { status: "error", error: "No token found" };

  try {
    return axios.get(`${config.BASE_URL}/wholesaler/status`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  } catch (error) {
    return { status: "error", error };
  }
}

export async function getWholesalerFullProfile() {
  try {
    const url = config.BASE_URL + "/wholesaler/profile"
    const response = await axios.get(url, { headers: authHeaders() })
    return response.data
  } catch (error) {
    return { status: "error", error }
  }
}

export async function updateWholesalerProfile(data) {
  try {
    const url = config.BASE_URL + "/wholesaler/update"
    const response = await axios.put(
      url,
      data, // 👈 JSON body
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      }
    )
    return response.data
  } catch (error) {
    return { status: "error", error }
  }
}

