import React, { useEffect, useState } from 'react'
import {getFailedPayments, getPaidPayments,getPendingPayments} from '../../../services/admin/reports'
import DataTable from '../../../components/DataTable'
import { formatCurrency, formatDateTime } from '../../../utils/formatters'

export const PaymentReports = () => {
  const [data, setData] = useState([])
  const [type, setType] = useState("PAID")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [type])   // 🔥 reload when type changes

  const loadData = async () => {
    setLoading(true)
    let result

    if (type === "PAID") result = await getPaidPayments()
    else if (type === "PENDING") result = await getPendingPayments()
    else result = await getFailedPayments()

    if (result?.status === "success") {
      setData(result.data)
    } else {
      setData([])
    }
    setLoading(false)
  }

  const columns = [
    { label: "Order ID", key: "OrderID" },
    { label: "Retailer ID", key: "RetailerID" },

    {
      label: "Order Date",
      key: "OrderDate",
      render: (row) => formatDateTime(row.OrderDate),
    },

    { label: "Payment ID", key: "PaymentID" },
    { label: "Mode", key: "PaymentMode" },

    {
      label: "Payment Date",
      key: "PaymentDate",
      render: (row) => formatDateTime(row.PaymentDate),
    },

    {
      label: "Paid Amount",
      key: "PaidAmount",
      render: (row) => formatCurrency(row.PaidAmount),
    },

    {
      label: "Sub Total",
      key: "SubTotal",
      render: (row) => formatCurrency(row.SubTotal),
    },

    {
      label: "GST",
      key: "GSTAmount",
      render: (row) => formatCurrency(row.GSTAmount),
    },

    {
      label: "Grand Total",
      key: "GrandTotal",
      render: (row) => formatCurrency(row.GrandTotal),
    },
  ]

  if (loading) return <p>Loading payment reports...</p>

  return (
    <div className="container mt-3">
      <h3>Payment Reports</h3>

      {/* FILTER */}
      <select
        className="form-select w-25 mb-3"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="PAID">Paid</option>
        <option value="PENDING">Pending</option>
        <option value="FAILED">Failed</option>
      </select>

      <DataTable columns={columns} data={data} />
    </div>
  )
}
