import axios from "axios"
import config from "../../utils/config"

const authHeader = {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
}

// DELIVERY REPORTS
export const getPendingDeliveries = async () => {
  try {
    const res = await axios.get(
      `${config.BASE_URL}/reports/deliveries/pending`,
      authHeader
    )
    return res.data
  } catch {
    return null
  }
}

export const getShippedDeliveries = async () => {
  try {
    const res = await axios.get(
      `${config.BASE_URL}/reports/deliveries/shipped`,
      authHeader
    )
    return res.data
  } catch {
    return null
  }
}

export const getDeliveredDeliveries = async () => {
  try {
    const res = await axios.get(
      `${config.BASE_URL}/reports/deliveries/delivered`,
      authHeader
    )
    return res.data
  } catch {
    return null
  }
}

export const getCancelledDeliveries = async () => {
  try {
    const res = await axios.get(
      `${config.BASE_URL}/reports/deliveries/cancelled`,
      authHeader
    )
    return res.data
  } catch {
    return null
  }
}

// PAYMENT REPORTS
export const getPaidPayments = async () => {
  try {
    const res = await axios.get(
      `${config.BASE_URL}/reports/payments/paid`,
      authHeader
    )
    return res.data
  } catch {
    return null
  }
}

export const getPendingPayments = async () => {
  try {
    const res = await axios.get(
      `${config.BASE_URL}/reports/payments/pending`,
      authHeader
    )
    return res.data
  } catch {
    return null
  }
}

export const getFailedPayments = async () => {
  try {
    const res = await axios.get(
      `${config.BASE_URL}/reports/payments/failed`,
      authHeader
    )
    return res.data
  } catch {
    return null
  }
}
