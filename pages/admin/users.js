import UsersWithPermissions from "../../components/Users/UsersWithPermissions";
import AdminSidebar from '../../components/_App/AdminSidebar';

const Users = ({ user }) => {
    return (
        <>
            <AdminSidebar user={user}>
                <div className="create-new-products-area">
                    <UsersWithPermissions 
                        currentUserId={user} 
                    />
                </div>
            </AdminSidebar>
        </>
    );
}
  
export default Users;