import axios from "axios";
import config from "../../utils/config";

// reusable auth header
const authHeaders = () => ({
  Authorization: "Bearer " + sessionStorage.getItem("token"),
});

// Get all products (admin/retailer)
export async function getAllProducts() {
  try {
    const url = config.BASE_URL + "/product/all";
    const response = await axios.get(url, { headers: authHeaders() });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}

// Get products by wholesaler ID for retailer
export async function getProductsByWholesaler(wholesalerId) {
  try {
    const url = `${config.BASE_URL}/product/wholesaler/${wholesalerId}`;
    const response = await axios.get(url, { headers: authHeaders() });
    return response.data;
  } catch (error) {
    return { status: "error", error };
  }
}


