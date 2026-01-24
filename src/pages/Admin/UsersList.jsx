import React, { useEffect, useState } from 'react'
import { deleteUser, getAllUsers } from '../../services/admin/users'
import DataTable from '../../components/DataTable'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const UsersList = () => {
    const [users, setUsers] = useState([])
    const [roleFilter, setRole] = useState('ALL')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    },[])

    useEffect(() => {
        applyFilters()
    }, [search, roleFilter, users])

    const loadUsers = async () => {
        const result = await getAllUsers()

        if(result && result.status === "success"){
            setUsers(result.data)
        }
        setLoading(false)
    }

    const applyFilters = () => {
        let data = [...users]

        if(search){
            data = data.filter(u => 
                u.Name.toLowerCase().includes(search.toLowerCase()) ||
                u.Email.toLowerCase().includes(search.toLowerCase())
            )
        }

        if(roleFilter !== 'ALL'){
            data = data.filter(u => u.Role === roleFilter)
        }

        setFilteredUsers(data)
    }

    const handleUpdate = (users) => {
        navigate(`/admin/user/edit/${users.UserID}`,{
            state: { user: users },
        })
    }

    const handelDelete = async (users) => {
        if(!window.confirm(`Do You Want To Delete ${users.Name}?`)) return
    
        const result = await deleteUser(users.UserID)
    
        if(result && result.status == "success"){
            toast.success("User Deleted Successfully")
            loadUsers()
        }
        else{
            toast.error("Failed to delete user")
        }
    }

    const columns = [
        { label: "User Id", key: "UserID"},
        { label: "User Name", key: "Name"},
        { label: "Email", key: "Email"},
        { label: "Role", key: "Role"},
    ]

    const actions = [
    {
        label: "Update",
        className: "btn-warning",
        onClick: handleUpdate,
    },
    {
        label: "Delete",
        className: "btn-danger",
        onClick: handelDelete,
    },
    ]

    if(loading){
        return <p>Loading Users...</p>
    }

  return (
    <div className='container mt-3'>
        <h3>Users List</h3>

        <input 
            type="text"
            className='form-control form-control-sm'
            placeholder='Search by name, email and role'
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
        />

        <select
            className='form-select form-select-sm mt-3 mb-3'
            value={roleFilter}
            onChange={(e) => setRole(e.target.value)}
        >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="RETAILER">Retailer</option>
            <option value="WHOLESALER">Wholesaler</option>
        </select>
        <DataTable columns={columns} data={filteredUsers} actions={actions} />
    </div>
  )
}

export default UsersList