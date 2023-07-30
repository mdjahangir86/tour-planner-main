import { db } from "@config/firebase";
import { useAuth } from "@hooks/useAuth";
import { Avatar, Box, Button, Typography } from "@mui/material";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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
  const [formShow, setformShow] = useState(false);
  const userInfoGet = () => {
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
  };
  useEffect(userInfoGet, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const displayName = formData.get("displayName") as string;
    const photoURL = formData.get("photoURL") as string;

    const usersCollectionRef = collection(db, "users");

    // Build a query to find the document with the specified condition
    const q = query(usersCollectionRef, where("uid", "==", user?.uid));

    // Retrieve the matching document(s) using the query
    getDocs(q)
      .then((querySnapshot) => {
        // Iterate through the query snapshot to access each matching document
        querySnapshot.forEach((doc) => {
          // Update the document with the desired fields
          updateDoc(doc.ref, {
            ...userInfo,
            photoURL,
            displayName,
          })
            .then(() => {
              alert("Document updated successfully.");
              setInfo({
                ...userInfo,
                photoURL,
                displayName,
              });
            })
            .catch((error) => {
              alert("Error updating document:");
            });
        });
      })
      .catch((error) => {
        alert("Error retrieving documents:");
      });
  };

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
      <Box>
        <Button
          style={{
            backgroundColor: "#00695c",
            color: "#fff",
            marginLeft: "550px",
            marginTop: "30px",
          }}
          onClick={() => setformShow(true)}
        >
          Edit Profile
        </Button>
      </Box>

      {formShow && (
        <Box
          style={{
            backgroundColor: "#00695c",
            color: "#fff",
            width: "50%",
            margin: "30px auto",
            padding: "50px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name </label>
            <input
              defaultValue={userInfo.displayName}
              type="text"
              name="displayName"
              id=""
              style={{ width: "100%", margin: "10px 0 10px 0", padding: "5px" }}
            />{" "}
            <br />
            <label htmlFor="photoURL">PhotoURL </label>
            <input
              defaultValue={userInfo.photoURL}
              type="text"
              name="photoURL"
              id=""
              style={{ width: "100%", margin: "10px 0 10px 0", padding: "5px" }}
            />{" "}
            <br />
            <input
              type="submit"
              value="Update"
              style={{
                backgroundColor: "#fff",
                color: "#00695c",
                width: "25%",
                margin: "20px auto",
                fontWeight: "semi-bold",
                fontSize: "18px",
                border: "none",
                padding: "8px",
                cursor: "pointer",
              }}
            ></input>
          </form>
        </Box>
      )}
    </>
  );
}

export default Profile;
