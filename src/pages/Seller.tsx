import { Link } from "@tanstack/react-router";

const Seller = () => {
  return (
    <div>
      <p>Seller Dashboard</p>
      <br />
      <Link to="/orders" className="bg-sky-500 m-2 p-2 text-white rounded-2xl">
        Orders
      </Link>
    </div>
  );
};

export default Seller;
