import Select from "react-select";

function MerchantFilter({
  merchants,
  selectMerchant = 0,
  handleSelectMerchant,
}) {
  const sortedMerchants = merchants.sort();
  let merchantOptions = sortedMerchants.map((merchantInfo) => {
    return { value: merchantInfo.name, label: merchantInfo.name };
  });
  merchantOptions.unshift({ value: 0, label: "View All Merchants" });

  return (
    <Select
      value={selectMerchant}
      onChange={handleSelectMerchant}
      instanceId="merchant-selection"
      placeholder="Select by Merchant"
      isSearchable
      options={merchantOptions}
    ></Select>
  );
}

export default MerchantFilter;
