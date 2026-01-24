import axios from "axios";
import config from "../../utils/config";
import { toast } from "react-toastify";
import CreateUser from '../../pages/Admin/User/CreateUser';

export async function createUser(data) {
    try {
        const url = config.BASE_URL + `/user/web/signup`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

        const response = await axios.post(url, data, {headers})

        return response.data
    } catch (error) {
        return error.response?.data || null
    }
}

export async function getAllUsers() {
    const url = config.BASE_URL + `/admin/user/all`
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

export async function deleteUser(UserID) {
    try {
        const url = config.BASE_URL + `/admin/delete-user/${UserID}`
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

export async function updateUser(userId, data) {
    try {
        const url = config.BASE_URL+`/admin/user/${userId}`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

        const response = await axios.patch(url, data, {headers})

        return response.data
    } catch (error) {
        return error.response?.data || null
    }
}

export async function getUserById(userId) {
    try{
        const url = config.BASE_URL + `/admin/user/${userId}`
        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }

        const response = await axios.get(url, {headers})

        return response.data
    }
    catch (error){
        return error.response?.data || null
    }
}