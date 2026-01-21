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

export async function deleteRetailer() {
    try {
        const url = config.BASE_URL + '/admin/delete-user/${userId}'
        const response = await axios.delete
    } catch (error) {
        
    }


}