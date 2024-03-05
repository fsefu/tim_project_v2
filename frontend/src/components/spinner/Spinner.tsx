import { useEffect, useState } from "react";
import logo from "../../assets/img/layout/logo2.png";

interface spinnerProps {
  isFromLogin?: boolean;
}
function Spinner({ isFromLogin }: spinnerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768); // Adjust breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on initial render

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const responsiveClassName = isMobile ? "left-1/2" : "left-1/4"; // Adjust class names as desired

  return (
    // <div className="relative flex justify-center items-center">
    <div
      role="status"
      className={
        isFromLogin
          ? `absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 ${responsiveClassName}`
          : "absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 "
      }
    >
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-400"></div>
      <img src={logo} className="rounded-full h-30 w-28 mt-2 ml-2" />
    </div>
  );
}

export default Spinner;
