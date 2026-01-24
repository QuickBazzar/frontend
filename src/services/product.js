import axios from "axios"
import config from "../utils/config"

export async function getAllProducts() {
  try {
    const url = config.BASE_URL + "/product/all"
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    }

    const response = await axios.get(url, { headers })
    return response.data
  } catch (error) {
    return { status: "error", error }
  }
}
