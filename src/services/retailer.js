import axios from "axios";
import config from "../utils/config";

const authHeaders = () => ({
  Authorization: "Bearer " + sessionStorage.getItem("token"),
});

// Fetch retailer profile of the logged-in retailer
export async function getMyRetailerProfile() {
  try {
    const url = config.BASE_URL + "/retailer/my";
    const response = await axios.get(url, { headers: authHeaders() });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}

// Create a new retailer profile
export async function createProfile(profile) {
  try {
    const url = config.BASE_URL + "/retailer/add";
    const response = await axios.post(url, profile, { headers: authHeaders() });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}

// Update retailer mobile number
export async function updateRetailerProfile(id, body) {
  try {
    const url = config.BASE_URL + "/retailer/update/" + id;
    const response = await axios.put(url, body, { headers: authHeaders() });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}


// Fetch retailer wallet details
export async function getRetailerWallet(id) {
  try {
    const url = config.BASE_URL + "/retailer/wallet/" + id;
    const response = await axios.get(url, { headers: authHeaders() });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}
