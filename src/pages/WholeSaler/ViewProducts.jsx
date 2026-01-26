import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import WholesalerNavbar from './WholesalerNavbar'
import DataTable from '../../components/DataTable'
import {
  getAllProducts,
  deleteProduct,
} from '../../services/product'

const LOW_STOCK_THRESHOLD = 10

function ViewProducts() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts()
      if (res?.data?.status === 'success') {
        const data = res.data.data
        setProducts(data)
        setFilteredProducts(data)

        const uniqueCategories = [...new Set(data.map(p => p.Category))]
        setCategories(uniqueCategories)
      } else {
        toast.error('Failed to load products')
      }
    } catch (err) {
      console.error(err)
      toast.error('Server error')
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setFilteredProducts(
      category
        ? products.filter(p => p.Category === category)
        : products
    )
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await deleteProduct(productId)
      if (res?.data?.status === 'success') {
        toast.success('Product deleted')
        fetchProducts()
      } else {
        toast.error(res?.data?.error || 'Delete failed')
      }
    } catch (err) {
      console.error(err)
      toast.error('Server error')
    }
  }

  // 🔹 Stock badge logic
  const stockBadge = (qty) => {
    if (qty === 0)
      return <span className="badge bg-danger">Out of Stock</span>

    if (qty <= LOW_STOCK_THRESHOLD)
      return (
        <span className="badge bg-warning text-dark">
          Low Stock ({qty})
        </span>
      )

    return <span className="badge bg-success">{qty}</span>
  }

  // 🔹 DataTable columns
  const columns = [
    {
      key: 'ProductImage',
      label: 'Image',
      render: (row) => (
        <img
          src={`http://localhost:4000/productimages/${row.ProductImage}`}
          alt={row.ProductName}
          style={{ height: '80px', objectFit: 'contain' }}
          className="img-fluid"
        />
      ),
    },
    {
      key: 'ProductName',
      label: 'Name',
      render: (row) => (
        <span className="fw-semibold">{row.ProductName}</span>
      ),
    },
    {
      key: 'Description',
      label: 'Description',
      render: (row) => (
        <span className="text-muted">
          {row.Description || '—'}
        </span>
      ),
    },
    {
      key: 'Category',
      label: 'Category',
    },
    {
      key: 'Price',
      label: 'Price',
      render: (row) => (
        <span className="fw-bold text-success">
          ₹ {row.Price}
        </span>
      ),
    },
    {
      key: 'StockQuantity',
      label: 'Stock',
      render: (row) => stockBadge(row.StockQuantity),
    },
    {
      key: 'Actions',
      label: 'Actions',
      render: (row) => (
        <>
          <button
            className="btn btn-outline-primary btn-sm me-2"
            onClick={() =>
              navigate(`/wholesaler/update-product/${row.ProductID}`)
            }
          >
            Edit
          </button>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDelete(row.ProductID)}
          >
            Delete
          </button>
        </>
      ),
    },
  ]

  return (
    <>
      <WholesalerNavbar />

      <div className="container mt-4">
        <h3 className="text-center mb-4">My Products</h3>

        {/* CATEGORY FILTER */}
        <div className="mb-3 d-flex justify-content-end">
          <select
            className="form-select w-25"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <DataTable
          columns={columns}
          data={filteredProducts}
        />
      </div>
    </>
  )
}

export default ViewProducts
