import { toast } from "react-toastify";
import config from "../../utils/config";
import axios from "axios";

export async function getAllRetailers() {
    const url = config.BASE_URL + '/admin/all'
    const headers = {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
    try {
        const response = await axios.get(url, {headers})
        return response.data
    } catch (error) {
        toast.error(error)
    }
}

export async function deleteRetailer(retailerId) {
    try {
        const url = config.BASE_URL + `/admin/delete-retailer/${retailerId}`
        const headers = {
            Authorization:`Bearer ${sessionStorage.getItem('token')}`
        }
        const response = await axios.delete(url, {headers})
        return response.data
    } catch (error) {
        toast.error("Delete Failed")
        return null
    }
}

export async function updateRetailer(retailerId, data) {
    try {
        const url = config.BASE_URL + `/retailer/update/${retailerId}`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

        const response = await axios.put(url, data, {headers})

        return response.data
    } catch (error) {
        return error.response?.data || null        
    }
}

// getRetailerById
export async function getRetailerById(retailerId) {
    try {
        const url = config.BASE_URL +`/admin/find/${retailerId}`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

        const response = await axios.get(url, {headers})

        return response.data
    } catch (error) {
        return error.response?.data || null
    }
}
