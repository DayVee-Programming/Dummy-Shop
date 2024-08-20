import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MoreSliderItem from "../components/MoreSliderItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images } from "../utils/images";

const More = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getProduct = async () => {
    const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
    data.priceWithDiscount = (
      data.price -
      (data.price * data.discountPercentage) / 100
    ).toFixed(2);
    let total = data.reviews.reduce((sum, review) => sum + review.rating, 0);
    let average = (total / data.reviews.length).toFixed(1);
    data.ratingAvg = average;
    setProduct(data);
  };
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.every((prod) => prod.id !== product.id)) {
      cart = [...cart, product];
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    location.reload();
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Navbar />
      {product && (
        <div id="more" className="more">
          <div className="container more__wrap">
            {product.images.length > 1 ? (
              <Slider {...sliderSettings} className="container more__slider">
                {product.images.map((image, i) => (
                  <MoreSliderItem image={image} key={i} />
                ))}
              </Slider>
            ) : (
              <img src={product.images[0]} alt="" className="more__img" />
            )}
            <div className="more__info">
              <h2 className="more__info-title">{product.title}</h2>
              <p className="more__info-desc">{product.description}</p>
              <div className="more__info-prices">
                <span className="more__info-prices-dprice">
                  Discount price: <b>{product.priceWithDiscount}$</b>
                </span>
                <span className="more__info-prices-discount">
                  Discount: {product.discountPercentage}%
                </span>
                <span className="more__info-prices-price">
                  Price: {product.price}$
                </span>
              </div>
              <div className="more__info-rating">
                <img src={images.star} alt="" className="more__info-rating-img" />
                <p className="more__info-rating-text">{product.ratingAvg}</p>
              </div>
              <span className="more__info-prices-stock">
                In stock: {product.stock}
              </span>
              <button
                className="more__info-btn"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default More;
