import { useAuth } from "../context/AuthContext";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const auth = useAuth();

  const signOut = async () => {
    try {
      auth?.logOut && (await auth.logOut());
    } catch (error) {
      console.error(error);
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "20px",
      boxSizing: "border-box",
    },
    image: {
      borderRadius: "50%",
      height: "100px",
      width: "100px",
      objectFit: "cover",
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
  };

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>
      <img
        style={styles.image}
        src={auth?.user?.photoURL}
        alt={auth?.user?.name}
      />
      <p>Hi, {auth?.user?.name}!</p>
      <p>Your email is: {auth?.user?.email}</p>
      <p>
        Nest Builder since{" "}
        {formatDistanceToNow(auth?.user?.createdAt || new Date())} ago
      </p>{" "}
      <p>
        Last login {formatDistanceToNow(auth?.user?.lastLogin || new Date())}{" "}
        ago
      </p>
      <button style={styles.button} onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
