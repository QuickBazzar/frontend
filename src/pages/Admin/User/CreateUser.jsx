import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createUser } from '../../../services/admin/users'
import { ROLES } from '../../../utils/roles'

const CreateUser = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!form.name || !form.email || !form.password || !form.role){
            toast.error("All fields are required")
            return
        }

        const result = await createUser(form)

        if(result && result.status == "success"){
            toast.success("User Created successfully")
            navigate("/admin")
        }
        else{
            toast.error(result?.error || "Failed to create user")
        }
    }
  return (
    <div className='container mt-4'>
        <div className='row justify-content-center'>
            <div className='col-md-6 col-lg-5'>
                <div className='card shadow-sm'>
                    <div className='card-body'>
                        <h4 className='mb-4 text-center'>Create User</h4>

                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label className='form-label'>Name</label>
                                <input 
                                    className='form-control form-control-sm'
                                    name='name'
                                    value={form.name}
                                    onChange={handleChange} 
                                />
                            </div>

                            <div className='mb-3'>
                                <label className='form-label'>Email</label>
                                <input 
                                    type='email'
                                    className='form-control form-control-sm'
                                    name='email'
                                    value={form.email}
                                    onChange={handleChange} 
                                />
                            </div>

                            <div className='mb-3'>
                                <label className='form-label'>Password</label>
                                <input 
                                    type='password'
                                    className='form-control form-control-sm'
                                    name='password'
                                    value={form.password}
                                    onChange={handleChange} 
                                />
                            </div>

                            <div className='mb-3'>
                                <label className='form-label'>Role</label>
                                <select 
                                    className='form-select form-select-sm'
                                    name="role" 
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Role</option>
                                    <option value={ROLES.RETAILER}>Retailer</option>
                                    <option value={ROLES.WHOLESALER}>Wholesaler</option>
                                    <option value={ROLES.ADMIN}>Admin</option>
                                </select>
                            </div>

                            <div className='d-flex justify-content-end'>
                                <button className='btn btn-success btn-sm'>
                                    Create
                                </button>
                                <button 
                                    type='button'
                                    className='btn btn-success btn-sm ms-2'
                                    onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateUser