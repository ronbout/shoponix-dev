import ProductTable from "./tables/ProductTable";
import { useState, useEffect } from "react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { Segment, Container } from "semantic-ui-react";
import { parseCookies } from "nookies";
import baseUrl from "../../utils/baseUrl";
import AdminSidebar from "../../components/_App/AdminSidebar";

const AdminProductsList = ({ user, products, categories, merchants }) => {
  const productData = products.map((productInfo) => {
    productInfo.totalSales = 0;
    let categories = productInfo.productCategories
      .map((catInfo) => catInfo.category.name)
      .sort();
    console.log(categories);
    productInfo.categories = categories;

    let tags = productInfo.productTags
      .map((tagInfo) => tagInfo.tag.name)
      .sort();
    productInfo.tags = tags;

    productInfo.merchant = productInfo.store.name;
    return productInfo;
  });

  return (
    <AdminSidebar user={user}>
      <Container className="product-admin-listing-container">
        <ProductTable
          productData={productData}
          categories={categories}
          merchants={merchants}
        />
      </Container>
    </AdminSidebar>
  );
};

AdminProductsList.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
  /***
   *
   *  TODO:  	if not admin redirect somewhere
   *
   */
  // // fetch data on server
  const productUrl = `${baseUrl}/api/products`;
  const productResponse = await axios.get(productUrl);
  const categoriesUrl = `${baseUrl}/api/category`;
  const categoriesResponse = await axios.get(categoriesUrl);
  const merchantsUrl = `${baseUrl}/api/merchant`;
  const merchantsResponse = await axios.get(merchantsUrl);
  // console.log("response: ", response.data);
  // return response data as an object
  return {
    ...productResponse.data,
    ...categoriesResponse.data,
    ...merchantsResponse.data,
  };
  // note: this object will be merge with existing props
};

export default AdminProductsList;
