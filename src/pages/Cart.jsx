import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";
import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);

  const calcTotal = () => {
    setTotal(
      cart?.reduce((sum, prod) => {
        return sum + +prod.priceWithDiscount;
      }, 0)
    );
  };
  const buyProducts = () => {
    setCart((cart.length = 0));
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  };
  useEffect(() => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
    calcTotal();
  }, [cart?.length]);

  return (
    <>
      <Navbar />
      <div id="cart" className="cart">
        <div className="container cart__wrap">
          {cart?.length ? (
            <>
              <ul className="cart__products">
                {cart.map((product) => (
                  <CartItem key={Math.random()} product={product} />
                ))}
              </ul>
              <div className="cart__info">
                <span className="cart__info-total">
                  Total cost: {total?.toFixed(2)}$
                </span>
                <button
                  onClick={() => buyProducts()}
                  className="cart__info-btn"
                >
                  Buy
                </button>
              </div>
            </>
          ) : (
            <p className="cart__text">There are no items in the cart yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
