import { Link } from "@tanstack/react-router";

const Admin = () => {
  return (
    <div>
      <p> Admin Dashboard</p>
      <br />
      <Link
        to="/admin/users"
        className="bg-sky-500 m-2 p-2 text-white rounded-2xl"
      >
        Users
      </Link>
    </div>
  );
};

export default Admin;
