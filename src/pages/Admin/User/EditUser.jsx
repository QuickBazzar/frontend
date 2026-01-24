import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getUserById, updateUser } from "../../../services/admin/users"
import EditProfile from '../../../components/EditProfile';

const EditUser = () => {
    const {id} = useParams()
    const {state} = useLocation()

    const [user, setUser] = useState(state?.user || null)

    useEffect(() => {
        if(!user){
            fetchUser()
        }
    }, [user])

    const fields = [
        {label: "Email", name: "Email", mapKey: "Email"},
        {label: "Role", name: "Role", mapKey: "Role", readOnly: true},
    ]

    const handleSubmit = (form) => {
        const payload = {
            email: form.Email,
            role: form.Role,
        }
        return updateUser(id, payload)
    }

    const fetchUser = async() => {
        const result = await getUserById(id)

        if(result.status == "success"){
            setUser(result.data)
        }
    }

    return(
        <EditProfile 
            title="Update User Profile"
            fields={fields}
            initialData={user}
            onSubmit={handleSubmit}
            backTo="/admin/getAllUsers"
        />
    )
}

export default EditUser