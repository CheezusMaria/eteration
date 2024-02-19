import React, { useState } from "react";

const BrandSearch = ({ brands, onBrandSelect, selectedBrands }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const filteredBrands = searchTerm
    ? (brands || []).filter((brand) => brand.toLowerCase().includes(searchTerm))
    : brands || [];

  return (
    <div>
      <input
        type="text"
        placeholder="Search by brand"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border m-1 p-1"
      />
      <div
        className="border m-1 p-1 list-group"
        style={{ maxHeight: "8rem", overflowY: "auto" }}
      >
        {filteredBrands.map((brand, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={brand}
              checked={selectedBrands.includes(brand)}
              onChange={(e) => onBrandSelect(e.target.checked, brand)}
            />
            {brand}
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandSearch;
