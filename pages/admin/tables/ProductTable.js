import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import currency from "../../../utils/currency";
import Link from "next/link";
import CategoryFilter from "./categoryFilter";
import MerchantFilter from "./MerchantFilter";
// import CategoryFilter from "../CategoryFilter";

function ProductTable({ productData, categories, merchants }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState({
    value: 0,
    label: "View All Categories",
  });
  const [selectedMerchantId, setSelectedMerchantId] = useState({
    value: 0,
    label: "View All Merchants",
  });
  const data = useMemo(() => {
    let prodData =
      0 !== selectedCategoryId.value
        ? productData.filter((prodInfo) =>
            prodInfo.categories.includes(selectedCategoryId.value)
          )
        : productData;

    prodData =
      0 !== selectedMerchantId.value
        ? prodData.filter(
            (prodInfo) => prodInfo.store.name === selectedMerchantId.value
          )
        : prodData;

    return prodData;
  }, [productData, selectedCategoryId, selectedMerchantId]);

  // const data = useMemo(() => productData, [productData]);

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "name",
        enableSorting: true,
      },
      {
        Header: "Merchant",
        accessor: "merchant",
        enableSorting: true,
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ value }) => (
          <span title={value}>{value.substring(0, 40) + "..."}</span>
        ),
        disableSortBy: true,
      },
      {
        Header: "SKU",
        accessor: "sku",
        enableSorting: true,
      },
      {
        Header: "Stock",
        accessor: "inStock",
        Cell: ({ value }) => <span>{value ? "In Stock" : "Out of Stock"}</span>,
        enableSorting: true,
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => <span>{currency(value)}</span>,
        enableSorting: true,
      },
      {
        Header: "Total Sales",
        accessor: "totalSales",
        Cell: ({ value }) => <span>{currency(value)}</span>,
        enableSorting: true,
      },
      {
        Header: "Categories",
        accessor: "categories",
        Cell: ({ value: cats }) => {
          const catsDisplay = cats.map((cat) => (
            <div key={cat} style={{ margin: 0, padding: "4px" }}>
              {cat}
            </div>
          ));
          return catsDisplay;
        },
        enableSorting: true,
      },
      {
        Header: "Tags",
        accessor: "tags",
        Cell: ({ value: tags }) => {
          const tagsDisplay = tags.map((tag) => (
            <div key={tag} style={{ margin: 0, padding: "4px" }}>
              {tag}
            </div>
          ));
          return tagsDisplay;
        },
        enableSorting: true,
      },
    ],
    []
  );

  const tableInstance = useTable({ data, columns }, useGlobalFilter, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  const handleSelectCat = (cat) => {
    setSelectedCategoryId(cat);
  };
  const handleSelectMerchant = (merchant) => {
    setSelectedMerchantId(merchant);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-3">
          <label htmlFor="category-select">Categories:</label>
          <CategoryFilter
            categories={categories}
            selectCat={selectedCategoryId}
            handleSelectCat={handleSelectCat}
          />
        </div>
        <div className="col-sm-3">
          <label htmlFor="merchant-select">Merchants:</label>
          <MerchantFilter
            merchants={merchants}
            selectMerchant={selectedMerchantId}
            handleSelectMerchant={handleSelectMerchant}
          />
        </div>
        <div className="col-sm-1">&nbsp;</div>
        <div className="col-sm-5 row">
          <div className="col-sm-8">
            <input
              id="product-table-search-input"
              type="text"
              placeholder="Search"
              className="form-control"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          <div className="col-sm-1">&nbsp;</div>
          <div className="col-sm-3">
            <Link href="/admin/add-new-product">
              <button type="button" className="btn btn-primary">
                Add Product
              </button>
            </Link>
          </div>
        </div>
      </div>
      <table
        className="table table-striped table-success mt-4"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      className={
                        column.canSort && !column.isSorted
                          ? "col-sortable-hover"
                          : ""
                      }
                      scope="col"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            " 🔽"
                          ) : (
                            " 🔼"
                          )
                        ) : (
                          <span className="hover-sort-indicator">
                            {column.sortDescFirst ? " 🔽" : " 🔼"}
                          </span>
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ProductTable;
