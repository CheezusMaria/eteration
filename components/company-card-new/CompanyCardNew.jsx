import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

const CompanyCardNew = ({ product, onAddToBasket }) => {
  const addToBasket = () => {
    const productToAdd = {
      ...product,
      price: parseFloat(product.price.replace(/[^\d.-]/g, "")),
      quantity: 1,
    };
    onAddToBasket(productToAdd);
  };
  const handleDetailsClick = () => {
    router.push(`/products/${product.id}`);
  };
  const router = useRouter();
  return (
    <div className="card" style={{ width: "18rem" }}>
      <Image
        src={product?.image}
        alt="product-logo"
        width={128}
        height={128}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{product?.name}</h5>
        <p className="card-text">Brand{product?.brand}</p>
        <p className="card-text">Model : {product?.model}</p>
        <p className="card-text">Price : {product?.price}</p>
        <div className="card-footer bg-white">
          <button
            onClick={addToBasket}
            type="button"
            className="btn btn-success w-100 m-1"
          >
            Add To Basket
          </button>
          <button
            onClick={handleDetailsClick}
            type="button"
            className="btn btn-primary w-100 m-1"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCardNew;
