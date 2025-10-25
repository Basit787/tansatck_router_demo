import { Link } from "@tanstack/react-router";

const About = () => {
  return (
    <div className="p-2">
      <p>Hello from About!</p>
      <br />
      <p>Go to nested routes</p>
      <br />
      <Link to="/about/test" className="bg-sky-500 p-2 rounded text-white">
        Test
      </Link>
    </div>
  );
};

export default About;
