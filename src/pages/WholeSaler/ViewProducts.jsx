import { useEffect, useState } from 'react'
import WholesalerNavbar from './WholesalerNavbar'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {
  getAllProducts,
  deleteProduct,
} from '../../services/product'


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
      const response = await getAllProducts()
      if (response.data.status === 'success') {
        const data = response.data.data
        setProducts(data)
        setFilteredProducts(data)

        // 🔹 Auto-generate categories
        const uniqueCategories = [
          ...new Set(data.map(p => p.Category))
        ]
        setCategories(uniqueCategories)
      } else {
        toast.error('Failed to load products')
      }
    } catch {
      toast.error('Server error')
    }
  }

  // 🔹 Category filter logic
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)

    if (!category) {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(
        products.filter(p => p.Category === category)
      )
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await deleteProduct(id)
      if (res.data.status === 'success') {
        toast.success('Product deleted')
        fetchProducts()
      } else {
        toast.error(res.data.error || 'Delete failed')
      }
    } catch {
      toast.error('Server error')
    }
  }

  // UI only
  const handleStockChange = (productId, change) => {
    setFilteredProducts(prev =>
      prev.map(p =>
        p.ProductID === productId
          ? { ...p, StockQuantity: Math.max(0, p.StockQuantity + change) }
          : p
      )
    )
  }

  return (
    <>
      <WholesalerNavbar />

      <div className="container mt-4">
        <h3 className="text-center mb-4">My Products</h3>

        {/* 🔹 CATEGORY DROPDOWN */}
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

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map(p => (
                  <tr key={p.ProductID}>
                    <td style={{ width: '120px' }}>
                      <img
                        src={`http://localhost:4000/productimages/${p.ProductImage}`}
                        alt={p.ProductName}
                        className="img-fluid"
                        style={{ height: '80px', objectFit: 'contain' }}
                      />
                    </td>

                    <td className="fw-semibold">{p.ProductName}</td>

                    <td style={{ maxWidth: '250px' }}>
                      <span className="text-muted">
                        {p.Description || '—'}
                      </span>
                    </td>

                    <td>{p.Category}</td>

                    <td className="fw-bold text-success">₹ {p.Price}</td>

                    <td className="text-center text-nowrap">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleStockChange(p.ProductID, -1)}
                          disabled={p.StockQuantity <= 0}
                        >
                          −
                        </button>

                        <span className="fw-bold">{p.StockQuantity}</span>

                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleStockChange(p.ProductID, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="text-center text-nowrap">
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() =>
                          navigate(`/wholesaler/update-product/${p.ProductID}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(p.ProductID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ViewProducts
