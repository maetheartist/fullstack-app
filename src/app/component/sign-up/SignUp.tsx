// Use `import` statements without the `use client`; comment
import React, { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import {
  createUserDocumentFromAuth,
  createUserAuthWithEmailandPassword,
} from "../../../utils/firebase/firebase";
import FormInput from "../user-input/FormInput";
import Button from "../button/Button";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";

interface FormFields {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultFormFields: FormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await createUserAuthWithEmailandPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, {
        displayName: formFields.displayName,
      });
      resetFields();
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.error("User creation encountered an error");
      }
    }
  };

  return (
    <div className="">
      <div className="card">
        <Head>
          <title>Sign Up</title>
        </Head>
        <Navbar/>
        <Header>
        <strong className="text-2xl">Don't have an account?</strong>
        <p className="my-4">Let's get you started sharing your link.</p>
        
        </Header>
       <form onSubmit={handleSubmit}>
          <FormInput
            label="Display Name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
            placeholder="Enter your name"
            className="py-2 my-3"
          />
          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
            placeholder="Enter a valid email address e.g., user@example.com"
            className="py-2 my-3"
          />
          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
            placeholder="At least 8 characters"
            className="py-2 my-3"
          />
          <FormInput
            label="Confirm Password"
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm password"
            className="py-2 my-3"
          />
     
          <p className="text-sm text-gray-500">
            Passwords must contain at least 8 characters.
          </p>
          <Button type="submit">Sign Up</Button>
        </form>
       <Header>
       <h2>Already have an Account?</h2>
        <a href="https://google.com">Log In</a>
       </Header>
      </div>
    </div>
  );
}
