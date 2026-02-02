import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUserWithRole } from '../services/auth'
import { toast } from 'react-toastify'

function SignUp() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('RETAILER')

  const signup = async () => {
    if (!name || !email || !password || !role) {
      toast.error('All fields are required')
      return
    }

    const result = await registerUserWithRole(name, email, password, role)

    if (!result) return

    if (result.status === 'success') {
      toast.success('User registered successfully')
      navigate('/')
    } else {
      toast.error(result.error || 'Registration failed')
    }
  }

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: '420px', width: '100%', borderRadius: '12px' }}
      >
        <div className="text-center mb-3">
          <img
                src="/logo.png"
                alt="QuickBazzar Logo"
                style={{
                height: '100px',
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain'
                }}
            />
          <h4 className="fw-bold text-primary mt-2 mb-1">
            Create Your Account
          </h4>
          <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
            Join QuickBazzar today
          </p>
        </div>

        <div className="mb-3">
          <label className="form-label mb-1" style={{ fontSize: '14px' }}>Name</label>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Your full name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label mb-1" style={{ fontSize: '14px' }}>Email</label>
          <input
            type="email"
            className="form-control form-control-sm"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label mb-1" style={{ fontSize: '14px' }}>Password</label>
          <input
            type="password"
            className="form-control form-control-sm"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label mb-1" style={{ fontSize: '14px' }}>Role</label>
          <select
            className="form-select form-select-sm"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="RETAILER">Retailer</option>
            <option value="WHOLESALER">Wholesaler</option>
          </select>
        </div>

        <button
          className="btn btn-success w-100 fw-semibold mt-2"
          onClick={signup}
          style={{ padding: '8px' }}
        >
          Register
        </button>

        <div className="text-center mt-3">
          <span className="text-muted" style={{ fontSize: '14px' }}>Already have an account?</span>
          <Link
            to="/"
            className="ms-1 fw-semibold text-decoration-none"
            style={{ fontSize: '14px' }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp