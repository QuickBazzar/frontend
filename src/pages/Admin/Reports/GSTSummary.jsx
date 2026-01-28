import React, { useEffect, useState } from 'react'
import { getGSTSummary } from '../../../services/admin/gstReports'
import { formatCurrency } from '../../../utils/formatters'

const GSTSummary = () => {
    const [year, setYear] = useState(new Date().getFullYear())
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadSummary()
    },[year])

    const loadSummary = async() => {
        setLoading(true)
        const result = await getGSTSummary(year)
        if(result?.status == "success"){
            setData(result.data[0])
        }else{
            setData(null)
        }
        setLoading(false)
    }

    if(loading) return <p>Loading GST summary...</p>
  return (
    <div className='container mt-3'>
        <h3>GST Yearly Summary</h3>

        <div className='mb-3 w-25'>
            <input type="number"
                className='form-control'
                value={year}
                onChange={(e) => setYear(e.target.value)} />
        </div>
        {data ? (
            <div className='row'>
                <div className='col-md-4'>
                    <div className='card p-3 shadow-sm'>
                        <h6>Total Taxable Amount</h6>
                        <h5>{formatCurrency(data.TotalTaxableAmount)}</h5>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='card p-3 shadow-sm'>
                        <h6>Total GST Collected</h6>
                        <h5>{formatCurrency(data.TotalGST)}</h5>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='card p-3 shadow-sm'>
                        <h6>Total Revenue</h6>
                        <h5>{formatCurrency(data.TotalRevenue)}</h5>
                    </div>
                </div>
            </div>
        ) : (
            <p>No GST data available</p>
        )}
    </div>
  )
}

export default GSTSummary