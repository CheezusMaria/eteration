import React, { useState, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import Header from "../../components/header/Header";
const ProductElement = ({ product }) => {
  const router = useRouter();
  const [basket, setBasket] = useState({ items: {}, total: 0 });

  useEffect(() => {
    // Fetch the basket from localStorage
    const basketFromStorage = localStorage.getItem("basket");
    if (basketFromStorage) {
      setBasket(JSON.parse(basketFromStorage));
    }
  }, []);

  const handleAddToBasket = () => {
    const newQuantity = basket.items[product.id]
      ? basket.items[product.id].quantity + 1
      : 1;
    const newItems = {
      ...basket.items,
      [product.id]: { product, quantity: newQuantity },
    };

    const newTotal = Object.values(newItems).reduce(
      (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
      0
    );

    const newBasket = {
      items: newItems,
      total: newTotal,
    };

    setBasket(newBasket);
    localStorage.setItem("basket", JSON.stringify(newBasket));
  };
  return (
    <div>
      <Header totalShownPrice={basket.total.toFixed(2)}></Header>
      <div className="container ">
        <div className="card mb-3 mt-5">
          <div className="row g-0">
            <div className="col-md-4">
              <Image
                src={product?.image}
                alt="product-logo"
                width={512}
                height={512}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product?.name}</h5>
                <p className="card-text">{product?.description}</p>
                <h3 className="text-primary mb-4">{product?.price}</h3>
                <button
                  onClick={handleAddToBasket}
                  type="button"
                  className="btn btn-primary w-100"
                >
                  Add to Cart
                </button>
                <div className="mt-3">
                  <h5>Total Price:{basket.total.toFixed(2)}₺</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ query, req, res }) {
  const id = query.id;

  const results = await fetch(
    `https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`,
    {}
  ).then((response) => {
    return response.json();
  });

  if (results) {
    console.log(results);
    return {
      props: {
        product: results,
      },
    };
  } else {
    return {
      props: { err: 404 },
    };
  }
}

export default ProductElement;
