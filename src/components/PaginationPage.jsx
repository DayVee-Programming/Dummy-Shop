import { useDispatch } from "react-redux";
import { goCertainPage } from "../store/products/productsSlice";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const PaginationPage = ({ page, routeNavigate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPage = sessionStorage.getItem("currentPage");
  const productsPaginationPagesItem = clsx("products__pagination-pages-item", {
    active: page == currentPage,
  });

  const handleClick = () => {
    dispatch(goCertainPage({ page: page }));
    navigate(`/${routeNavigate}/${page}`);
    location.reload();
  };

  return (
    <li className={productsPaginationPagesItem} onClick={() => handleClick()}>
      <a className="products__pagination-pages-item-link">{page}</a>
    </li>
  );
};

export default PaginationPage;
