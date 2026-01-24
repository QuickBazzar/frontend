import axios from 'axios'
const BASE_URL = 'http://localhost:4000/product'

export const addProduct = async (formData) => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  if (!user) throw new Error('User not logged in')

  return axios.post('http://localhost:4000/product', formData, {
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const getAllProducts = () => {
  return axios.get('http://localhost:4000/product/all')
}



const authHeader = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }
}

export const getProductById = (id) =>
  axios.get(`${BASE_URL}/${id}`, authHeader())

export const updateProduct = (id, formData) =>
  axios.put(`${BASE_URL}/${id}`, formData, {
    headers: {
      ...authHeader().headers,
      'Content-Type': 'multipart/form-data'
    }
  })

export const deleteProduct = (id) => {
  return axios.delete(`${BASE_URL}/${id}`, authHeader())
}


