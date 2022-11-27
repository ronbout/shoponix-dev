import React from 'react';
import axios from 'axios';
import Banner from '../components/Fashion/Banner';
import CategoryBanner from '../components/Fashion/CategoryBanner';
import OfferArea from '../components/Fashion/OfferArea';
import HotProducts from '../components/Fashion/HotProducts';
import baseUrl from '../utils/baseUrl';

const Home = ({ products }) => {
    // console.log(products)
    return(
        <>
            <Banner />

            <CategoryBanner />

            <HotProducts products={products} />
            
            <OfferArea />
        </>
    );
}

Home.getInitialProps = async (ctx) => {
    // console.log(ctx.query)
    const page = ctx.query.page ? ctx.query.page : "1";
    const size = 8;
    const searchTerm = "fashion";
    // fetch data on server
    const url = `${baseUrl}/api/products`;
    const payload = { params: {page, size, searchTerm}}
    const response = await axios.get(url, payload);
    // return response data as an object
    return response.data
    // note: this object will be merge with existing props
}

export default Home;
