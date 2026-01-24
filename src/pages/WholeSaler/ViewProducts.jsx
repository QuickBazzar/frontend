import { useEffect, useState } from 'react'
import WholesalerNavbar from './WholesalerNavbar'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getAllProducts, deleteProduct } from '../../services/product'

function ViewProducts() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts()
      if (response.data.status === 'success') {
        setProducts(response.data.data)
      } else {
        toast.error('Failed to load products')
      }
    } catch {
      toast.error('Server error')
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

  // 🔼 🔽 Stock change (UI only)
  const handleStockChange = (productId, change) => {
    setProducts(prev =>
      prev.map(p =>
        p.ProductID === productId
          ? { ...p, StockQuantity: Math.max(0, p.StockQuantity + change) }
          : p
      )
    )
  }

  // 🛒 ADD TO CART (API can be connected later)
  const handleAddToCart = (product) => {
    toast.success(`${product.ProductName} added to cart`)
    // later → call addToCart API here
  }

  return (
    <>
      <WholesalerNavbar />

      <div className="container mt-4">
        <h3 className="text-center mb-4">My Products</h3>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map(p => (
                  <tr key={p.ProductID}>
                    {/* IMAGE */}
                    <td style={{ width: '120px' }}>
                      <img
                        src={`http://localhost:4000/productimages/${p.ProductImage}`}
                        alt={p.ProductName}
                        className="img-fluid"
                        style={{ height: '80px', objectFit: 'contain' }}
                      />
                    </td>

                    {/* NAME */}
                    <td className="fw-semibold">{p.ProductName}</td>

                    {/* CATEGORY */}
                    <td>{p.Category}</td>

                    {/* PRICE */}
                    <td className="text-success fw-bold">₹ {p.Price}</td>

                    {/* STOCK */}
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

                    {/* ACTIONS */}
                    <td className="text-center text-nowrap">
                      <button
                        className="btn btn-outline-success btn-sm me-2"
                        disabled={p.StockQuantity === 0}
                        onClick={() => handleAddToCart(p)}
                      >
                        Add to Cart
                      </button>

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
