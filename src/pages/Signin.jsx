import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/user'
import { toast } from 'react-toastify'
import { checkWholesalerStatus } from '../services/wholesaler'

function Signin() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signin = async () => {
  try {
    const result = await loginUser(email, password)

    if (!result || result.status !== 'success') {
      toast.error(result?.error || 'Invalid credentials')
      return
    }

    const { token, role, name } = result.data

    const userData = { token, role, name }
    sessionStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token) // <-- add this line
    setUser(userData)

    toast.success('Login successful')
    localStorage.setItem('token', token)

    if (role === 'ADMIN') {
      navigate('/admin')
    } else if (role === 'RETAILER') {
      navigate('/retailer')
    } else if (role === 'WHOLESALER') {
      const response = await checkWholesalerStatus()
      const isRegistered = response?.data?.data?.isRegistered
      if (isRegistered) {
        navigate('/wholesaler/dashboard')
      } else {
        navigate('/wholesaler/register')
      }
    }
  } catch (err) {
    console.error(err)
    toast.error('Something went wrong')
  }
}


  return (
    <div className="container w-50 mt-4">
      <h3>Signin</h3>

      <input
        className="form-control mb-2"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button className="btn btn-success" onClick={signin}>
        Signin
      </button>

      <div className="mt-2">
        <span>Don't have an account?</span>
        <Link to="/register"> Register</Link>
      </div>
    </div>
  )
}

export default Signin
