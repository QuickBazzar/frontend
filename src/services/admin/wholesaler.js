import axios from "axios";
import config from "../../utils/config";
import { toast } from "react-toastify";

export async function getAllWholesalers() {
    const url = config.BASE_URL + `/admin/wholesalers`

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

export async function getWholesalerById(wholesalerId) {
    try {
        const url = config.BASE_URL +`/admin/wholesaler/${wholesalerId}`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

        const response = await axios.get(url, {headers})

        return response.data
    } catch (error) {
        return error.response?.data || null
    }
}

export async function updateWholesaler(wholesalerId, data) {
    try {
        const url = config.BASE_URL + `/admin/wholesaler/${wholesalerId}`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

        const response = await axios.put(url, data, {headers})

        return response.data
    } catch (error) {
        return error.response?.data || null        
    }
}

export async function deleteWholesaler(wholsalerId) {
    try {
        const url = config.BASE_URL +`/admin/wholesaler/${wholsalerId}`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
        const response = await axios.delete(url, {headers})
        return response.data
    } catch (error) {
        toast.error("Delete Failed")
        return null
    }
}