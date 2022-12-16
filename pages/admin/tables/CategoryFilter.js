import Select from "react-select";

function CategoryFilter({ categories, selectCat = 0, handleSelectCat }) {
  const sortedCats = categories.sort();
  let catOptions = sortedCats.map((catInfo) => {
    return { value: catInfo.name, label: catInfo.name };
  });
  catOptions.unshift({ value: 0, label: "View All Categories" });

  return (
    <Select
      value={selectCat}
      onChange={handleSelectCat}
      instanceId="category-selection"
      placeholder="Select by Category"
      isSearchable
      options={catOptions}
    ></Select>
  );
}

export default CategoryFilter;
