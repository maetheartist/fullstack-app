"use client";
import Image from "next/image";
import Link from 'next/link';

import logo from "../../../images/VectorLogo.png";
import link from "../../../images/Vector.png";
import avi from "../../../images/Vectoravi.png";
import publish from "../../../images/Vectoreye.png";
import Authentication from "../auth/Authentication";


const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-evenly w-full  h-5">
      <div>
      <Link href="/"> 
      <Image src={logo} alt="Logo" className="w-auto h-auto"/> 
      </Link>
      <Authentication/>
      </div>
      <Link href="/createlink"><Image src={link} alt="link" className="w-auto h-auto"/></Link>
      <Link href="/createprofile"><Image src={avi} alt="avi" className="w-auto h-auto" /></Link>
     <Link href="/profile"> <Image src={publish} alt="publish" className="w-auto h-auto"/></Link>
    </nav>
  );
};

export default Navbar;
