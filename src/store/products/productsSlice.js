import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  total: 0,
  totalProducts: null,
  pages: [],
  hotProducts: null,
  hotProductsDiscount: 18,
  hotProductsPages: [],
  pagesLoaded: false,
  productsReady: false,
  productsLoading: false,
  productsError: false,
  totalLoading: false,
  totalError: false,
};

export const getProducts = createAsyncThunk(
  "productsSlice/getProducts",
  async () => {
    const currentPage = sessionStorage.getItem("currentPage");
    const addPriceWithDiscount = (data) => {
      data.products.map((product) => {
        product.priceWithDiscount = (
          product.price -
          (product.price * product.discountPercentage) / 100
        ).toFixed(2);
      });
      return data.products;
    };
    const { data } = await axios.get(
      `https://dummyjson.com/products/?limit=12&skip=${(currentPage - 1) * 12}`
    );
    return addPriceWithDiscount(data);
  }
);

export const getTotalProducts = createAsyncThunk(
  "productsSlice/getTotalProducts",
  async () => {
    const { data } = await axios.get("https://dummyjson.com/products?limit=0");
    return data.products;
  }
);

export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    fillPages: (state, action) => {
      if (action.payload.type === "home") {
        const res = [];
        for (let i = 1; i <= Math.ceil(state.total / 12); i++) {
          res.push(i);
        }
        state.pages = res;
      } else if (action.payload.type === "discount") {
        const res = [];
        for (let i = 1; i <= Math.ceil(state.total / 12); i++) {
          res.push(i);
        }
        state.hotProductsPages = res;
      }
      state.pagesLoaded = true;
    },
    goCertainPage: (state, action) => {
      sessionStorage.setItem("currentPage", action.payload.page);
    },
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
    sortProductsName: (state, action) => {
      const sortedProd = [...action.payload].sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      );
      state.data = sortedProd;
    },
    sortProductsAsc: (state, action) => {
      const sortedProd = [...action.payload].sort((a, b) =>
        a.price > b.price ? 1 : -1
      );
      state.data = sortedProd;
    },
    sortProductsDesc: (state, action) => {
      const sortedProd = [...action.payload].sort((a, b) =>
        b.price > a.price ? 1 : -1
      );
      state.data = sortedProd;
    },
    sortProductsStock: (state, action) => {
      const sortedProd = [...action.payload].sort((a, b) =>
        b.stock > a.stock ? 1 : -1
      );
      state.data = sortedProd;
    },
    sortProductsRating: (state, action) => {
      const sortedProd = [...action.payload].sort(
        (a, b) => b.ratingAvg - a.ratingAvg
      );
      state.data = sortedProd;
    },
    filterHotProducts: (state, action) => {
      const sortedProd = [...action.payload].filter(
        (prod) => prod.discountPercentage > state.hotProductsDiscount
      );
      state.hotProducts = sortedProd.map((product) => {
        const newProduct = { ...product };
        let total = newProduct.reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        let average = (total / newProduct.reviews.length).toFixed(1);
        newProduct.priceWithDiscount = +(
          newProduct.price -
          (newProduct.price * newProduct.discountPercentage) / 100
        ).toFixed(2);
        newProduct.ratingAvg = average;
        return newProduct;
      });
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.totalError = false;
        state.totalProducts = action.payload;
        state.total = action.payload.length;
      })
      .addCase(getTotalProducts.rejected, (state) => {
        state.totalLoading = false;
        state.totalError = true;
      });
  },
});

export default productsSlice.reducer;

export const {
  fillPages,
  goCertainPage,
  addAvgRatings,
  sortProductsName,
  sortProductsAsc,
  sortProductsDesc,
  sortProductsStock,
  sortProductsRating,
  filterHotProducts,
} = productsSlice.actions;
