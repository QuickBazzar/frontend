import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUserWithRole } from "@/services/retailer/user";
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
    <div className='container w-75'>
      <h3 className="mt-3">Register Here</h3>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Role</label>
        <select
          className="form-select"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="RETAILER">RETAILER</option>
          <option value="WHOLESALER">WHOLESALER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      <button className="btn btn-success" onClick={signup}>
        Register
      </button>

      <div className="mt-3">
        <label>Already have an account?</label>
        <Link to="/"> Login</Link>
      </div>
    </div>
  )
}

export default SignUp
