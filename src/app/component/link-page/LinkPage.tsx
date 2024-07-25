"use client"
import { useState, ChangeEvent, FormEvent } from "react";
import { db } from "../../../utils/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import FormInput from "../user-input/FormInput";
import Header from "../header/Header";
import Button from "../button/Button";
interface FormFields {
  email: string;
  platform: string;
  username: string;
  social: object;
}
const socialLinks = {
  Github: 'https://www.github.com/',
  LinkedIn: 'https://www.linkedin.com/in/',
  Twitter: 'https://twitter.com/',
  Dev: 'https://dev.to.com/',
  YouTube:'https://youtube.com/',
  Codewars: 'https://codewars.com/',
  FreeCodeCamp:'https://freecodecamp.com/'
  
};
const defaultFormFields: FormFields = {
  email: "",
  platform: "Github",
  username: "",
  social: socialLinks

};

const createUserAuthWithEmailandPassword = async (email: string, platform: string) => {
  const auth = getAuth();
  return await createUserWithEmailAndPassword(auth, email, "password");
};

const createUserDocumentFromAuth = async (userAuth: any, additionalData: any ) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { email, additionalData } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error: any) {
      console.log("Error creating user document", error.message);
    }
  }
  return(userDocRef);
   ;
};
export default function LinkPage() {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, platform, username } = formFields;
    try {
     
      const { user } = await createUserAuthWithEmailandPassword(email, platform,); 
      await createUserDocumentFromAuth(user, {
        email,
        platform,
          socialLink: `${socialLinks[platform as keyof typeof socialLinks]}${username}`,
      });
      console.log(user);
      resetFields(); // Reset form fields after successful submission
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.error("User creation encountered an error", error);
      }
    }
  };
  try {
    
  } catch (error: any) {
    
  }
  const resetFields = () => {
    setFormFields(defaultFormFields);
  };
  return (
    <div className="card">
      <Header>
        <strong>Customize your links</strong>
        <p>
          Add, edit, remove links and then share all your profiles with the rest
          of the world
        </p>
      </Header>
      <Button className="accent-button">Add Link</Button>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <FormInput
          placeholder="Enter your email"
          type="email"
          value={formFields.email}
          name="email"
          onChange={handleChange}
          required
        />
        
        <div className="my-8" >
        <label>Platform</label>
          <div className="select-input">
          <select
            name="platform"
            value={formFields.platform}
            onChange={handleChange}
            required
          >
            <option value="Github">Github</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Twitter">Twitter</option>
            <option value="Youtube"></option>
            <option value="Dev.to"></option>
            <option value="Codewars"></option>
            <option value="FreeCodeCamp"></option>
          </select>
          </div>
        </div>
        <label>Username</label>
        <FormInput
          placeholder={`Enter your ${formFields.platform} username`}
          type="text"
          value={formFields.username}
          name="username"
          onChange={handleChange}
          required
        />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}