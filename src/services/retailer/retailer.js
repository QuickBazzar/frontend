import axios from "axios";
import config from "../../utils/config";

const authHeaders = () => ({
  Authorization: "Bearer " + sessionStorage.getItem("token"),
});

// Get Retailer Profile of logged-in retailer
export async function getMyRetailerProfile() {
  try {
    const url = config.BASE_URL + "/retailer/my";
    const response = await axios.get(url, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    return { status: "error", error: "Failed to fetch profile" };
  }
}

// Create Retailer Profile
export async function createProfile(profile) {
  try {
    const url = config.BASE_URL + "/retailer/add";
    const response = await axios.post(url, profile, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    return { status: "error", error: "Profile creation failed" };
  }
}

// Update Retailer Profile 
export async function updateRetailerProfile(retailerId, body) {
  try {
    const url = config.BASE_URL + "/retailer/update/" + retailerId;
    const response = await axios.put(url, body, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    return { status: "error", error: "Profile update failed" };
  }
}

// Get retailer wallet details
export async function getRetailerWallet(retailerId) {
  try {
    const url = config.BASE_URL + "/retailer/wallet/" + retailerId;
    const response = await axios.get(url, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    return { status: "error", error: "Failed to load wallet" };
  }
}



