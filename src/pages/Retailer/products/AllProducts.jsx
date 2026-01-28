import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllProducts } from "@/services/retailer/product";
import ProductCard from "@/components/retailercomponents/ProductCard";
import "@/pages/Retailer/styles/products.css";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const result = await getAllProducts();

    if (result.status === "success" && Array.isArray(result.data)) {
      setProducts(result.data);
    } else {
      toast.error("Failed to load products");
    }
    setLoading(false);
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
      if (sort === "price-asc") return a.Price - b.Price;
      if (sort === "price-desc") return b.Price - a.Price;
      if (sort === "name-asc")
        return a.ProductName.localeCompare(b.ProductName);
      if (sort === "name-desc")
        return b.ProductName.localeCompare(a.ProductName);
      return 0;
    });

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4">

      {/* Header */}
      {/*
      <div className="mb-4">
        <h4 className="fw-bold">All Products</h4>
        <p className="text-muted">
          Browse products from all wholesalers
        </p>
      </div> */}

      {/* Search, Filter, Sort */}
      <div className="d-flex flex-wrap gap-3 mb-4">

        {/* Search */}
        <input 
          type="text"
          className="form-control"
          style={{ maxWidth: "240px" }}
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}
        <select
          className="form-select"
          style={{ maxWidth: "200px" }}
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
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p className="text-muted">No products found</p>
        ) : (
          filteredProducts.map((p) => (
            <ProductCard
              key={p.ProductID}
              pid={p.ProductID}
              name={p.ProductName}
              price={p.Price}
              image={p.ProductImage}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default AllProducts;


