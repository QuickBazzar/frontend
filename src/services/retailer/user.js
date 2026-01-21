import axios from 'axios'
import { toast } from 'react-toastify'
import config from '../utils/config'

export async function loginUser(email, password) {
  try {
    const userbody = { email, password }
    const url = config.BASE_URL + '/user/signin'

    const response = await axios.post(url, userbody)

    return response.data  
  } catch (error) {
    toast.error(error.response?.data?.error || 'Login failed')
    return null            
  }
}

export async function registerUserWithRole(name, email, password, role) {
  try {
    const body = { name, email, password, role }

    const url = config.BASE_URL + '/user/web/signup'

    const response = await axios.post(url, body)

    return response.data
  } catch (error) {
    toast.error(error.response?.data?.error || 'Registration failed')
    return null
  }
}
