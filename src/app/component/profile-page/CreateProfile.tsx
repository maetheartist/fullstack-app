"use client"
import Image from "next/image";
import {useState,FormEvent, ChangeEvent} from 'react'
import Header from '../header/Header'
import FormInput from '../user-input/FormInput'
import {  collection, addDoc  } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage} from "../../../utils/firebase/firebase";
import Button from '../button/Button';
import icon from "../../../images/imgIcon.png"


export default function CreateProfile() {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [uploading, setUploading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePhoto(event.target.files[0]);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    try {
      
      let profilePhotoURL = '';
      if (profilePhoto) {
        const storageRef = ref(storage, `profilePhotos/${profilePhoto.name}`);
        await uploadBytes(storageRef, profilePhoto);
        profilePhotoURL = await getDownloadURL(storageRef);
      }
      // Add profile data to Firestore
      await addDoc(collection(db, 'profiles'), {
        firstName,
        lastName,
        email,
        profilePhotoURL,
        createdAt: new Date()
      });
      alert('Profile saved successfully!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setProfilePhoto(null);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className='card'>
        <Header>
            <strong>Profile Details</strong>
            <p>Add your details to create a personal touch to your profile</p>
        </Header>
        <div>
            <form onSubmit={handleSubmit}>
        <div className=''>
            <div>
            <FormInput
            className='profile-img'
            label='Profile Picture'
            type="file"
            onChange={handleFileChange}
            />
            {/* <span onClick={handleFileChange}><Image src={icon} alt="img" /></span> */}
            </div>
            <span>Image must be below 1024x1024px. Use PNG or JPG format.</span>
        </div>

        
                <FormInput
                 label="First Name"
                 type="text"
                 required
                 onChange={(e)=>setFirstName(e.target.value)}
                 name="firstName"
                 value={firstName}
                 placeholder="Enter your firstname"
                 className="py-2 my-3"
                />
                <FormInput
                label="Last Name"
                type="text"
                required
                onChange={(e)=> setLastName(e.target.value)}
                name="lastName"
                value={lastName}
                placeholder="Enter your lastname"
                className="py-2 my-3"
                />
                <FormInput
                label="Email"
                type="email"
                required
                onChange={(e)=>setEmail(e.target.value)}
                name="email"
                value={email}
                placeholder="Enter your email"
                className="py-2 my-3"
                />
                <Button type='submit' disabled={uploading}>{uploading? "Saving": "Save"}</Button>
            </form>
        </div>
    </div>
  )
}