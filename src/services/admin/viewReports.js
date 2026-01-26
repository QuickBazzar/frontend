import axios from "axios"
import config from "../../utils/config"

const headers = {
  Authorization: `Bearer ${sessionStorage.getItem("token")}`,
}

export const getRetailerOrdersReport = async () => {
  try {
    const url = config.BASE_URL + `/reports/retailers`
    const res = await axios.get(url, { headers })
    return res.data
  } catch {
    return error.response?.data || null
  }
}

export const getWholesalerProductReport = async () => {
  try {
    const url = config.BASE_URL + `/reports/wholesalers`
    const res = await axios.get(url, { headers })
    return res.data
  } catch {
    return error.response?.data || null
  }
}
