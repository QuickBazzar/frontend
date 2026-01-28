import axios from "axios"
import config from "../../utils/config"

const headers = {
  Authorization: `Bearer ${sessionStorage.getItem("token")}`,
}

export const getGSTSummary = async (year) => {
  try {
    const url = config.BASE_URL + `/reports/gst-summary?year=${year}`
    const res = await axios.get(url, { headers })
    return res.data
  } catch {
    return error.res?.data || null
  }
}

export const getGSTMatrix = async (year) => {
  try {
    const url = config.BASE_URL + `/reports/gst-matrix?year=${year}`
    const res = await axios.get(url, { headers })
    return res.data
  } catch {
    return error.res?.data || null
  }
}
