import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addProduct } from '../../services/product'

function AddProduct() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [ProductName, setProductName] = useState('')
  const [Category, setCategory] = useState('')
  const [Description, setDescription] = useState('')
  const [Price, setPrice] = useState('')
  const [StockQuantity, setStockQuantity] = useState('')
  const [ProductImage, setProductImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !ProductName ||
      !Category ||
      !Description ||
      !Price ||
      !StockQuantity ||
      !ProductImage
    ) {
      toast.error('All fields are required')
      return
    }

    const formData = new FormData()
    formData.append('ProductName', ProductName)
    formData.append('Category', Category)
    formData.append('Description', Description)
    formData.append('Price', Price)
    formData.append('StockQuantity', StockQuantity)
    formData.append('ProductImage', ProductImage)

    try {
      const response = await addProduct(formData)

      if (response.status === 'success') {
        toast.success('Product added successfully')

        // reset form
        setProductName('')
        setCategory('')
        setDescription('')
        setPrice('')
        setStockQuantity('')
        setProductImage(null)

        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }

        navigate('/wholesaler/view-products')
      } else {
        toast.error(response.error || 'Failed to add product')
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to add product')
    }
  }

  return (
    <div className="container w-50 mt-4">
      <h4>Add Product</h4>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Product Name"
          value={ProductName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Category"
          value={Category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          required
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          value={Price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Stock Quantity"
          value={StockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          required
        />

        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setProductImage(e.target.files[0])}
          required
        />

        <button className="btn btn-success w-100">
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct
