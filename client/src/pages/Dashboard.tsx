import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useCallback, useEffect } from "react";
import { database } from "../firebase.config";
import { ref, set, update, get } from "firebase/database";
import UserModel from "../models/UserModel";

const Dashboard = () => {
  const auth = UserAuth();
  const navigate = useNavigate();

  //Write user's data to the database
  const updateUserInfo = useCallback(() => {
    if (auth?.user) {
      const userRef = ref(database, `users/${auth.user.id}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const updates: Partial<UserModel> = {
            lastLogin: new Date(new Date().toISOString()),
          };

          // only update these fields if they aren't present
          if (!userData.name && auth.user?.name) updates.name = auth.user.name;
          if (!userData.email && auth.user?.email)
            updates.email = auth.user.email;
          if (!userData.createdAt && auth.user?.createdAt)
            updates.createdAt = new Date(auth.user?.createdAt.toISOString());

          updates.lastLogin = new Date(new Date().toISOString());
          updates.photoURL = auth.user?.photoURL;

          update(userRef, updates);
        } else {
          // if user data doesn't exist, set it
          set(userRef, {
            name: auth.user?.name,
            email: auth.user?.email,
            photoURL: auth.user?.photoURL,
            createdAt: auth.user?.createdAt
              ? new Date(auth.user.createdAt.toISOString())
              : new Date(),
            lastLogin: new Date(new Date().toISOString()),
          });
        }
      });
    }
  }, [auth]);

  useEffect(() => {
    // Redirect to sign in page if user is not signed in
    if (!auth?.user) {
      navigate("/login");
    } else {
      updateUserInfo();
    }
  }, [auth, navigate, updateUserInfo]);

  const signOut = async () => {
    try {
      auth?.logOut && (await auth.logOut());
    } catch (error) {
      console.error(error);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "20px",
      boxSizing: "border-box" as "border-box",
    },
    image: {
      borderRadius: "50%",
      height: "100px",
      width: "100px",
      objectFit: "cover" as "cover",
      marginBottom: "20px",
    },
    button: {
      marginTop: "20px",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#007BFF",
      color: "white",
      cursor: "pointer",
    },
    secondaryButton: {
      marginTop: "20px",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#6C757D",
      color: "white",
      cursor: "pointer",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Nested {auth?.user?.name.split(" ")[0]}!</h1>
      <p>Get started by going through our onboarding flow.</p>
      <div style={styles.buttonContainer}>
        <button style={styles.secondaryButton} onClick={signOut}>
          Sign Out
        </button>
        <button
          style={styles.button}
          onClick={() => navigate("/onboarding/intro")}
        >
          Go to Onboarding Flow
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
