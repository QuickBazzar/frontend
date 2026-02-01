import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllProducts } from "../../services/product";
import ProductCard from "../../components/retailercomponents/ProductCard";
import "../../styles/products.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    setLoading(true);
    const result = await getAllProducts();
    console.log("FULL API RESPONSE:", result);
    if (result.status === "success" && Array.isArray(result.data)) {
      setProducts(result.data);
    } else {
      toast.error("Failed to load products");
    }
    setLoading(false);
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
      <h4 className="mb-4">Available Products</h4>

      <div className="product-grid">
        {products
          .filter((p) => p.ProductID)
          .map((p) => (
            <ProductCard
              key={p.ProductID}
              pid={p.ProductID}
              name={p.ProductName}
              price={p.Price}
              image={p.ProductImage}
              description={p.Description}
            />
          ))}
      </div>

      {products.length === 0 && (
        <p className="text-muted mt-3">No products available</p>
      )}
    </div>
  );
}

export default ProductList;

