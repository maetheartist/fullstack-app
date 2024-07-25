"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Button from "../button/Button";
import FormInput from "../user-input/FormInput";
import { signInWithGooglePopup,signInUserWithEmailAndPassword } from "../../../utils/firebase/firebase";
import Header from "../header/Header";
import Image from "next/image";
import Logo from "../../../images/VectorLogo.png"

interface FormFields {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const [formFields, setFormFields] = useState<FormFields>({
    email: "",
    password: "",
  });
  const resetForm = () => {
    setFormFields(formFields);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formFields);
    try {
      const response = await signInUserWithEmailAndPassword();
      console.log(response);
      resetForm();
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("auth/wrong-password");
          break;
        case "auth/user-not-found":
          alert("no user found with this email");
          break;
        default:
          console.log(error);
      }
    }
    
  };
 
  return (
    <div className="card">
      <Image src={Logo} alt="logo" />
      <Header>
      <strong className="text-2xl">Login</strong>
      <p className="my-4" >Add your details below to get back into the App.</p>
      </Header>
     <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <FormInput
          type="email"
          name="email"
          value={formFields.email}
          onChange={handleChange}
          required
          className="py-2 my-3"
        />
     
        <label>Password:</label>
        <FormInput
          type="password"
          name="password"
          value={formFields.password}
          onChange={handleChange}
          required
           className="py-2 my-3"
        />
       
          <Button onClick={signInUserWithEmailAndPassword}>Sign In</Button>
          {/* <Button buttonType="google" onClick={signInWithGoogle}>
          Google sign in
          </Button> */}
          <Header>
          <h2>Dont have an account?</h2>
          <a href="">Create Account</a>
          </Header>
      </form>
    </div>
  );
};
export default SignIn;
