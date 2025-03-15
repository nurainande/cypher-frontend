import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/ContextProvider";

const AdminPanelPage = () => {
  // const { user } = useAppContext();
  // const navigate = useNavigate()
  // if (!user ||!user.isAdmin) {
  //   return <div className="mt-20">You do not have permission to access this page.</div>;
  //   // navigate("/")
  //   // return null;
  // }
  return (
    <div className="flex h-auto py-20 overflow-scroll">
      {/* Aside Navigation */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/admin/users" className="hover:bg-gray-700 p-2 rounded ">
            Manage Users
          </Link>
          <Link to="/admin/products" className="hover:bg-gray-700 p-2 rounded">
            Manage Products
          </Link>
          <Link to="/admin/orders" className="hover:bg-gray-700 p-2 rounded">
            Manage Orders
          </Link>
          <Link
            to="/admin/categories"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Manage Categories
          </Link>
          <Link to="/admin/reports" className="hover:bg-gray-700 p-2 rounded">
            View Reports
          </Link>
          <Link to="/admin/settings" className="hover:bg-gray-700 p-2 rounded">
            Admin Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 bg-gray-100 p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* This is where the content based on the link clicked will be rendered */}
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default AdminPanelPage;
