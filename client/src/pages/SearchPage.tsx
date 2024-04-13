import { useState } from "react";
import { CSSProperties } from "react";
import {
  generateAPIRequest,
  getUserData,
} from "../services/SearchPromptServices";
import { UserAuth } from "../context/AuthContext";
import ResultCard from "../components/ResultCard";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const auth = UserAuth();
  const navigate = useNavigate();
  const [category, setCategory] = useState("restaurants");
  const [access, setAccess] = useState("walking");
  const [price, setPrice] = useState("inexpensive");
  const [vibe, setVibe] = useState("fun");
  const [priority1, setPriority1] = useState("safety");
  const [priority2, setPriority2] = useState("cleanliness");
  const [priority3, setPriority3] = useState("walkability");

  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const [response, setResponse] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

  const categories = [
    "restaurants",
    "parks",
    "museums",
    "fast food",
    "gyms",
    "grocery stores",
    "shopping malls",
    "theaters",
    "coffee shops",
    "libraries",
  ];
  const accesses = ["walking", "biking", "driving", "taking public transit"];
  const prices = [
    "free ($)",
    "very inexpensive ($-$$)",
    "inexpensive ($$)",
    "moderate ($$-$$$)",
    "above average ($$$)",
    "expensive ($$$-$$$$)",
    "luxurious ($$$$$)",
  ];
  const vibes = [
    "feminine",
    "fun",
    "supportive",
    "energetic",
    "relaxed",
    "luxurious",
    "minimalist",
    "artistic",
    "vintage",
    "modern",
    "eclectic",
  ];
  const priorities = [
    "safety",
    "cleanliness",
    "walkability",
    "accessibility",
    "convenience",
    "affordability",
    "quietness",
    "community",
    "amenities",
    "green spaces",
  ];

  const baseButton = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    color: "white",
    cursor: "pointer",
  };

  const styles: { [key: string]: CSSProperties } = {
    header: {
      color: "#333",
      textAlign: "center",
      margin: "20px 0",
    },
    select: {
      margin: "0 5px",
    },
    button: {
      ...baseButton,
      backgroundColor: "#007BFF",
      marginTop: "20px",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      boxSizing: "border-box",
      width: "60%",
      margin: "0 auto",
    },
    section: {
      fontFamily: "Arial, sans-serif",
      margin: "20px 0",
      alignSelf: "end",
    },
    panel: {
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
    },
    greeting: {
      marginBottom: "10px",
    },
    userData: {
      marginBottom: "20px",
    },
    secondaryButton: {
      ...baseButton,
      backgroundColor: "#6C757D",
    },
    image: {
      borderRadius: "50%",
      height: "2.1875rem",
      width: "2.1875rem",
      cursor: "pointer",
    },
    userContainer: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "end",
      gap: "1rem",
    },
  };

  const runPrompt = async () => {
    setLoading(true);
    const response = await generateAPIRequest(
      auth?.user?.id || "",
      category,
      access,
      price,
      vibe,
      priority1,
      priority2,
      priority3
    );
    setResponse(response);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Search Page</h1>
      <div style={styles.userContainer}>
        <img
          style={styles.image}
          src={auth?.user?.photoURL}
          alt={auth?.user?.name}
          onClick={() => {
            navigate("/dashboard");
          }}
        />
        <button
          style={styles.secondaryButton}
          onClick={() => setUserPanelOpen(!userPanelOpen)}
        >
          {userPanelOpen ? "Hide" : "Show"} User Data
        </button>
      </div>

      <section className="user-panel" style={styles.section}>
        {userPanelOpen ? (
          <div style={styles.panel}>
            <h4 style={styles.greeting}>
              Hey, {auth?.user?.name.split(" ")[0]}! This is the info we are
              using in this query:
            </h4>
            <p style={styles.userData}>{getUserData(auth?.user?.id)}</p>
          </div>
        ) : (
          <></>
        )}
      </section>
      <p style={styles.header}>
        Hey, let's find more
        <select
          style={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        ! We are going to look for
        <select
          style={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        that you can access via
        <select
          style={styles.select}
          value={access}
          onChange={(e) => setAccess(e.target.value)}
        >
          {accesses.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        , that is
        <select
          style={styles.select}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          {prices.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        price range, and the vibes are
        <select
          style={styles.select}
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
        >
          {vibes.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        . Also, we are making sure your number one priority,
        <select
          style={styles.select}
          value={priority1}
          onChange={(e) => setPriority1(e.target.value)}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        , second priority
        <select
          style={styles.select}
          value={priority2}
          onChange={(e) => setPriority2(e.target.value)}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        , and third priority
        <select
          style={styles.select}
          value={priority3}
          onChange={(e) => setPriority3(e.target.value)}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        , are kept in mind!
      </p>
      <button style={styles.button} onClick={runPrompt}>
        Run
      </button>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <progress value={undefined} />
        </div>
      ) : (
        response &&
        response.length > 0 && (
          <div>
            <h2>Results</h2>
            {response.map((result, i) => (
              <ResultCard key={i} {...result} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default SearchPage;
