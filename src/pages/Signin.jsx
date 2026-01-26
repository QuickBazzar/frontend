import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../App'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from "@/services/retailer/user";
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
                toast.error("No response from server")
                return
            }

            if (result.status === 'success') {
                const { token, role, name } = result.data

                sessionStorage.setItem("token", token)
                sessionStorage.setItem("role", role)

                setUser({ token, role, name })

                toast.success('Login Successful')

                if (role === 'ADMIN') navigate('/admin')
                else if (role === 'RETAILER') navigate('/retailer')
                else if (role === 'WHOLESALER') navigate('/wholesaler')
            } else {
                toast.error(result.error || 'Invalid credentials')
            }
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong')
        }
    }
  return (
    <div className='container w-50'>
        <div className="mb-3 mt-3">
            <label htmlFor="inputEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="inputEmail" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mb-3'>
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder='password' onChange={e => setPasword(e.target.value)} />
        </div>
        <div className='mb-3'>
            <button className='btn btn-success' onClick={signin}>Signin</button>
        </div>
        <div>
            <label> Don't have an account ?</label>
            <Link to="/register"> Click Here</Link>
        </div>
    </div>
  )
}

export default Signin