import { useEffect, useState } from "react";
import { useProductFilters } from "../hooks/useProductFilters";
import { useWindowSize } from "../hooks/useWindowSize";
import { FilterBar } from "./FilterBar";
import { ProductCard } from "./ProductCard";

export const ProductList = ({ onViewDetails, search }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // 1. First, filter by SearchTerm
  const searchFilteredProducts = products.filter((product) => {
    const searchCase = (search || "").toLowerCase();
    return (
      product.title.toLowerCase().includes(searchCase) ||
      product.description.toLowerCase().includes(searchCase) ||
      product.category.toLowerCase().includes(searchCase)
    );
  });

  // 2. Then, pass search-filtered results into useProductFilters for Category, Price, and Sorting
  const { filters, setFilter, sortedProducts, resetFilters } =
    useProductFilters(searchFilteredProducts);

  // Added the useWindowSize hook here
  const { width } = useWindowSize();

  // Decide columns based on screen width
  const getGridColumns = () => {
    if (width < 480) return "1fr";
    else if (width >= 480 && width < 768) return "2fr 2fr";
    else if (width >= 768 && width < 1024) return "2fr 2fr 2fr";
    else return "repeat(4,1fr)";
  };
  // fetch categories
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log("Error: ", err));
  }, []);

  // Fetch all products once
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading Products...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Product Store</h1>

      {/* Filter Bar — replaces old category buttons */}
      <FilterBar
        filters={filters}
        setFilter={setFilter}
        resetFilters={resetFilters}
        categories={categories}
      />

      {/* Results Count */}
      <p style={{ color: "#666", marginBottom: "15px" }}>
        Showing {sortedProducts.length} of {products.length} products
      </p>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: getGridColumns(),
          gap: "20px",
        }}
      >
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
};