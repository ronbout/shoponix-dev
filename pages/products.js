import React from 'react';
import axios from 'axios';
import ProductList from '../components/Products/ProductList';
import baseUrl from '../utils/baseUrl';

const Products = ({ products, totalPages }) => {
    return(
        <>
            <ProductList 
                totalPages={totalPages} 
                products={products} 
            />
        </>
    );
}

Products.getInitialProps = async (ctx) => {
    // console.log(ctx.query)
    const page = ctx.query.page ? ctx.query.page : "1";
    const size = 12;
    const searchTerm = ctx.query.term
    // fetch data on server
    const url = `${baseUrl}/api/products`;
    const payload = { params: {page, size, searchTerm}}
    const response = await axios.get(url, payload);
    // return response data as an object
    return response.data
    // note: this object will be merge with existing props
}

export default Products;
