import axios from 'axios';
import Banner from "../components/Covid19/Banner";
import baseUrl from '../utils/baseUrl';
import CategoryBanner from '../components/Covid19/CategoryBanner';
import HotProducts from '../components/Covid19/HotProducts';

const Covid19 = ({products}) => {
    // console.log(products)
    return(
        <>
            <Banner />

            <CategoryBanner />
            
            <HotProducts products={products} />
        </>
    );
}

Covid19.getInitialProps = async (ctx) => {
    // console.log(ctx.query)
    const page = ctx.query.page ? ctx.query.page : "1";
    const size = 8;
    const searchTerm = "medical";
    // fetch data on server
    const url = `${baseUrl}/api/products`;
    const payload = { params: {page, size, searchTerm}}
    const response = await axios.get(url, payload);
    // return response data as an object
    return response.data
    // note: this object will be merge with existing props
}

export default Covid19;