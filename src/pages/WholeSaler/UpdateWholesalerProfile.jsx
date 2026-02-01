import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  getMyWholesalerProfile,
  updateWholesalerProfile,
} from "../../services/wholesaler"

function UpdateWholesalerProfile() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    businessName: "",
    contactNumber: "",
    address: "",
    gstNumber: "",
  })

  const [loading, setLoading] = useState(true)

  // Load existing profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getMyWholesalerProfile()

        if (res?.status === "success" && res.data?.length > 0) {
          const p = res.data[0]
          setForm({
            businessName: p.BusinessName || "",
            contactNumber: p.ContactNumber || "",
            address: p.Address || "",
            gstNumber: p.GSTNumber || "",
          })
        } else {
          toast.error("Failed to load profile")
        }
      } catch (err) {
        console.error(err)
        toast.error("Server error")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await updateWholesalerProfile(form)

      if (res?.status === "success") {
        toast.success("Profile updated successfully")
        navigate("/wholesaler/profile")
      } else {
        toast.error("Update failed")
      }
    } catch (err) {
      console.error(err)
      toast.error("Server error")
    }
  }

  if (loading) {
    return (
      <p className="text-center mt-5">
        Loading profile...
      </p>
    )
  }

  return (
    <div
      className="container mt-4"
      style={{ maxWidth: "500px" }}
    >
      <h4 className="mb-4 text-center">
        Update Profile
      </h4>

      <form onSubmit={handleSubmit}>
        {/* Business Name */}
        <label className="form-label">
          Business Name
        </label>
        <input
          className="form-control mb-3"
          name="businessName"
          value={form.businessName}
          onChange={handleChange}
          required
        />

        {/* Contact Number */}
        <label className="form-label">
          Contact Number
        </label>
        <input
          type="text"
          className="form-control mb-3"
          name="contactNumber"
          value={form.contactNumber}
          onChange={handleChange}
          required
        />

        {/* Address */}
        <label className="form-label">
          Address
        </label>
        <textarea
          className="form-control mb-3"
          name="address"
          rows="3"
          value={form.address}
          onChange={handleChange}
          required
        />

        {/* GST Number */}
        <label className="form-label">
          GST Number
        </label>
        <input
          className="form-control mb-4"
          name="gstNumber"
          value={form.gstNumber}
          onChange={handleChange}
          required
        />

        {/* Buttons */}
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-success w-50"
          >
            Update
          </button>

          <button
            type="button"
            className="btn btn-secondary w-50"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateWholesalerProfile
