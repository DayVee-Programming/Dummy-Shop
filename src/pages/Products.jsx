import { useDispatch, useSelector } from "react-redux";
import ProductsMainItem from "../components/ProductsMainItem";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import { useEffect } from "react";
import {
  addAvgRatings,
  fillPages,
  filterHotProducts,
  getProducts,
  getTotalProducts,
} from "../store/products/productsSlice";
import clsx from "clsx";

const Products = ({ type }) => {
  const {
    data,
    hotProducts,
    pages,
    pagesLoaded,
    hotProductsDiscount,
    productsLoading,
    productsError,
    productsReady,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.products);
  const productsS = clsx("products", {
    discount: type === "discount",
  });

  useEffect(() => {
    dispatch(getTotalProducts()).then((res) => {
      dispatch(filterHotProducts(res.payload));
    });
  }, []);
  useEffect(() => {
    dispatch(fillPages({ type: type, data: hotProducts }));
  }, [hotProducts]);
  useEffect(() => {
    dispatch(getProducts()).then((res) => {
      dispatch(addAvgRatings(res.payload));
    });
  }, [currentPage]);

  return (
    <>
      <Navbar />
      <div id="products" className={productsS}>
        <div className="container products__wrap">
          {type === "home" && pagesLoaded && productsReady && data && (
            <Filter />
          )}
          {type === "discount" && pagesLoaded && productsReady && (
            <div className="products__hot">
              The following products have a discount of at least
              <span> {hotProductsDiscount}%</span>
            </div>
          )}
          {productsLoading && <h1 className="products__loading">Loading...</h1>}
          {productsError && (
            <h1 className="products__error">Error loading data</h1>
          )}
          {type === "home" && (
            <ul className="products__main">
              {data?.map((item) => (
                <ProductsMainItem item={item} key={item.id} />
              ))}
            </ul>
          )}
          {type === "discount" && (
            <ul className="products__main">
              {hotProducts?.map((item) => (
                <ProductsMainItem item={item} key={item.id} />
              ))}
            </ul>
          )}
          {pagesLoaded && productsReady && type === "home" && (
            <Pagination pages={pages} routeNavigate="page" />
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
