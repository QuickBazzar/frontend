import { useState } from "react";
import AllProducts from "./AllProducts";
import WholesalerList from "../../WholeSaler/WholesalerList";

function ProductsPage() {
  const [view, setView] = useState("ALL");

  return (
    <div className="container-fluid px-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold">Products</h4>
          <p className="text-muted mb-0">
            Browse products your way
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="btn-group">
          {/* All Products */}
          <button className={`btn ${view === "ALL" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setView("ALL")} >
            All Products
          </button>
          
          {/* By Wholesaler */}
          <button className={`btn ${view === "WHOLESALER" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setView("WHOLESALER")} >
            By Wholesaler
          </button>
        </div>

      </div>

      {/* Content */}
      {view === "ALL" && <AllProducts />}
      {view === "WHOLESALER" && <WholesalerList />}
    </div>
  );
}

export default ProductsPage;
