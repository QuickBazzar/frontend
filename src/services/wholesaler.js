import axios from 'axios'
export const checkWholesalerStatus = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return axios.get('http://localhost:4000/wholesaler/status', {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const registerWholesaler = async (data) => {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return axios.post('http://localhost:4000/wholesaler/register', data, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
