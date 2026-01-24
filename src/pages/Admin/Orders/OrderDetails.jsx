import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrderById, updateDeliveryStatus } from '../../../services/admin/orders'
import { toast } from 'react-toastify'

export const OrderDetails = () => {
    const {id} = useParams()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        loadOrder()
    }, [])

    const loadOrder = async() => {
        const result = await getOrderById(id)

        if(result?.status == "success"){
            setOrder(result.data[0])
        }
    }

    const updateStatus = async (status) => {
        const result = await updateDeliveryStatus(order.OrderID, status)
        if(result?.status == "success"){
            toast.success("Status updated")
            loadOrder()
        }
        else{
            toast.error("Update failed")
        }
    }

    if(!order) return <p>Loading order...</p>


  return (
    <div className='container mt-3'>
        <h3>Order #{order.OrderID}</h3>

        <p><b>Retailer ID:</b> {order.RetailerID}</p>
        <p><b>SubTotal:</b> ₹{order.SubTotal}</p>
        <p><b>GST:</b> ₹{order.GSTAmount}</p>
        <p><b>Total:</b> ₹{order.TotalAmount}</p>
        <p><b>Payment Status</b> {order.PaymentStatus}</p>

        <div className='mt-3'>
            <label className='form-label'>Delivery Status</label>
            <select 
                className='form-select w-25'
                value={order.DeliveryStatus}
                onChange={(e) => updateStatus(e.target.value)}
            >
                <option>PENDING</option>
                <option>SHIPPED</option>
                <option>DELIVERED</option>
                <option>CANCELLED</option>
            </select>
        </div>
    </div>
  )
}
