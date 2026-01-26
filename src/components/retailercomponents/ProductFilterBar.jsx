function ProductFilterBar({
  search,
  setSearch,
  category,
  setCategory,
  categories,
}) {
  return (
    <div className="row g-3 mb-4 align-items-end">
      {/* Search */}
      <div className="col-md-6">
        <label className="form-label fw-semibold">Search Product</label>
        <input
          type="text"
          className="form-control"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="col-md-4">
        <label className="form-label fw-semibold">Category</label>
        <select
          className="form-select"
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
      </div>

      {/* Reset */}
      <div className="col-md-2">
        <button
          className="btn btn-outline-secondary w-100"
          onClick={() => {
            setSearch("");
            setCategory("");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default ProductFilterBar;
