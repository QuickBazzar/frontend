import React, { useEffect, useState } from 'react'
import { getCancelledDeliveries, getDeliveredDeliveries, getPendingDeliveries, getShippedDeliveries } from '../../../services/admin/reports'
import DataTable from '../../../components/DataTable'

export const DeliveryReports = () => {
    const [data, setData] = useState([])
    const [type, setType] = useState("PENDING")
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        let result

        switch(type){
            case "SHIPPED" : result = await getShippedDeliveries(); break
            case "DELIVERED" : result = await getDeliveredDeliveries(); break
            case "CANCELLED" : result = await getCancelledDeliveries(); break
            default: result = await getPendingDeliveries()
        }

        if(result?.status == "success"){
            setData(result.data)
        }
        setLoading(false)
    }

    const columns = [
        { label: "Delivery ID", key: "DeliveryID" },
        { label: "Order ID", key: "OrderID" },
        { label: "Shop Name", key: "ShopName" },
        { label: "Status", key: "Status" },
    ]

  return (
    <div className='container mt-3'>
        <h3>Delievry Reports</h3>

        <select 
            className='form-select w-25 mb-3'
            value={type}
            onChange={(e) => setType(e.target.value) }
        >
            <option value="PENDING">Pending</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Deliverd</option>
            <option value="CANCELLED">Cancelled</option>
        </select>

        {loading ? <p>Loading...</p>:
            <DataTable columns={columns} data={data} />
        }
    </div>
  )
}
