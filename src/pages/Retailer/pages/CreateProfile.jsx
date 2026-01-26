import { useEffect, useState } from "react";
import { createProfile, getMyRetailerProfile, updateRetailerProfile } from "@/services/retailer/retailer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateProfile = () => {
  const [form, setForm] = useState({
    shopName: "",
    contactNumber: "",
    address: "",
    gstNumber: "",
  });

  const [retailerId, setRetailerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  // Load existing profile (if any)
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const result = await getMyRetailerProfile();

    if (
      result.status === "success" &&
      Array.isArray(result.data) &&
      result.data.length > 0
    ) {
      const r = result.data[0];
      setIsEdit(true);
      setRetailerId(r.RetailerID);

      setForm({
        shopName: r.ShopName,
        contactNumber: r.ContactNumber,
        address: r.Address,
        gstNumber: r.GSTNumber,
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (
      !form.shopName ||
      !form.contactNumber ||
      !form.address ||
      !form.gstNumber
    ) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    let result;
    if (isEdit) {
      // 🔄 UPDATE MODE
      result = await updateRetailerProfile(retailerId, form);
    } else {
      // ➕ CREATE MODE
      result = await createProfile(form);
    }

    setLoading(false);

    if (result.status === "success") {
      toast.success(
        isEdit ? "Profile updated successfully" : "Profile created successfully"
      );
      navigate("/retailer");
    } else {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h4 className="text-center mb-4">
              {isEdit ? "Update Retailer Profile" : "Create Retailer Profile"}
            </h4>

            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Shop Name</label>
                <input
                  className="form-control"
                  name="shopName"
                  value={form.shopName}
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
  );
};

export default CreateProfile;
