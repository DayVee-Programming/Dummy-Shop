import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartItem = ({ product }) => {
  const [cart, setCart] = useState(null);

  const removeItem = () => {
    const prodIndex = cart.findIndex((prod) => prod.id === product.id);
    setCart(cart.splice(prodIndex, 1));
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  };
  useEffect(() => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  }, []);

  return (
    <li className="cart__products-item">
      <Link to={`/more/${product.id}`} className="cart__products-item-desc">
        <img
          src={product.thumbnail}
          alt=""
          className="cart__products-item-desc-img"
        />
        <h2 className="cart__products-item-desc-title">{product.title}</h2>
      </Link>
      <div className="cart__products-item-info">
        <button
          onClick={() => removeItem()}
          className="cart__products-item-info-btn"
        >
          Remove
        </button>
        <p className="cart__products-item-info-price">
          {product.priceWithDiscount}$
        </p>
      </div>
    </li>
  );
};

export default CartItem;
