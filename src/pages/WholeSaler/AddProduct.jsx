import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import WholesalerNavbar from './WholesalerNavbar'
import { addProduct } from '../../services/product'

function AddProduct() {
  const navigate = useNavigate()

  const [ProductName, setProductName] = useState('')
  const [Category, setCategory] = useState('')
  const [Description, setDescription] = useState('')
  const [Quantity, setQuantity] = useState('')
  const [Price, setPrice] = useState('')
  const [StockQuantity, setStockQuantity] = useState('')
  const [ProductImage, setProductImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !ProductName ||
      !Category ||
      !Description ||
      !Quantity ||
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
    formData.append('Quantity', Quantity)
    formData.append('Price', Price)
    formData.append('StockQuantity', StockQuantity)
    formData.append('ProductImage', ProductImage)

    try {
      const response = await addProduct(formData)
      console.log('FULL RESPONSE:', response.data)

      if (response.data.status === 'success') {
        toast.success('Product added successfully')

        // reset form
        setProductName('')
        setCategory('')
        setDescription('')
        setQuantity('')
        setPrice('')
        setStockQuantity('')
        setProductImage(null)

        navigate('/wholesaler/view-products')
      } else {
        toast.error(response.data.error || 'Failed to add product')
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to add product')
    }
  }

  return (
    <>
      <WholesalerNavbar />

      <div className="container w-50 mt-4">
        <h4>Add Product</h4>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            placeholder="Product Name"
            value={ProductName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Category"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Quantity (e.g. pack size)"
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Stock Quantity"
            value={StockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setProductImage(e.target.files[0])}
          />

          <button className="btn btn-success w-100">
            Add Product
          </button>
        </form>
      </div>
    </>
  )
}

export default AddProduct
