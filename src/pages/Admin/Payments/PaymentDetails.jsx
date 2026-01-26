import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatCurrency, formatDateTime } from "../../../utils/formatters"
import { getPaymentByOrder } from "../../../services/admin/payment"

const PaymentDetails = () => {
  const { id } = useParams()
  const [payment, setPayment] = useState(null)

  useEffect(() => {
    loadPayment()
  }, [])

  const loadPayment = async () => {
    const result = await getPaymentByOrder(id)
    if (result?.status === "success") {
        
      setPayment(result.data)
    }
  }

  if (!payment) return <p>Loading payment...</p>

  return (
    <div className="container mt-3">
      <h3>Payment Details</h3>

      <p><b>Payment ID:</b> {payment.PaymentID}</p>
      <p><b>Order ID:</b> {payment.OrderID}</p>
      <p><b>Amount:</b> {formatCurrency(payment.Amount)}</p>
      <p><b>Mode:</b> {payment.PaymentMode}</p>
      <p><b>Date:</b> {formatDateTime(payment.PaymentDate)}</p>
    </div>
  )
}

export default PaymentDetails
