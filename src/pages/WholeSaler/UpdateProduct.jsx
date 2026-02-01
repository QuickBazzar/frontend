import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProductById, updateProduct } from '../../services/product'

function UpdateProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    ProductName: '',
    Category: '',
    Price: '',
    StockQuantity: '',
    Description: '',
  })

  const [image, setImage] = useState(null)

  // 🔹 Load product
  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    try {
      const res = await getProductById(id)

      if (res?.status === 'success' && res.data) {
        setProduct({
          ProductName: res.data.ProductName || '',
          Category: res.data.Category || '',
          Price: res.data.Price || '',
          StockQuantity: res.data.StockQuantity || '',
          Description: res.data.Description || '', // ✅ added
        })
      } else {
        toast.error(res?.error || 'Failed to load product')
      }
    } catch (err) {
      console.error(err)
      toast.error('Server error')
    }
  }

  // 🔹 Handle form change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    })
  }

  // 🔹 Update product
  const handleUpdate = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('ProductName', product.ProductName)
    formData.append('Category', product.Category)
    formData.append('Description', product.Description) 
    formData.append('Price', product.Price)
    formData.append('StockQuantity', product.StockQuantity)

    if (image) {
      formData.append('ProductImage', image)
    }

    try {
      const res = await updateProduct(id, formData)

      if (res?.status === 'success') {
        toast.success('Product updated successfully')
        navigate('/wholesaler/view-products')
      } else {
        toast.error(res?.error || 'Update failed')
      }
    } catch (err) {
      console.error(err)
      toast.error('Server error')
    }
  }

  return (
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

        <textarea
          className="form-control mb-2"
          name="Description"          // ✅ added
          placeholder="Description"
          value={product.Description} // ✅ controlled
          onChange={handleChange}
          rows="3"
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
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="btn btn-success w-100">
          Update Product
        </button>
      </form>
    </div>
  )
}

export default UpdateProduct
