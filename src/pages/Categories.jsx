import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  addAvgRatings,
  fillPages,
  getCategories,
  getProducts,
  getTotalProducts,
} from "../store/categories/categoriesSlice";
import CategoriesFilterItem from "../components/CategoriesFilterItem";
import ProductsMainItem from "../components/ProductsMainItem";
import Pagination from "../components/Pagination";

const Categories = () => {
  const {
    categories,
    data,
    pages,
    pagesLoaded,
    categoriesError,
    categoriesLoading,
    productsError,
    productsLoading,
    productsReady,
  } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  let category = sessionStorage.getItem("category");
  if (category) {
    try {
      category = JSON.parse(category);
    } catch (error) {
      category = "beauty";
    }
  } else {
    category = "beauty";
  }

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTotalProducts(category)).then(() => {
      dispatch(fillPages());
      dispatch(getProducts(category)).then((res) => {
        const data = res.payload;
        dispatch(addAvgRatings(data));
      });
    });
  }, []);

  return (
    <>
      <Navbar />
      <div id="categories" className="categories">
        <div className="container categories__wrap">
          <aside className="categories__aside">
            <h1 className="categories__aside-title">Categories</h1>
            {categoriesLoading && (
              <h1 className="categories__loading">Loading...</h1>
            )}
            {categoriesError && (
              <h1 className="categories__error">Error loading data</h1>
            )}
            <ul className="categories__aside-filter">
              {categories?.map((category, index) => (
                <CategoriesFilterItem category={category} key={index} />
              ))}
            </ul>
          </aside>
          <div className="categories__content">
            {productsLoading && (
              <h2 className="categories__loading2">Loading...</h2>
            )}
            {productsError && (
              <h2 className="categories__error2">Error loading data</h2>
            )}
            {data && data.length === 0 && (
              <h2 className="categories__none2">
                There are no products in this category yet
              </h2>
            )}
            <ul className="categories__main">
              {data?.map((product) => (
                <ProductsMainItem item={product} key={product.id} />
              ))}
            </ul>
            {pagesLoaded && productsReady && (
              <Pagination
                pages={pages}
                routeNavigate={`categories/${category}`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
