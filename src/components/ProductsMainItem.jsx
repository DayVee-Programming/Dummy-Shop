import { Link } from "react-router-dom";
import { images } from "../utils/images";

const ProductsMainItem = ({ item }) => {
  return (
    <li className="products__main-item">
      <Link to={`/more/${item.id}`} className="products__main-item-link">
        <img
          src={item.thumbnail}
          alt=""
          className="products__main-item-link-img"
        />
        <h2 className="products__main-item-link-title">{item.title}</h2>
        <div className="products__main-item-link-rating">
          <img
            src={images.star}
            alt=""
            className="products__main-item-link-rating-img"
          />
          <p className="products__main-item-link-rating-text">
            {item.ratingAvg}
          </p>
        </div>
        <div className="products__main-item-link-info">
          <div className="products__main-item-link-info-prices">
            <span className="products__main-item-link-info-prices-dprice">
              {item.priceWithDiscount}$
            </span>
            <span className="products__main-item-link-info-prices-price">
              {item.price}$
            </span>
          </div>
          <span className="products__main-item-link-info-stock">
            {item.stock} items
          </span>
        </div>
      </Link>
    </li>
  );
};

export default ProductsMainItem;
