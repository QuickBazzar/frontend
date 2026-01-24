import axios from "axios";
import config from "../../utils/config";

export async function getAllOrders() {
    try {
        const url = config.BASE_URL + `/orders/`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }        

        const response = await axios.get(url, {headers})

        return response.data
    } catch (error) {
       return error.response?.data || null 
    }
}

export async function updateDeliveryStatus(orderId, status) {
    try {
        const url = config.BASE_URL + `/orders/${orderId}/status`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

        const response = await axios.patch(url, {DeliveryStatus: status}, {headers})

        return response.data
    } catch (error) {
        return error.response?.data || null
    }
}

export async function deleteOrder(orderId) {
    try{
        const url = config.BASE_URL + `/orders/${orderId}`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
        const response = await axios.delete(url, {headers})
        return response.data
    }
    catch(error) {
        return error.response?.data || null
    }
}

export async function getOrderById(orderId) {
    try {
        const url = config.BASE_URL + `/orders/${orderId}`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

        const response = await axios.get(url, {headers})

        return response.data
    } catch (error) {
       return error.response?.data || null 
    }
}