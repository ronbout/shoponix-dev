import axios from 'axios';
import Banner from "../components/Jewelry/Banner";
import CategoryBanner from "../components/Jewelry/CategoryBanner";
import HotProducts from "../components/Jewelry/HotProducts";
import baseUrl from '../utils/baseUrl';

const Jewelry = ({products}) => {
    return(
        <>
            <Banner />

            <CategoryBanner />

            <HotProducts 
                products={products} 
            />
        </>
    );
}

Jewelry.getInitialProps = async (ctx) => {
    // console.log(ctx.query)
    const page = ctx.query.page ? ctx.query.page : "1";
    const size = 8;
    const searchTerm = "jewelry";
    // fetch data on server
    const url = `${baseUrl}/api/products`;
    const payload = { params: {page, size, searchTerm}}
    const response = await axios.get(url, payload);
    // return response data as an object
    return response.data
    // note: this object will be merge with existing props
}

export default Jewelry;