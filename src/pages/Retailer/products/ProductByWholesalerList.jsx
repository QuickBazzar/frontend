import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllWholesalers } from "../../../services/retailer/wholesaler";

function ProductByWholesalerList() {
  const [wholesalers, setWholesalers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadWholesalers();
  }, []);

  const loadWholesalers = async () => {
    setLoading(true);
    try {
      const res = await getAllWholesalers();
      if (res.status === "success") {
        setWholesalers(res.data);
      } else {
        toast.error("Failed to load wholesalers");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4">
      <h3 className="fw-bold mb-4">Select Wholesaler</h3>

      {wholesalers.length === 0 ? (
        <p className="text-muted">No wholesalers available</p>
      ) : (
        <div className="row g-4">
          {wholesalers.map((w) => (
            <div className="col-lg-4 col-md-6" key={w.WholesalerID}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold mb-2">
                    {w.BusinessName}
                  </h5>

                  <p className="text-muted mb-3">
                    📍 {w.Address || "Address not available"}
                  </p>

                  <div className="mt-auto">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => {
                        sessionStorage.setItem(
                          "selectedWholesaler",
                          JSON.stringify(w)
                        );
                        navigate(`/retailer/products/${w.WholesalerID}`);
                      }}
                    >
                      View Products
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductByWholesalerList;