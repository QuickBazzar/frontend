import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";


import { addToCartAction } from "@/redux/slices/cartSlice";
import ProductCard from "@/components/retailercomponents/ProductCard";
import "@/pages/Retailer/styles/products.css";
import { getProductsByWholesaler } from '@/services/retailer/product';


function ProductsByWholesaler() {
  const { wholesalerId } = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadProducts();
  }, [wholesalerId]);

  const loadProducts = async () => {
    setLoading(true);
    const res = await getProductsByWholesaler(wholesalerId);

    if (res.status === "success") {
      setProducts(res.data);
    } else {
      toast.error("Failed to load products");
    }
    setLoading(false);
  };

  const addToCart = (product) => {
    dispatch(addToCartAction(product));
    toast.success(`${product.name} added to cart`);
  };

  // Unique categories
  const categories = [
    ...new Set(products.map((p) => p.Category).filter(Boolean)),
  ];

  // Filtered and sorted products
  const filteredProducts = [...products]
    .filter((p) =>
      p.ProductName.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => (category ? p.Category === category : true))
    .sort((a, b) => {
      if (sort === "low") return a.Price - b.Price;
      if (sort === "high") return b.Price - a.Price;
      return 0;
    });

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4">

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-bold">Products</h4>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => navigate("/retailer/products")}
        >
          ← Back to Wholesalers
        </button>
      </div>

      {/* Search, Filter, Sort */}
      <div className="d-flex flex-wrap gap-3 mb-4">

        {/* Search */}
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "260px" }}
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}
        <select
          className="form-select"
          style={{ maxWidth: "220px" }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="form-select"
          style={{ maxWidth: "220px" }}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by price</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p className="text-muted">No products available</p>
        ) : (
          filteredProducts.map((p) => (
            <ProductCard
              key={p.ProductID}
              pid={p.ProductID}
              name={p.ProductName}
              price={p.Price}
              image={p.ProductImage}
              onAdd={() =>
                addToCart({
                  pid: p.ProductID,
                  name: p.ProductName,
                  price: Number(p.Price),
                  image: p.ProductImage,
                  quantity: 1,
                })
              }
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductsByWholesaler;


