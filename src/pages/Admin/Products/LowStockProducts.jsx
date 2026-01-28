import React, { lazy, useEffect, useState } from 'react'
import { deleteProduct, getLowStockProducts, updateProductStatus } from '../../../services/admin/product'
import { toast } from 'react-toastify'
import ProductsList from './ProductsList';
import DataTable from '../../../components/DataTable';

const LowStockProducts = () => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [filterd, setFiltered] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadProducts()
    },[])

    useEffect(() => {
        applySearch()
    }, [search, products])

    const loadProducts = async () => {
        const result = await getLowStockProducts()
        if(result?.status == "success"){
            setProducts(result.data)
            setFiltered(result.data)
        }
        setLoading(false)
    }

    const applySearch = () => {
        let data = [...products]
        if(search.trim()) {
            data = data.filter(p => 
                p.ProductName.toLowerCase().includes(search.toLowerCase())
            )
        }
        setFiltered(data)
    }

    const handelDelete = async(product) => {
        if(!window.confirm(`Do you want to delete ${product.product}?`)) return

        const result = await deleteProduct(product.ProductID)
        if(result?.status == "success"){
            toast.success("Product deleted")
            loadProducts()
        }
        else{
            toast.error("Delete failed")
        }
    }

    const handleToggleStatus = async(product) => {
        const result = await updateProductStatus(
            product.ProductID,
            !product.IsActive
        )

        if(result?.status == "success"){
            toast.success("Status updated")
            loadProducts()
        } else{
            toast.error("Update failed")
        }
    }

    const columns = [
        {label: "ID", key: "ProductID"},
        {label: "Name", key: "ProductName"},
        {label: "Category", key: "Category"},
        {label: "Stock", key: "StockQuantity"},
        {label: "Active", key: "IsActive"},
    ]

    const actions = [
    {
        label: "BLock / Unblock",
        className: "btn-warning",
        onClick: handleToggleStatus,
    },
    {
        label: "Delete",
        className: "btn-danger",
        onClick: handelDelete,
    },
    ]

    if(loading) return <p>Loading low-stock products...</p>
  return (
    <div className='container mt-3'>
        <h3 className='text-danger'>Low Stock Products</h3>

        <input
            className='form-control form-control-sm mb-3 w-25'
            placeholder='Search product'
            value={search}
            onChange={(e) => setSearch(e.target.value)}    
        />

        <DataTable
            columns={columns}
            data={filterd}
            actions={actions}
        />
    </div>
  )
}

export default LowStockProducts