// pages/signin.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
// import styles from "../styles/SignIn.module.scss"; // Adjust import path for CSS/SCSS

// import {
//   signInWithGooglePopup,
//   createUserDocumentFromAuth,
// } from "../../firebase/firebase"; // Adjust import path for Firebase functions

import FormInput from "../user-input/FormInput"; // Adjust import path
import Button from "../button/Button"; // Adjust import path

interface FormFields {
  email: string;
  password: string;
}

const defaultFormFields: FormFields = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [formFields, setFormFields] = useState < FormFields > defaultFormFields;

  const { email, password } = formFields;

  const resetFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    // try {
    //   const { user } = await signInWithGooglePopup();
    //   await createUserDocumentFromAuth(user);
    // } catch (error) {
    //   console.error("Google sign-in error:", error.message);
    // }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Your sign-in logic can be implemented here
      resetFields();
    } catch (error) {
      console.error("Sign-in error:", error.message);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <Head>
        <title>Sign In</title>
      </Head>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
