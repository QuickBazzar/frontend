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
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error)
    return { status: "error", data: [] };
  }
}

// Get products by wholesaler ID for retailer
export async function getProductsByWholesaler(WholesalerId) {
  try {
    const response = await axios.get(
      `${config.BASE_URL}/product/wholesaler/${WholesalerId}`,
      { headers: authHeaders() }
    )
    return response.data
  } catch (error) {
    return {
      status: "error",
      error: "Failed to load products",
      data: [],
    }
  }
}


