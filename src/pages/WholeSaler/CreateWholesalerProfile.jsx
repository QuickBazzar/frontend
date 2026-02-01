import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  getMyWholesalerProfile,
  registerWholesaler,
  updateWholesalerProfile,
} from "../../services/wholesaler"

const CreateWholesalerProfile = () => {
  const [form, setForm] = useState({
    businessName: "",
    contactNumber: "",
    address: "",
    gstNumber: "",
  })

  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const navigate = useNavigate()

  /* =======================
     LOAD PROFILE IF EXISTS
  ======================= */
  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    const result = await getMyWholesalerProfile()

    if (
      result?.status === "success" &&
      Array.isArray(result.data) &&
      result.data.length > 0
    ) {
      const w = result.data[0]
      setIsEdit(true)

      setForm({
        businessName: w.BusinessName || "",
        contactNumber: w.ContactNumber || "",
        address: w.Address || "",
        gstNumber: w.GSTNumber || "",
      })
    }
  }

  /* =======================
     HANDLE INPUT
  ======================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  /* =======================
     SUBMIT FORM
  ======================= */
  const submit = async (e) => {
    e.preventDefault()

    const { businessName, contactNumber, address, gstNumber } = form

    if (!businessName || !contactNumber || !address || !gstNumber) {
      toast.error("All fields are required")
      return
    }

    setLoading(true)

    const result = isEdit
      ? await updateWholesalerProfile(form)
      : await registerWholesaler(form)

    setLoading(false)

    if (result?.status === "success") {
      toast.success(
        isEdit
          ? "Profile updated successfully"
          : "Profile created successfully"
      )
      navigate("/wholesaler")
    } else {
      toast.error(result?.error || "Operation failed")
    }
  }

  /* =======================
     UI
  ======================= */
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h4 className="text-center mb-4">
              {isEdit
                ? "Update Wholesaler Profile"
                : "Create Wholesaler Profile"}
            </h4>

            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Business Name</label>
                <input
                  className="form-control"
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input
                  className="form-control"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">GST Number</label>
                <input
                  className="form-control"
                  name="gstNumber"
                  value={form.gstNumber}
                  onChange={handleChange}
                />
              </div>

              <button
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : isEdit
                  ? "Update Profile"
                  : "Create Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateWholesalerProfile