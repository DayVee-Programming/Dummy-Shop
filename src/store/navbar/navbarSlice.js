import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
  links: [
    {
      id: v4(),
      text: "Categories",
      to: "/categories",
    },
    {
      id: v4(),
      text: "Sale",
      to: "/discount",
    },
    {
      id: v4(),
      text: "Contact",
      to: "/contact",
    },
    {
      id: v4(),
      text: "About us",
      to: "/about",
    },
  ],
};

export const navbarSlice = createSlice({
  name: "navbarSlice",
  initialState,
  reducers: {},
});

export default navbarSlice.reducer;

export const navbarSelector = (state) => state.navbar;
