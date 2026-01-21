import { useEffect, useState } from "react";
import { getMyRetailerProfile, updateRetailerProfile, getRetailerWallet } 
from "@/services/retailer/retailer";
import { toast } from "react-toastify";

function Profile() {
  const [retailerId, setRetailerId] = useState(null);

  const [shopName, setShopName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    loadProfile();
  }, []);


  // Load profile (same as getUserProfile)
  const loadProfile = async () => {
    const result = await getMyRetailerProfile();

    if (result.status === "success" && result.data.length > 0) {
      const r = result.data[0];

      setRetailerId(r.RetailerID);
      setShopName(r.ShopName);
      setContactNumber(r.ContactNumber);
      setAddress(r.Address);
      setGstNumber(r.GSTNumber);
      loadWallet(r.RetailerID);
    } else {
      toast.error("Retailer profile not found");
    }
  };
  const loadWallet = async (id) => {
    const result = await getRetailerWallet(id);
    if (result.status === "success" && result.data.length > 0) {
      setWallet(result.data[0].WalletBalance);
    }
  };


  // Update profile (same as updateUserProfile)
  const updateProfile = async () => {
    if (!contactNumber || !address || !gstNumber) {
      toast.warning("All fields are required");
      return;
    }
    const result = await updateRetailerProfile(retailerId, {
      shopName,
      contactNumber,
      address,
      gstNumber,
    });

    if (result.status === "success") {
      toast.success("Profile updated successfully");
    } else {
      toast.error(result.error || "Update failed");
    }
  };

  return (
    <div className="container w-75">
      <h4 className="mb-4">Retailer Profile</h4>

      <div className="mb-3">
        <label className="form-label">Shop Name</label>
        <input className="form-control" value={shopName} disabled />
      </div>

      <div className="mb-3">
        <label className="form-label">Mobile</label>
        <input
          className="form-control"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <textarea
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">GST Number</label>
        <input
          className="form-control"
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mb-4" onClick={updateProfile}>
        Update Profile
      </button>

      {/* Wallet */}
      <div className="card p-3 bg-light">
        <h5>Wallet Balance</h5>
        <h3 className="text-success">₹ {wallet}</h3>
      </div>
    </div>
  );
}

export default Profile;


