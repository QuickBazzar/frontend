import { useEffect, useState } from 'react'
import WholesalerNavbar from './WholesalerNavbar'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
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
      const response = await getAllProducts()
      if (response.data.status === 'success') {
        const data = response.data.data
        setProducts(data)
        setFilteredProducts(data)

        const uniqueCategories = [...new Set(data.map(p => p.Category))]
        setCategories(uniqueCategories)
      } else {
        toast.error('Failed to load products')
      }
    } catch {
      toast.error('Server error')
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setFilteredProducts(
      category ? products.filter(p => p.Category === category) : products
    )
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
              <option key={index} value={cat}>{cat}</option>
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

                    <td className="fw-bold text-success">
                      ₹ {p.Price}
                    </td>

                    {/* STOCK WITH WARNING */}
                    <td className="text-center fw-bold">
                      {p.StockQuantity === 0 && (
                        <span className="badge bg-danger">
                          Out of Stock
                        </span>
                      )}

                      {p.StockQuantity > 0 &&
                        p.StockQuantity <= LOW_STOCK_THRESHOLD && (
                          <span className="badge bg-warning text-dark">
                            Low Stock ({p.StockQuantity})
                          </span>
                        )}

                      {p.StockQuantity > LOW_STOCK_THRESHOLD && (
                        <span className="badge bg-success">
                          {p.StockQuantity}
                        </span>
                      )}
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
