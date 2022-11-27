import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import Banner from "../components/Electronics/Banner"
import CategoryBanner from "../components/Electronics/CategoryBanner"
import HotProducts from "../components/Electronics/HotProducts"

const Electronics = ({products}) => {
    return(
        <>
            <Banner />

            <CategoryBanner />
            
            <HotProducts products={products} />
        </>
    );
}

Electronics.getInitialProps = async (ctx) => {
    // console.log(ctx.query)
    const page = ctx.query.page ? ctx.query.page : "1";
    const size = 8;
    const searchTerm = "electronics";
    // fetch data on server
    const url = `${baseUrl}/api/products`;
    const payload = { params: {page, size, searchTerm}}
    const response = await axios.get(url, payload);
    // return response data as an object
    return response.data
    // note: this object will be merge with existing props
}

export default Electronics;