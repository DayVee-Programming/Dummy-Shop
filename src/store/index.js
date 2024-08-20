import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "./navbar/navbarSlice";
import productsSlice from "./products/productsSlice";
import categoriesSlice from "./categories/categoriesSlice";

export const store = configureStore({
  reducer: {
    navbar: navbarSlice,
    products: productsSlice,
    categories: categoriesSlice,
  },
});
