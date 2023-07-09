import { db } from "@config/firebase";
import { useAuth } from "@hooks/useAuth";
import { Avatar, Box, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

function Profile() {
  const { user } = useAuth();
  const [userInfo, setInfo] = useState({
    role: "user",
    photoURL:
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
    displayName: "",
    uid: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));

      getDocs(q)
        .then((querySnapshot) => {
          let previousUserInfo: {
            role: string;
            photoURL: string;
            displayName: string;
            uid: string;
            email: string;
          } = userInfo;

          querySnapshot.forEach((doc) => {
            previousUserInfo = doc.data() as typeof previousUserInfo;
          });

          setInfo(previousUserInfo);
        })
        .catch((error) => {
          // Handle error
        });
    }
  }, [user]);

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h4" fontWeight={700} gutterBottom>
          My Profile
        </Typography>
        <Avatar
          alt=""
          src={userInfo.photoURL}
          sx={{ width: 150, height: 150, margin: "auto", marginTop: 5 }}
        />
        <p
          style={{
            fontSize: 24,
            border: "1px solid #00695c",
            maxWidth: "500px",
            margin: "auto",
            marginTop: "30px",
            padding: "10px",
          }}
        >
          Name: {userInfo.displayName} <br />
          Email: <a href={`mailto:${user?.email}`}>{user?.email}</a> <br />
          Facebook:{" "}
          <a
            target="_blank"
            href={`http://facebook.com/${user?.email?.split("@")[0]}`}
          >
            facebook.com/{user?.email?.split("@")[0]}
          </a>{" "}
          <br />
          Instagram:{" "}
          <a
            target="_blank"
            href={`https://www.instagram.com/${user?.email?.split("@")[0]}`}
          >
            instagram.com/{user?.email?.split("@")[0]}
          </a>
        </p>
      </Box>
    </>
  );
}

export default Profile;
