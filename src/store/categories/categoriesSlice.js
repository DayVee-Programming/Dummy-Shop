import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: null,
  data: null,
  total: 0,
  pages: [],
  pagesLoaded: false,
  productsReady: false,
  categoriesLoading: false,
  categoriesError: false,
  productsLoading: false,
  productsError: false,
  totalLoading: false,
  totalError: false,
};

export const getCategories = createAsyncThunk(
  "categoriesSlice/getCategories",
  async () => {
    const { data } = await axios.get(
      "https://dummyjson.com/products/categories"
    );
    return data;
  }
);

export const getProducts = createAsyncThunk(
  "categoriesSlice/getProducts",
  async (category, thunkAPI) => {
    const state = thunkAPI.getState();
    const pagesLength = state.categories.pages.length;
    let currentPage = +sessionStorage.getItem("currentPage");
    const addPriceWithDiscount = (data) => {
      data.products.map((product) => {
        product.priceWithDiscount = (
          product.price -
          (product.price * product.discountPercentage) / 100
        ).toFixed(2);
      });
      return data.products;
    };
    if (currentPage > pagesLength) {
      currentPage = 1;
      sessionStorage.setItem("currentPage", JSON.stringify(currentPage));
      history.pushState({}, "", "/categories/1");
    }
    const { data } = await axios.get(
      `https://dummyjson.com/products/category/${category}/?limit=12&skip=${
        (currentPage - 1) * 12
      }`
    );
    return addPriceWithDiscount(data);
  }
);

export const getTotalProducts = createAsyncThunk(
  "categoriesSlice/getTotalProducts",
  async (category) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    return data.total;
  }
);

export const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {
    addAvgRatings: (state, action) => {
      const ratingAvgProd = [...action.payload].map((prod) => {
        let total = prod.reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        let average = (total / prod.reviews.length).toFixed(1);
        return {
          ...prod,
          ratingAvg: average,
        };
      });
      state.data = ratingAvgProd;
      state.productsReady = true;
    },
    fillPages: (state) => {
      const res = [];
      for (let i = 1; i <= Math.ceil(state.total / 12); i++) {
        res.push(i);
      }
      state.pages = res;
      state.pagesLoaded = true;
    },
    goCertainPage: (state, action) => {
      sessionStorage.setItem("currentPage", action.payload);
    },
    changeCategory: (state, action) => {
      let category = sessionStorage.getItem("category");
      category = action.payload;
      sessionStorage.setItem("category", JSON.stringify(category));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.categoriesLoading = false;
        state.categoriesError = true;
      })
      .addCase(getProducts.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.productsError = false;
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.productsLoading = false;
        state.productsError = true;
      })
      .addCase(getTotalProducts.pending, (state) => {
        state.totalLoading = true;
      })
      .addCase(getTotalProducts.fulfilled, (state, action) => {
        state.totalLoading = false;
        state.productsError = false;
        state.total = action.payload;
      })
      .addCase(getTotalProducts.rejected, (state) => {
        state.totalLoading = false;
        state.productsError = true;
      });
  },
});

export default categoriesSlice.reducer;

export const { addAvgRatings, fillPages, goCertainPage, changeCategory } =
  categoriesSlice.actions;
