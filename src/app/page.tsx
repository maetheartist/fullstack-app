// import Image from "next/image";
import LinkPage from "./component/link-page/LinkPage";
import Navbar from "./component/navbar/Navbar";
import SignIn from "./component/sign-in/SignIn";
import SignUp from "./component/sign-up/SignUp";
export default function Home() {
  return (
    <main>
      <SignIn />
      <SignUp/>
      <LinkPage/>

    </main>
  );
}
