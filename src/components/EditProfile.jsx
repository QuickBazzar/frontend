import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const EditProfile = ({ initialData, onSubmit, backTo }) => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    shopName: "",
    contactNumber: "",
    address: "",
    gstNumber: "",
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        shopName: initialData.ShopName || "",
        contactNumber: initialData.ContactNumber || "",
        address: initialData.Address || "",
        gstNumber: initialData.GSTNumber || "",
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await onSubmit(form)

    if (result && result.status === "success") {
      toast.success("Updated successfully")
      navigate(backTo)
    } else {
      toast.error(result?.error || "Update failed")
    }
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3 text-center">
                Update Retailer
              </h4>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Shop Name</label>
                  <input
                    className="form-control form-control-sm"
                    name="shopName"
                    value={form.shopName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contact Number</label>
                  <input
                    className="form-control form-control-sm"
                    name="contactNumber"
                    value={form.contactNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    className="form-control form-control-sm"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">GST Number</label>
                  <input
                    className="form-control form-control-sm"
                    name="gstNumber"
                    value={form.gstNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex justify-content-end">
                  <button className="btn btn-success btn-sm">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm ms-2"
                    onClick={() => navigate(backTo)}
                  >
                    Cancel
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
