import { useState, useEffect } from "react";
import { db } from "../../../utils/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Button from "../button/Button";

interface UserData {
  email: string;
  image: string; 
  socialLinks: {
    Github?: string;
    LinkedIn?: string;
    Twitter?: string;
    Dev?: string;
    YouTube?: string;
    Codewars?: string;
    FreeCodeCamp?: string;
  };
}

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      
      const userId = "userId"; 
      const userDocRef = doc(db, "users", userId);
      
      try {
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data() as UserData;
          setUserData(userData);
        } else {
          console.log("User document not found");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleShareLink = (socialLink: string) => {
    window.open(socialLink, "_blank");
  };

  return (
    <div className="user-profile">
      {userData ? (
        <>
          <h2>User Profile</h2>
          <p>Email: {userData.email}</p>
          {userData.image && <img src={userData.image} alt="User" />}
          <div className="social-links">
            {Object.entries(userData.socialLinks).map(([platform, link]) => (
              <Button key={platform} onClick={() => handleShareLink(link)}>
                {platform}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfilePage;
