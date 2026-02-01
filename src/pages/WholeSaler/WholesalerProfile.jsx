import { useEffect, useState } from "react"
import { getWholesalerFullProfile } from "../../services/wholesaler"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function WholesalerProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await getWholesalerFullProfile()

      if (res?.status === "success" && res.data?.length > 0) {
        setProfile(res.data[0])
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

  if (loading) {
    return <p className="text-center mt-5">Loading profile...</p>
  }

  if (!profile) {
    return <p className="text-center mt-5">No profile found</p>
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Profile</h3>

      <div className="card shadow-sm p-4">
        <p><b>Name:</b> {profile.Name}</p>
        <p><b>Email:</b> {profile.Email}</p>
        <p><b>Business Name:</b> {profile.BusinessName}</p>
        <p><b>Contact Number:</b> {profile.ContactNumber}</p>
        <p><b>Address:</b> {profile.Address}</p>
        <p><b>GST Number:</b> {profile.GSTNumber}</p>

        {/* UPDATE BUTTON */}
        <div className="mt-4 text-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/wholesaler/update-profile")}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default WholesalerProfile