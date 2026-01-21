import React, { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable'
import { getAllRetailers } from '../../services/admin/retailer'

const RetailersList = () => {
    const [retailers, setRetailers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadRetailers()
    }, [])

    const loadRetailers = async () => {
        const result = await getAllRetailers()

        if(result && result.status === "success"){
            setRetailers(result.data)
        }

        setLoading(false)
    }

    const columns = [
        {label: "ID", key: "UserID"},
        {label: "Name", key: "Name"},
        {label: "Email", key: "Email"},
        {label: "Role", key: "Role"},
    ]

    const handelUpdate = (retailer) => {
        console.log("Update retailer: ", retailer)
    }

    const handelDelete = async (retailer) => {
        if(!window.confirm(`Delete ${retailer.Name}?`)) return

        const 
    }

    if(loading){
        return <p>Loading retailers...</p>
    }
    
  return (
    <div className='container mt-3'>
        <h3>Retailers List</h3>
        <DataTable columns={columns} data={retailers}/>
    </div>
  )
}

export default RetailersList