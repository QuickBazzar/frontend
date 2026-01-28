import { useEffect, useState } from "react"
import DataTable from "../../../components/DataTable"
import { toast } from "react-toastify"
import { formatCurrency, formatDateTime } from "../../../utils/formatters"
import { getAllPayments, getPaymentsByMode, updatePaymentStatus } from "../../../services/admin/payment"

const PaymentsList = () => {
  const [payments, setPayments] = useState([])
  const [filtered, setFiltered] = useState([])
  const [mode, setMode] = useState("ALL")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPayments()
  }, [])

  useEffect(() => {
    filterByMode()
  }, [mode, payments])

  const loadPayments = async () => {
    const result = await getAllPayments()
    if (result?.status === "success") {
        console.log(result.data)
      setPayments(result.data)
      setFiltered(result.data)
    }
    setLoading(false)
  }

  const filterByMode = async () => {
    if (mode === "ALL") {
      setFiltered(payments)
    } else {
      const result = await getPaymentsByMode(mode)
      if (result?.status === "success") {
        setFiltered(result.data)
      }
    }
  }

  const handleStatusChange = async (payment, status) => {
    const result = await updatePaymentStatus(payment.PaymentID, status)
    if (result?.status === "success") {
      toast.success("Payment status updated")
      loadPayments()
    } else {
      toast.error("Update failed")
    }
  }

  const columns = [
    { label: "Payment ID", key: "PaymentID" },
    { label: "Order ID", key: "OrderID" },
    {
      label: "Amount",
      key: "Amount",
      render: (row) => formatCurrency(row.Amount),
    },
    { label: "Mode", key: "PaymentMode" },
    {
      label: "Date",
      key: "PaymentDate",
      render: (row) => formatDateTime(row.PaymentDate),
    },
  ]

  const actions = [
    {
      label: "Mark Paid",
      className: "btn-success",
      onClick: (p) => handleStatusChange(p, "PAID"),
    },
    {
      label: "Mark Failed",
      className: "btn-danger",
      onClick: (p) => handleStatusChange(p, "FAILED"),
    },
  ]

  if (loading) return <p>Loading payments...</p>

  return (
    <div className="container mt-3">
      <h3>Payment Reports</h3>

      <div className="mb-3 w-25">
        <select
          className="form-select"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="ALL">All Modes</option>
          <option value="CASH">Cash</option>
          <option value="UPI">UPI</option>
          <option value="CARD">Card</option>
          <option value="WALLET">Wallet</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        actions={actions}
      />
    </div>
  )
}

export default PaymentsList
