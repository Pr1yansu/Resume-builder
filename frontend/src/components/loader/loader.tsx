import Image from "@/components/image/image";
import { HtmlHTMLAttributes } from "react";

const loaderStyles = {
  className:
    "flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-white z-50",
} satisfies HtmlHTMLAttributes<HTMLDivElement>;

const Loader = () => {
  return (
    <div {...loaderStyles}>
      <Image
        src={"/logo.png"}
        alt="loader"
        width={500}
        height={500}
        className="animate-pulse"
      />
    </div>
  );
};

export default Loader;
