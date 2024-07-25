import React from "react";
import SignIn from "./component/sign-in/SignIn";
import SignUp from "./component/sign-up/SignUp";
// import Authentication from "./component/auth/Authentication";

export default function page() {
  return (
    <div>
    <SignIn/>
    <SignUp/>
    </div>
  );
}
