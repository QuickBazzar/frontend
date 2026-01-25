import axios from "axios"
import config from "../../utils/config"

const headers = {
  Authorization: `Bearer ${sessionStorage.getItem("token")}`,
}

export const getAllPayments = async () => {
  try {
    const url = config.BASE_URL + `/payments/all`
    const res = await axios.get(url, { headers })
    return res.data
  } catch {
    return error.res?.data || null
  }
}

export const getPaymentByOrder = async (orderId) => {
  try {
    const url = config.BASE_URL + `/payments/order/${orderId}`
    const res = await axios.get(url ,{ headers })
    return res.data
  } catch {
    return error.res?.data || null
  }
}

export const updatePaymentStatus = async (paymentId, status) => {
  try {
    const url = config.BASE_URL + `/payments/status/${paymentId}`
    const res = await axios.patch(url, { status }, { headers })
    return res.data
  } catch {
    return null
  }
}

export const getPaymentsByMode = async (mode) => {
  try {
    const url = config.BASE_URL + `/payments/mode/${mode}`
    const res = await axios.get(url,{ headers })
    return res.data
  } catch {
    return null
  }
}
