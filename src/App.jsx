import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import More from "./pages/More";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Products type="home" />} />
        <Route path="/page/:page" element={<Products type="home" />} />
        <Route path="/more/:id" element={<More />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category/:page" element={<Categories />} />
        <Route path="/discount" element={<Products type="discount" />} />
        <Route path="*" element={<Products type="home" />} />
      </Routes>
    </>
  );
};

export default App;
