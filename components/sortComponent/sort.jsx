import React from "react";

const SortOptions = ({ sortOption, onSortChange, sortOptions }) => {
  return (
    <div
      className="border m-1 p-1 list-group"
      style={{ maxHeight: "10rem", overflowY: "auto" }}
    >
      <p className="m-2">Sort By</p>
      <hr className="m-0 p-0" />
      <form className="list-group">
        {Object.keys(sortOptions).map((key) => (
          <label key={key}>
            <input
              type="radio"
              value={sortOptions[key]}
              checked={sortOption === sortOptions[key]}
              onChange={onSortChange}
            />
            {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </label>
        ))}
      </form>
    </div>
  );
};

export default SortOptions;
