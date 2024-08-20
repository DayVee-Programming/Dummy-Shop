import { useDispatch } from "react-redux";
import { changeCategory } from "../store/categories/categoriesSlice";
import { useNavigate } from "react-router-dom";

const CategoriesFilterItem = ({ category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    const categoryName = category.name.toLowerCase();
    dispatch(changeCategory(categoryName));
    navigate(`/categories/${categoryName}/1`);
    location.reload();
  };

  return (
    <li onClick={() => handleClick()} className="categories__aside-filter-item">
      {category.name}
    </li>
  );
};

export default CategoriesFilterItem;
