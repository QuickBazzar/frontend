import axios from "axios";
import config from "../../utils/config";

export async function getAllProducts() {
    try {
        const url = config.BASE_URL + `/admin/product/all`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`   
        }

        const response = await axios.get(url, {headers})

        return response.data
    } catch (error) {
        return error.response?.data || null
    }
}

export async function deleteProduct(productId) {
    try {
        const url = config.BASE_URL + `/admin/product/${productId}`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

        const response = await axios.delete(url, {headers})

        return response.data
    } catch (error) {
        return error.response?.data || null
    }
}

export async function updateProductStatus(productId, isActive) {
    try {
        const url = config.BASE_URL + `/admin/product/status/${productId}`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

        const response = await axios.patch(url, {IsActive: isActive}, {headers})

        return response.data
    } catch (error) {
        return error.response?.data || null
    }
}

export async function getLowStockProducts() {
    try {
        const url = config.BASE_URL + `/admin/product/low-stock`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

        const response = await axios.get(url, {headers})
        return response.data
    } catch (error) {
        return error.response?.data || null
    }
}