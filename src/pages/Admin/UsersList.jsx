import React, { useEffect, useState } from 'react'
import { deleteUser, getAllUsers } from '../../services/admin/users'
import DataTable from '../../components/DataTable'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const UsersList = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        const result = await getAllUsers()

        if(result && result.status === "success"){
            setUsers(result.data)
        }
        setLoading(false)
    }

    const handleUpdate = (users) => {
        navigate(`/admin/user/edit/${users.UserID}`,{
            state: users
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
        <DataTable columns={columns} data={users} actions={actions} />
    </div>
  )
}

export default UsersList