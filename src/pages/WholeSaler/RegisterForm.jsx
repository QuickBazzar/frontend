import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerWholesaler, checkWholesalerStatus } from '../../services/wholesaler'
import { toast } from 'react-toastify'

function RegisterForm() {
  const navigate = useNavigate()

  const [shopName, setShopName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [address, setAddress] = useState('')
  const [gstNumber, setGstNumber] = useState('')

  // 🔐 Prevent re-registration
  useEffect(() => {
    const checkStatus = async () => {
      const res = await checkWholesalerStatus()
      if (res.data.data.isRegistered) {
        navigate('/wholesaler/dashboard')
      }
    }
    checkStatus()
  }, [navigate])

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!shopName || !contactNumber || !address || !gstNumber) {
      toast.error('All fields are required')
      return
    }

    const result = await registerWholesaler({
      shopName,
      contactNumber,
      address,
      gstNumber
    })

    if (result.status === 'success') {
      toast.success('Registration successful')
      navigate('/wholesaler/dashboard')
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div className="container w-50 mt-4">
      <h3>Wholesaler Registration</h3>

      <form onSubmit={handleRegister}>
        <input className="form-control mb-2" placeholder="Shop Name" onChange={e => setShopName(e.target.value)} />
        <input className="form-control mb-2" placeholder="Contact Number" onChange={e => setContactNumber(e.target.value)} />
        <textarea className="form-control mb-2" placeholder="Address" onChange={e => setAddress(e.target.value)} />
        <input className="form-control mb-2" placeholder="GST Number" onChange={e => setGstNumber(e.target.value)} />
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  )
}

export default RegisterForm
