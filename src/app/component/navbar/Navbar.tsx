"use client";
import Image from "next/image";
import logo from "../../../images/VectorLogo.png";
import link from "../../../images/Vector.png";
import avi from "../../../images/Vectoravi.png";
import publish from "../../../images/Vectoreye.png";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-evenly w-full  h-5">
      <Image src={logo} alt="Logo" className="w-7 h-7"/>
      <Image src={link} alt="link" />
      <Image src={avi} alt="avi" />
      <Image src={publish} alt="publish" />
    </nav>
  );
};

export default Navbar;
