import axios from 'axios'
import config from '../../utils/config'

 const authHeaders = () => ({
        Authorization: "Bearer " + sessionStorage.getItem("token"),
    });


// Get all wholesalers for retailer
export const getAllWholesalers = async () => {
    try {
        const url = config.BASE_URL + "/wholesaler/retailer/all";
        const res = await axios.get(url, { headers: authHeaders() });
        return res.data;
    } catch (err) {
        return { status: "error", error: err };
    }
};