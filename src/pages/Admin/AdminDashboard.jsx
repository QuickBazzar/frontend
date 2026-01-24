import React, { useEffect, useState } from 'react'
import { getSystemSummary } from '../../services/admin/admin'
import DashboardCard from '../../components/DashboardCard'

export default function AdminDashboard() {
    const [summary, setSummary] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadSummary()
    }, [])

    const loadSummary = async () => {
        const result = await getSystemSummary()

        if(result && result.status == "success"){
            setSummary(result.data)
        }
        setLoading(false)
    }

    if(loading) return <p className='mt0-3'>Loading Dashboard....</p>
  return (
    <div className='container mt-4'>
        <h3 className='mb-4'>Admin Dashbord</h3>

        <div className='row g-3'>
            <DashboardCard title="Total Users" value={summary.totalUsers}/>
            <DashboardCard title="Retailers" value={summary.totalRetailers}/>
            <DashboardCard title="WholeSalers" value={summary.totalWholesalers} />
            <DashboardCard title="Total Orders" value={summary.totalOrders} />
            <DashboardCard title="Total Products" value={summary.totalProducts}/>
            <DashboardCard
                title="Total Revenue (₹)"
                value={summary.totalRevenue ?? 0}
            />
            <DashboardCard
                title="Total GST (₹)"
                value={summary.totalGST ?? 0}
            />
        </div>
    </div>
  )
}
