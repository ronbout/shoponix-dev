import AdminSidebar from "../../components/_App/AdminSidebar";
import MonthlyRevenue from "../../components/Dashboard/Charts/MonthlyRevenue";
import ProductTrendsByMonth from "../../components/Dashboard/Charts/ProductTrendsByMonth";

const Dashboard = ({user}) => {
    // console.log(user)
    return(
        <>
            <AdminSidebar user={user}>
                <div className="create-new-products-area">
                    <MonthlyRevenue />
                    <ProductTrendsByMonth />
                </div>
            </AdminSidebar>
        </>
    );
}

export default Dashboard;