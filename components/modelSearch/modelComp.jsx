import React, { useState } from "react";

const BrandSearch = ({ models, onModelSelect, selectedModels }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const filteredModels = searchTerm
    ? (models || []).filter((model) => model.toLowerCase().includes(searchTerm))
    : models || [];

  return (
    <div>
      <input
        type="text"
        placeholder="Search by model"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border m-1 p-1"
      />
      <div
        className="border m-1 p-1 list-group"
        style={{ maxHeight: "8rem", overflowY: "auto" }}
      >
        {filteredModels.map((model, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={model}
              checked={selectedModels.includes(model)}
              onChange={(e) => onModelSelect(e.target.checked, model)}
            />
            {model}
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandSearch;
