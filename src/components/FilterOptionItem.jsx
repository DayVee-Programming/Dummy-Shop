const FilterOptionItem = ({ option }) => {
  return (
    <option
      key={option.id}
      value={option.value}
      className="filter__form-select-option"
    >
      {option.title}
    </option>
  );
};

export default FilterOptionItem;
