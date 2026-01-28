import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/DataTable'
import { deleteRetailer, getAllRetailers } from '../../../services/admin/retailer'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const RetailersList = () => {
    const [retailers, setRetailers] = useState([])
    const [filteredRetailers, setFilteredRetailers] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        loadRetailers()
    }, [])

    useEffect(() => {
        applyFilters()
    }, [search, retailers])

    const loadRetailers = async () => {
        const result = await getAllRetailers()

        if(result && result.status === "success"){
            setRetailers(result.data)
            setFilteredRetailers(result.data)
        }

        setLoading(false)
    }

    const applyFilters = () => {
        let data = [...retailers]

        if(search.trim() !== ''){
            data = data.filter(r => 
                r.ShopName.toLowerCase().includes(search.toLowerCase()) ||
                r.ContactNumber?.includes(search) ||
                r.Address?.toLowerCase().includes(search.toLowerCase())
            )
        }

        setFilteredRetailers(data)
    }

    const columns = [
        { label: "Retailer ID", key: "RetailerID" },
        { label: "Shop Name", key: "ShopName" },
        { label: "Contact", key: "ContactNumber" },
        { label: "City", key: "Address" },
        { label: "Wallet (₹)", key: "WalletBalance" },
        { label: "Plan", key: "SubscriptionPlan" },
        { label: "GST Number", key: "GSTNumber"},
    ]

    const handelUpdate = (retailer) => {
        navigate(`/admin/retailers/edit/${retailer.RetailerID}`,{
            state: { retailer }
        })
    }

    const handelDelete = async (retailer) => {
        if(!window.confirm(`Do You Want To Delete ${retailer.ShopName}?`)) return

        const result = await deleteRetailer(retailer.UserID)

        if(result && result.status == "success"){
            toast.success("Retailer Deleted Successfully")
            loadRetailers()
        }
        else{
            toast.error("Failed to delete retailer")
        }
    }

    const actions = [
    {
        label: "Update",
        className: "btn-warning",
        onClick: handelUpdate,
    },
    {
        label: "Delete",
        className: "btn-danger",
        onClick: handelDelete,
    },
    ]

    if(loading){
        return <p>Loading retailers...</p>
    }
    
  return (
    <div className='container mt-3'>
        <h3>Retailers List</h3>

        <div className='row mb-3'>
            <div className='col-md-4'>
                <input 
                    type="text"
                    className='form-control form-control-sm'
                    placeholder='Search by shop, city or contact'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </div>
        </div>

        <DataTable columns={columns} data={filteredRetailers} actions={actions}/>
    </div>
  )
}

export default RetailersList