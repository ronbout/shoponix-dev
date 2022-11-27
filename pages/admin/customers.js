import axios from 'axios';
import AllCustomers from "../../components/Customers/AllCustomers";
import CustomerPagination from '../../components/Customers/CustomerPagination';
import AdminSidebar from '../../components/_App/AdminSidebar';
import baseUrl from '../../utils/baseUrl';

const Customers = ({ customers, totalPages, user }) => {
    // console.log(totalPages)
    return (
        <>
            <AdminSidebar user={user}>
                <div className="create-new-products-area">

                    <AllCustomers customers={customers} />

                    <CustomerPagination totalPages={totalPages} />
                    
                </div>
            </AdminSidebar>
        </>
    );
}

Customers.getInitialProps = async (ctx) => {
    const page = ctx.query.page ? ctx.query.page : "1";
    const size = 20;
    const url = `${baseUrl}/api/customers`;
    const payload = { params: { page, size } }
    const response = await axios.get(url, payload);

    return response.data
}

export default Customers;