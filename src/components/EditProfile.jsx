import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const EditProfile = ({title, fields, initialData, onSubmit, backTo }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({})

  useEffect(() => {
    if (initialData && fields) {
      const data = {}
      fields.forEach((field) => {
        data[field.name] = initialData[field.mapKey] || ""
      })
      setForm(data)
    }
  }, [initialData, fields])

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
              <h4 className="card-title mb-3 text-center">{title}
              </h4>

              <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                  <div className="mb-3" key={field.name}>
                    <label className="form-label">{field.label}</label>
                    <input
                      type={field.type || "text"}
                      className={`form-control form-control-sm ${field.readOnly ? "bg-light" : ""}`}
                      name={field.name}
                      value={form[field.name] || ""}
                      onChange={handleChange}
                      readOnly={field.readOnly}
                      disabled={field.disabled}
                    />
                  </div>
                ))}

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
