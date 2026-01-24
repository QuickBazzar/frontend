import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import WholesalerNavbar from './WholesalerNavbar'
import { getProductById, updateProduct } from '../../services/product'

function UpdateProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    ProductName: '',
    Category: '',
    Price: '',
    StockQuantity: ''
  })

  const [image, setImage] = useState(null)

  // ✅ LOAD PRODUCT
  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    try {
      const res = await getProductById(id)

      if (res.data.status === 'success') {
        setProduct({
          ProductName: res.data.data.ProductName,
          Category: res.data.data.Category,
          Price: res.data.data.Price,
          StockQuantity: res.data.data.StockQuantity
        })
      } else {
        toast.error('Failed to load product')
      }
    } catch (err) {
      toast.error('Server error')
    }
  }

  // ✅ THIS WAS MISSING
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  // ✅ UPDATE PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('ProductName', product.ProductName)
    formData.append('Category', product.Category)
    formData.append('Price', product.Price)
    formData.append('StockQuantity', product.StockQuantity)

    if (image) {
      formData.append('ProductImage', image)
    }

    try {
      const res = await updateProduct(id, formData)

      if (res.data.status === 'success') {
        toast.success('Product updated successfully')
        navigate('/wholesaler/view-products')
      } else {
        toast.error(res.data.error || 'Update failed')
      }
    } catch (err) {
      toast.error('Server error')
    }
  }

  return (
    <>
      <WholesalerNavbar />

      <div className="container w-50 mt-4">
        <h3 className="mb-3">Edit Product</h3>

        <form onSubmit={handleUpdate}>
          <input
            className="form-control mb-2"
            name="ProductName"
            value={product.ProductName}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />

          <input
            className="form-control mb-2"
            name="Category"
            value={product.Category}
            onChange={handleChange}
            placeholder="Category"
            required
          />

          <input
            type="number"
            className="form-control mb-2"
            name="Price"
            value={product.Price}
            onChange={handleChange}
            placeholder="Price"
            required
          />

          <input
            type="number"
            className="form-control mb-3"
            name="StockQuantity"
            value={product.StockQuantity}
            onChange={handleChange}
            placeholder="Stock Quantity"
            required
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button className="btn btn-success w-100">
            Update Product
          </button>
        </form>
      </div>
    </>
  )
}

export default UpdateProduct
