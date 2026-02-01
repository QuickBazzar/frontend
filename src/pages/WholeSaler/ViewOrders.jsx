import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import DataTable from '../../components/DataTable'
import { getWholesalerOrders, updateDeliveryStatus } from '../../services/order'

function ViewOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    loadOrders()
  }, [])

  // 🔹 Fetch wholesaler orders only
  const loadOrders = async () => {
    try {
      const res = await getWholesalerOrders()

      if (res?.status === 'success') {
        setOrders(res.data || [])
      } else {
        toast.error(res?.error || 'Failed to load orders')
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to load orders')
    }
  }

  // 🔹 Update delivery status
  const handleStatusChange = async (orderId, status) => {
    try {
      const res = await updateDeliveryStatus(orderId, status)

      if (res?.status === 'success') {
        toast.success('Delivery status updated')
        loadOrders()
      } else {
        toast.error(res?.error || 'Failed to update status')
      }
    } catch (err) {
      console.error(err)
      toast.error('Server error')
    }
  }

  // 🔹 Badge helpers
  const deliveryBadge = (status) => {
    const map = {
      PENDING: 'badge bg-warning text-dark',
      SHIPPED: 'badge bg-primary',
      DELIVERED: 'badge bg-success',
      CANCELLED: 'badge bg-danger',
    }
    return map[status] || 'badge bg-secondary'
  }

  const paymentBadge = (status) =>
    status === 'PAID' ? 'badge bg-success' : 'badge bg-danger'

  // 🔹 DataTable columns
  const columns = [
    { key: 'OrderID', label: 'Order ID' },
    { key: 'RetailerID', label: 'Retailer ID' },
    {
      key: 'OrderDate',
      label: 'Order Date',
      render: (row) => new Date(row.OrderDate).toLocaleString(),
    },
    {
      key: 'SubTotal',
      label: 'Sub Total',
      render: (row) => `₹ ${row.SubTotal}`,
    },
    {
      key: 'GSTAmount',
      label: 'GST',
      render: (row) => `₹ ${row.GSTAmount}`,
    },
    {
      key: 'GrandTotal',
      label: 'Total',
      render: (row) => (
        <span className="fw-bold text-success">
          ₹ {row.GrandTotal}
        </span>
      ),
    },
    {
      key: 'PaymentStatus',
      label: 'Payment',
      render: (row) => (
        <span className={paymentBadge(row.PaymentStatus)}>
          {row.PaymentStatus}
        </span>
      ),
    },
    {
      key: 'DeliveryStatus',
      label: 'Delivery',
      render: (row) => (
        <span className={deliveryBadge(row.DeliveryStatus)}>
          {row.DeliveryStatus}
        </span>
      ),
    },
    {
      key: 'UpdateStatus',
      label: 'Update Status',
      render: (row) => (
        <select
          className="form-select form-select-sm"
          value={row.DeliveryStatus}
          onChange={(e) =>
            handleStatusChange(row.OrderID, e.target.value)
          }
        >
          <option value="PENDING">PENDING</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      ),
    },
  ]

  return (
    <div className="container-fluid">
      <h3 className="text-center mb-4">Wholesaler Orders</h3>

      <DataTable columns={columns} data={orders} />
    </div>
  )
}

export default ViewOrders
