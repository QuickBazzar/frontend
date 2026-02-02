import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../App'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/auth'
import { toast } from 'react-toastify'

function Signin() {
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')

  const signin = async () => {
    try {
      const result = await loginUser(email, password)

      if (!result) {
        toast.error('No response from server')
        return
      }

      if (result.status === 'success') {
        const { token, role, name } = result.data

        sessionStorage.setItem('token', token)
        sessionStorage.setItem('role', role)

        setUser({ token, role, name })

        toast.success('Login Successful')

        if (role === 'ADMIN') navigate('/admin')
        else if (role === 'RETAILER') navigate('/retailer')
        else if (role === 'WHOLESALER') navigate('/wholesaler')
      } else {
        toast.error(result.error || 'Invalid credentials')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: '420px', width: '100%', borderRadius: '12px' }}>
        
        <div className="text-center mb-4">
          <img
                src="/logo.png"
                alt="QuickBazzar Logo"
                style={{
                height: '120px',
                marginBottom: '10px',
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain'
                }}
            />
          <h4 className="fw-bold text-primary mt-3">Welcome Back</h4>
          <p className="text-muted mb-0">Sign in to continue</p>
        </div>

        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="••••••••"
            onChange={(e) => setPasword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-success w-100 fw-semibold mt-2"
          onClick={signin}
        >
          Sign In
        </button>

        <div className="text-center mt-3">
          <span className="text-muted">Don&apos;t have an account?</span>
          <Link to="/register" className="ms-1 fw-semibold text-decoration-none">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signin