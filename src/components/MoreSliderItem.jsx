const MoreSliderItem = ({ image }) => {
  return (
    <li className="more__slider-item">
      <img src={image} alt="" className="more__slider-item-img" />
    </li>
  );
};

export default MoreSliderItem;
