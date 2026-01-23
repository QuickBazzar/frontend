import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteWholesaler, getAllWholesalers } from "../../services/admin/wholesaler"
import DataTable from "../../components/DataTable"
import { toast } from "react-toastify"

const WholesalerList = () => {
    const [wholesalers, setWholesalers] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        loadWholesalers()
    }, [])

    const loadWholesalers = async () => {
        const result = await getAllWholesalers()

        if(result && result.status === "success"){
            setWholesalers(result.data)
        }

        setLoading(false)
    }

    const columns = [
        { label: "Wholesaler ID", key: "WholesalerID"},
        { label: "Business Name", key: "BusinessName"},
        { label: "Contact Number", key:"ContactNumber"},
        { label: "Address", key: "Address"},
        { label: "Plan", key: "SubscriptionPlan"},
        { label: "GST Number", key: "GSTNumber"},
    ]

    const handelUpdate = async (wholesaler) => {
        navigate(`/admin/wholesaler/edit/${wholesaler.WholesalerID}`, {
            state: wholesaler
        })

    }

    const handleDelete = async (wholesaler) => {
        if(!window.confirm(`Do You Want To Delete ${wholesaler.BusinessName}?`)) return

        const result = await deleteWholesaler(wholesaler.UserID)

        if(result && result.status == "success"){
            toast.success("Wholesaler Deleted Successfully")
            loadWholesalers()
        }
        else{
            toast.error("Failed to delete wholesaler")
        }
    }

    const actions = [
        {
            label : "Update",
            className: "btn-warning",
            onClick: handelUpdate,
        },
        {
            label: "Delete",
            className: "btn-danger",
            onClick: handleDelete,
        }
    ]

    if(loading){
        return <p>Loading Wholesalers...</p>
    }

    return (
        <div className='container mt-3'>
            <h3>Wholesalers List</h3>
            <DataTable columns={columns} data={wholesalers} actions={actions}/>
        </div>
    )
}

export default WholesalerList