import React, { useEffect, useState } from 'react'
import { getRetailerOrdersReport } from '../../../services/admin/viewReports'
import { formatCurrency } from '../../../utils/formatters'
import DataTable from '../../../components/DataTable'

const RetailerOrdersReport = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }) 

    const loadData = async () => {
        const result = await getRetailerOrdersReport()
        if(result?.status == "success"){
            setData(result.data)
        }
        setLoading(false)
    }

    const columns = [
        { label: "Retailer ID", key: "RetailerID"},
        { label: "Shop Name", key: "ShopName"},
        { label: "Total Orders", key: "TotalOrders"},
        {
            label: "Total Spent",
            key: "TotalSpent",
            render: (row) => formatCurrency(row.TotalSpent)
        },
    ]

    if(loading) return <p>Loading report...</p>

  return (
    <div className='container mt-3'>
        <h3>Retailer Orders Report</h3>
        <DataTable columns={columns} data={data}/>
    </div>
  )
}

export default RetailerOrdersReport