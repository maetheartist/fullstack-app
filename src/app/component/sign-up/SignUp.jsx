// pages/signup.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
// import styles from "../styles/SignUp.module.css"; // Import CSS styles (or SCSS)

// import {
//   createUserAuthWithEmailandPassword,
//   createUserDocumentFromAuth,
// } from "../firebase/firebase"; // Adjust import path

import FormInput from "../user-input"; 
import Button from "../button"; 

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
    // try {
    //   const { user } = await createUserAuthWithEmailandPassword(email, password);
    //   await createUserDocumentFromAuth(user, { displayName });
    //   resetFields();
    // } catch (error) {
    //   if (error.code === "auth/email-already-in-use") {
    //     alert("Cannot create user, email already in use");
    //   } else {
    //     console.error("User creation encountered an error", error.message);
    //   }
    // }
  };

  return (
    <div className="">
      <Head>
        <title>Sign Up</title>
      </Head>
      <h2>Don't have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
