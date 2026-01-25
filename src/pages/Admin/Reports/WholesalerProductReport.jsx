import React, { useEffect, useState } from 'react'
import { getWholesalerProductReport } from '../../../services/admin/viewReports'
import DataTable from '../../../components/DataTable'

const WholesalerProductReport = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const result = await getWholesalerProductReport()
        if(result?.status == "success"){
            setData(result.data)
        }
        setLoading(false)
    }

    const columns = [
        {label: "Wholesaler ID", key: "WholesalerID"},
        {label: "Business Name", key: "BusinessName"},
        {label: "Total Products", key: "TotalProducts"},
        {label: "Total Stock", key: "TotalStock"},
    ]

    if(loading) return <p>Loading Wholesaler report...</p>

  return (
    <div className='container mt-3'>
        <h3>Wholesaler Product Report</h3>
        <DataTable columns={columns} data={data}/>
    </div>
  )
}

export default WholesalerProductReport