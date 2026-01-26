import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMyRetailerProfile } from "../../services/retailer/retailer";

function RetailerProfileGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    const result = await getMyRetailerProfile();

    if (
      result.status === "success" &&
      Array.isArray(result.data) &&
      result.data.length > 0
    ) {
      setHasProfile(true);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (!hasProfile) {
    return <Navigate to="/retailer/create-profile" />;
  }

  return children;
}

export default RetailerProfileGuard;
