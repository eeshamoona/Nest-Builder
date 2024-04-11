import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "react-google-button";
import { useEffect } from "react";

const SignInPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      auth?.googleSignIn && (await auth.googleSignIn());
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
    button: {
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        Nest Builder
      </h1>
      {auth?.loading ? (
        <p>Loading...</p>
      ) : (
        <GoogleButton
          style={styles.button}
          onClick={handleGoogleSignIn}
          disabled={auth?.loading}
        />
      )}
    </div>
  );
};

export default SignInPage;
