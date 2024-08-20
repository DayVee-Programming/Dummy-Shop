import { useDispatch, useSelector } from "react-redux";
import { navbarSelector } from "../store/navbar/navbarSlice";
import NavbarLinksItem from "./NavbarLinksItem";
import { goCertainPage } from "../store/products/productsSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { images } from "../utils/images";

const Navbar = () => {
  const { links } = useSelector(navbarSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);

  const handleClick = () => {
    dispatch(goCertainPage({ page: 1 }));
    navigate("/");
    location.reload();
  };
  useEffect(() => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
    setCartTotal(cart?.length);
  }, [cart?.length]);

  return (
    <header id="navbar" className="navbar">
      <nav className="container navbar__wrap">
        <a onClick={() => handleClick()} className="navbar__logo">
          <img src={images.logo} alt="" className="navbar__logo-img" />
        </a>
        <ul className="navbar__links">
          {links.map((link) => (
            <NavbarLinksItem link={link} key={link.id} />
          ))}
        </ul>
        <Link to="/cart" className="navbar__cart">
          <img src={images.cart} alt="" className="navbar__cart-img" />
          {cartTotal && <span className="navbar__cart-total">{cartTotal}</span>}
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
