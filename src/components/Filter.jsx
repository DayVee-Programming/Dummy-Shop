import { useDispatch, useSelector } from "react-redux";
import { images } from "../utils/images";

import {
  sortProductsAsc,
  sortProductsDesc,
  sortProductsName,
  sortProductsRating,
  sortProductsStock,
} from "../store/products/productsSlice";
import { useEffect, useState } from "react";
import FilterOptionItem from "./FilterOptionItem";

const Filter = () => {
  const { total, data } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const selectOptions = [
    {
      id: 1,
      title: "Alphabetical",
      value: "name",
    },
    {
      id: 2,
      title: "Cheap",
      value: "cheap",
    },
    {
      id: 3,
      title: "Expensive",
      value: "expensive",
    },
    {
      id: 4,
      title: "Amount",
      value: "stock",
    },
    {
      id: 5,
      title: "Rating",
      value: "rating",
    },
  ];
  const [selected, setSelected] = useState("name");

  const sortProducts = () => {
    selected === "name"
      ? dispatch(sortProductsName(data))
      : selected === "cheap"
      ? dispatch(sortProductsAsc(data))
      : selected === "expensive"
      ? dispatch(sortProductsDesc(data))
      : selected === "stock"
      ? dispatch(sortProductsStock(data))
      : selected === "rating"
      ? dispatch(sortProductsRating(data))
      : "";
  };
  const filterProducts = (e) => {
    e.preventDefault();
    sortProducts();
  };
  useEffect(() => {
    sortProducts();
  }, []);

  return (
    <div className="filter">
      <div className="filter__wrap">
        <form className="filter__form" onSubmit={(e) => filterProducts(e)}>
          <select
            name="prices"
            className="filter__form-select"
            onChange={(e) => setSelected(e.target.value)}
          >
            {selectOptions.map((option) => (
              <FilterOptionItem option={option} key={option.id} />
            ))}
          </select>
          <img className="filter__form-img" src={images.arrowDown} />
          <button type="submit" className="filter__form-btn">
            Apply
          </button>
        </form>
        <div className="filter__info">
          <span className="filter__info-text">Total amount of products - </span>
          <span className="filter__info-total">{total}</span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
