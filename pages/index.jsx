import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import Header from "../components/header/Header";
import ProductCard from "../components/company-card-new/CompanyCardNew";
import { useRouter } from "next/router";
import styles from "./Main.module.scss";
import Pagination from "../components/pagination/pagination";
import SortComponent from "../components/sortComponent/sort";
import SearchInput from "../components/searchComponent/search";
import BrandSearch from "../components/brandSearch/brandComponent";
import ModelSearch from "../components/modelSearch/modelComp";
const InvHome = ({ products, page, pagecount, brands, models }) => {
  const router = useRouter();
  const SortOptions = {
    old_to_new: "dateOldToNew",
    New_to_old: "dateNewToOld",
    Price_high_to_low: "priceHighToLow",
    Price_low_to_high: "priceLowToHigh",
  };
  const [sortOption, setSortOption] = useState(SortOptions.NEW_TO_OLD);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [basket, setBasket] = useState({ items: {}, total: 0 });
  const [totalPrice, setTotalPrice] = useState(0);
  const handleAddToBasket = (product) => {
    setBasket((prevBasket) => {
      const quantity = prevBasket.items[product.id]
        ? prevBasket.items[product.id].quantity + 1
        : 1;
      const newTotal = prevBasket.total + parseFloat(product.price);
      return {
        items: {
          ...prevBasket.items,
          [product.id]: { product, quantity },
        },
        total: newTotal,
      };
    });
  };
  useEffect(() => {
    const itemsArray = Object.values(basket.items);
    const newTotal = itemsArray.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    setTotalPrice(newTotal);
  }, [basket]);
  useEffect(() => {
    const savedBasket = localStorage.getItem("basket");
    if (savedBasket) {
      const basketData = JSON.parse(savedBasket);
      setBasket(basketData);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);
  const handleBrandSelect = (isChecked, brand) => {
    if (isChecked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };
  const handleModelSelect = (isChecked, model) => {
    if (isChecked) {
      setSelectedModels([...selectedModels, model]);
    } else {
      setSelectedModels(selectedModels.filter((b) => b !== model));
    }
  };
  useEffect(() => {
    let updatedProducts = products;

    // Filter products by search input
    if (searchInput.length >= 3) {
      updatedProducts = updatedProducts.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    if (selectedBrands.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }
    if (selectedModels.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        selectedModels.includes(product.model)
      );
    }
    setSortedProducts(sortProducts(updatedProducts, sortOption));
  }, [
    searchInput,
    selectedBrands,
    sortOption,
    products,
    selectedModels,
    models,
  ]);
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };
  const sortProducts = (products, sortOption) => {
    switch (sortOption) {
      case "dateOldToNew":
        return [...products].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "dateNewToOld":
        return [...products].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "priceHighToLow":
        return [...products].sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      case "priceLowToHigh":
        return [...products].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      default:
        return products;
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setSortedProducts(sortProducts(products, event.target.value));
  };
  return (
    // proje haftasonuna denk geldi css kısımları ile çok ilgilenemedim, ana sayfada scss componentlerde bootstrap var
    <div>
      <div className={styles.test}>
        <div className={styles.wrapper}>
          <Header
            totalShownPrice={basket.total.toFixed(2)}
            searchInput={searchInput}
            onSearchChange={handleSearchChange}
          ></Header>
          <div className="d-flex flex-wrap mt-2">
            <div>
              <SortComponent
                sortOption={sortOption}
                onSortChange={handleSortChange}
                sortOptions={SortOptions}
              ></SortComponent>
            </div>
            <div>
              <BrandSearch
                brands={brands}
                selectedBrands={selectedBrands}
                onBrandSelect={handleBrandSelect}
              ></BrandSearch>
            </div>
            <div>
              <ModelSearch
                models={models}
                selectedModels={selectedModels}
                onModelSelect={handleModelSelect}
              ></ModelSearch>
            </div>
            <div className="mt-3">
              <h5>Total Price: {basket.total.toFixed(2)}₺</h5>
              <button className="btn btn-primary">Checkout</button>
            </div>
          </div>

          <div className={styles.startupPageContainer}>
            {sortedProducts.map((product) => {
              return (
                <ProductCard
                  onAddToBasket={() => handleAddToBasket(product)}
                  key={product.id}
                  product={product}
                />
              );
            })}
            {!searchInput &&
              (pagecount > 0 ? (
                <nav className="mt-3">
                  <Pagination
                    currentPage={page}
                    totalPages={pagecount}
                    currentPath="/"
                    currentQuery={{}}
                  />
                </nav>
              ) : (
                <div>No Product</div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const page = parseInt(context.query.page) || 1;
  const limit = 12;
  const startIndex = (page - 1) * limit;
  const results = await fetch(
    `https://5fc9346b2af77700165ae514.mockapi.io/products?page=${page}&limit=${limit}`
  )
    .then((response) => response.json())
    .catch(() => ({ data: [] }));

  const totalCount = await fetch(
    `https://5fc9346b2af77700165ae514.mockapi.io/products`
  )
    .then((response) => response.json())
    .then((data) => data.length)
    .catch(() => 0);
  const pageCount = Math.ceil(totalCount / limit);
  const brands = [...new Set(results.map((product) => product.brand))].sort();
  const models = [...new Set(results.map((product) => product.model))].sort();
  console.log(results[0], "sasas");
  return {
    props: {
      products: results,
      page: page,
      pagecount: pageCount,
      brands: brands,
      models: models,
    },
  };
}

export default InvHome;
