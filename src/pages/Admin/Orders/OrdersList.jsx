import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteOrder, getAllOrders, updateDeliveryStatus } from '../../../services/admin/orders'
import { toast } from 'react-toastify'
import { formatCurrency, formatDateTime } from '../../../utils/formatters'
import DataTable from '../../../components/DataTable'

const OrdersList = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        loadOrders()
    },[])

    const loadOrders = async() => {
        const result = await getAllOrders()
        if(result?.status == "success"){
            setOrders(result.data)
        }
        setLoading(false)
    }

    const handleDelete = async (order) => {
        if(!window.confirm(`Do you want delete order ${order.OrderID}?`)) return

        const result = await deleteOrder(order.OrderID)
        if(result?.status == "success"){
            console.log(result.data);
            
            toast.success("Order deleted")
            loadOrders()
        }
        else{
            toast.error("Delete Failed")
        }
    }

    const columns = [
        {label: "Order Id", key:"OrderID"},
        {label: "Retailer ID", key:"RetailerID"},
        {
            label: "Order Date",
            key: "OrderDate",
            render: (row) => formatDateTime(row.OrderDate),

        },
        {
            label: "Total Amount",
            key: "GrandTotal",
            render: (row) => formatCurrency(row.GrandTotal),
        }, 
        {label: "Payment", key: "PaymentStatus"},
        {label: "Delivery", key: "DeliveryStatus"},
    ]

    const actions = [
        {
            label : "View",
            className: "btn-info",
            onClick: (order) => 
                navigate(`/admin/orders/${order.OrderID}`),
        },
        {
            label: "Delete",
            className: "btn-danger",
            onClick: handleDelete,
        },
    ]

    if(loading) return <p>Loading Orders....</p>
  return (
    <div className='conatainer mt-3'>
        <h3>Orders Management</h3>

        <DataTable 
            columns={columns}
            data={orders}
            actions={actions}
        />

        <div className='mt-3'>
            <small className='text-muted'>
                Update delivery status from order details
            </small>
        </div>
    </div>
  )
}

export default OrdersList