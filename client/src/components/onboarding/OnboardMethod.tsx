import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { formatBirthday } from "../../utils/RandomUtils";

const OnboardMethod = () => {
  const auth = UserAuth();
  const [birthday, setBirthday] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [addresses, setAddresses] = useState<any[]>([]);

  const fetchGoogleInfo = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:5000/fetch-people-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    if (!response.ok) {
      console.log("Error fetching Google Info. Response: ", response);
      return null;
    }

    const googleInfo = await response.json();
    console.log("NEW Google Info: ", googleInfo);

    let userBirthday = null;
    let userGender = null;
    let userAddresses = [];

    if (googleInfo?.birthdays) {
      for (const birthday of googleInfo.birthdays) {
        if (birthday.date && birthday.date.year) {
          userBirthday = new Date(
            birthday.date.year,
            birthday.date.month - 1,
            birthday.date.day
          );
          break; // Exit the loop after finding a birthday with year
        }
      }
    }

    if (googleInfo?.genders) {
      userGender = googleInfo.genders[0]?.formattedValue;
    }

    if (googleInfo?.addresses) {
      //TODO: Confirm this is the way to destructure the address
      userAddresses = googleInfo.addresses[0]?.formattedValue;
    }

    setBirthday(formatBirthday(userBirthday));
    setGender(userGender);
    setAddresses(userAddresses);
  };

  useEffect(() => {
    fetchGoogleInfo();
  }, []);

  const handleUpload = () => {
    // Handle the JSON file upload
  };
  const styles = {
    container: {
      display: "flex",
      flexDirection: "row" as "row", // Explicitly set the type
      justifyContent: "space-between",
      padding: "20px",
    },
    halfWidth: {
      width: "48%", // Reduced to account for potential padding/margin
      boxSizing: "border-box" as "border-box", // To include padding and border in element's total width
    },
    paper: {
      padding: "20px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // More subtle shadow
      borderRadius: "8px", // Rounded corners
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      backgroundColor: "#007BFF", // Use Bootstrap primary color
      color: "white",
      padding: "10px 20px",
      fontSize: "1rem", // Use rem for scalable font size
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.halfWidth}>
        <h4>Let's Begin</h4>
        <div style={styles.paper}>
          <h6>User Information</h6>
          <img
            src={auth?.user?.photoURL}
            alt="User"
            style={{ borderRadius: "50%" }}
          />

          <input
            type="text"
            placeholder="Name"
            defaultValue={auth?.user?.name}
            disabled
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Email"
            defaultValue={auth?.user?.email}
            disabled
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Location"
            value={addresses}
            onChange={(e) => setAddresses([e.target.value])}
            style={styles.input}
          />
        </div>
      </div>
      <div style={styles.halfWidth}>
        <h6>Onboard your data:</h6>
        <p>
          Adding your Google Takeout Data can help you autofill your profile and
          give more accurate reccomendations!
        </p>
        <button style={styles.button} onClick={handleUpload}>
          Upload from Google Drive
        </button>
      </div>
    </div>
  );
};

export default OnboardMethod;
