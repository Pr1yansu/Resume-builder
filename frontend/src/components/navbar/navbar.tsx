import Image from "@/components/image/image";
import { Link, useLocation } from "react-router-dom";
const hiddenPages = [
  "/login",
  "/register",
  "/forgot-password",
  "/dashboard",
  "/builder",
];

const Navbar = () => {
  const location = useLocation();
  if (hiddenPages.includes(location.pathname)) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 right-0 p-2 z-50">
      <header className="container">
        <Link to="/" className="flex justify-center items-center">
          {" "}
          <Image
            src={"/logo.png"}
            alt="logo"
            width={150}
            height={150}
            className="cursor-pointer"
          />
        </Link>
      </header>
    </div>
  );
};

export default Navbar;
