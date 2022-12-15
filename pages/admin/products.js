import ProductTable from "./tables/ProductTable";
import { useState, useEffect } from "react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "../../utils/baseUrl";

const AdminProductsList = ({ products }) => {
  const productData = products;
  return (
    <div className="container">
      <ProductTable productData={productData} />
    </div>
  );
};

AdminProductsList.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
  /***
   *
   *  TODO:  	if no club id redirect somewhere
   *
   */
  // // fetch data on server
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url);
  // console.log("response: ", response.data);
  // return response data as an object
  return response.data;
  // note: this object will be merge with existing props
};

export default AdminProductsList;
