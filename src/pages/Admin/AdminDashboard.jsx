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
    if (result?.status === "success") {
      setSummary(result.data)
    }
    setLoading(false)
  }

  if (loading) return <p className="mt-3">Loading Dashboard...</p>

  return (
    <div className="container-fluid mt-3">
      <h3 className="mb-4">Admin Dashboard</h3>

      <div className="row g-3">

        <DashboardCard
          title="Total Users"
          value={summary.totalUsers}
          icon="bi-people"
          color="primary"
          to="/admin/getAllUsers"
        />

        <DashboardCard
          title="Retailers"
          value={summary.totalRetailers}
          icon="bi-shop"
          color="success"
          to="/admin/getAllRetailers"
        />

        <DashboardCard
          title="Wholesalers"
          value={summary.totalWholesalers}
          icon="bi-truck"
          color="warning"
          to="/admin/getAllWholesalers"
        />

        <DashboardCard
          title="Total Orders"
          value={summary.totalOrders}
          icon="bi-receipt"
          color="info"
          to="/admin/orders"
        />

        <DashboardCard
          title="Total Products"
          value={summary.totalProducts}
          icon="bi-box-seam"
          color="secondary"
          to="/admin/products"
        />

        <DashboardCard
          title="Total Revenue (₹)"
          value={summary.totalRevenue ?? 0}
          icon="bi-currency-rupee"
          color="dark"
          to="/admin/payments"
        />

        <DashboardCard
          title="Total GST (₹)"
          value={summary.totalGST ?? 0}
          icon="bi-percent"
          color="danger"
          to="/admin/reports/gst"
        />

      </div>
    </div>
  )
}
