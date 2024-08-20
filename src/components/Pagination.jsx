import { useDispatch } from "react-redux";
import { goCertainPage } from "../store/products/productsSlice";
import PaginationPage from "./PaginationPage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { images } from "../utils/images";

const Pagination = ({ pages, routeNavigate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let currentPage = +sessionStorage.getItem("currentPage");

  const handleClick = (type) => {
    type === "prev"
      ? dispatch(goCertainPage({ page: --currentPage }))
      : dispatch(goCertainPage({ page: ++currentPage }));
    navigate(`/${routeNavigate}/${currentPage}`);
    location.reload();
  };

  return (
    <div className="products__pagination">
      {currentPage > 1 && (
        <button
          onClick={() => handleClick("prev")}
          className="products__pagination-btn"
        >
          <img
            src={images.arrowLeft}
            alt=""
            className="products__pagination-btn-img back"
          />
          Previous
        </button>
      )}
      <ul className="products__pagination-pages">
        {pages?.map((page) => (
          <PaginationPage
            page={page}
            routeNavigate={routeNavigate}
            key={v4()}
          />
        ))}
      </ul>
      {currentPage < pages?.length && (
        <button
          onClick={() => handleClick("next")}
          className="products__pagination-btn"
        >
          Next
          <img
            src={images.arrowRight}
            alt=""
            className="products__pagination-btn-img forward"
          />
        </button>
      )}
    </div>
  );
};

export default Pagination;
