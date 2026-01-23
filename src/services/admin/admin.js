import axios from 'axios';
import config from './../../utils/config';

export async function getSystemSummary() {
    const url = config.BASE_URL + `/admin/summary`
    const headers = {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
    try {
        const response = await axios.get(url, {headers})
        return response.data
    } catch (error) {
        return null
    }
}