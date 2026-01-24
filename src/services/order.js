export const getAllOrders = () => {
  const token = sessionStorage.getItem('user') // user object is stored here
  const parsedToken = token ? JSON.parse(token).token : null

  return axios.get('http://localhost:4000/orders', {
    headers: {
      Authorization: `Bearer ${parsedToken}`
    }
  })
}
