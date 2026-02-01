import axios from 'axios'
import config from '../utils/config'

const PRODUCT_URL = `${config.BASE_URL}/product`

export async function addProduct(formData) {
  try {
    const response = await axios.post(
      PRODUCT_URL,
      formData,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('ADD PRODUCT ERROR:', error)
    return error.response?.data || null
  }
}

export async function getMyProducts() {
  try {
    const response = await axios.get(
      `${PRODUCT_URL}/products/my-products`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('GET MY PRODUCTS ERROR:', error)
    return error.response?.data || null
  }
}

export async function getProductById(id) {
  try {
    const response = await axios.get(
      `${PRODUCT_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    )
    return response.data
  } catch (error) {
    return error.response?.data || null
  }
}

export async function updateProduct(id, formData) {
  try {
    const response = await axios.put(
      `${PRODUCT_URL}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  } catch (error) {
    return error.response?.data || null
  }
}

export async function deleteProduct(id) {
  try {
    const response = await axios.delete(
      `${PRODUCT_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    )
    return response.data
  } catch (error) {
    return error.response?.data || null
  }
}

export async function searchProductByName(name) {
  try {
    const response = await axios.get(
      `${PRODUCT_URL}/search/${name}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    )
    return response.data
  } catch (error) {
    return error.response?.data || null
  }
}

export async function searchProductByCategory(category) {
  try {
    const response = await axios.get(
      `${PRODUCT_URL}/category/${category}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    )
    return response.data
  } catch (error) {
    return error.response?.data || null
  }
}
