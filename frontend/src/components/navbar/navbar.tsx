import Image from "../image/image";
import { Link } from "react-router-dom";

const Navbar = () => {
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
