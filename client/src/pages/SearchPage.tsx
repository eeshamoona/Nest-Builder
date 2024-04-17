import { useEffect, useState } from "react";
import { CSSProperties } from "react";
import { generateAPIRequest } from "../services/SearchPromptServices";
import { UserAuth } from "../context/AuthContext";
import ResultCard from "../components/ResultCard";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../firebase.config";
import { ref, get } from "firebase/database";
import {
  PRICE_OPTIONS,
  ACCESS_OPTIONS,
  ADDITIONAL_VIBE_OPTIONS,
  DEFAULT_PRIORITIES,
  DEFAULT_CATEGORIES,
  DEFAULT_USER_PREFERENCES,
} from "../constants/SearchPageConstants";

const SearchPage = () => {
  const auth = UserAuth();
  const navigate = useNavigate();
  const [subCategoryOptions, setSubCategoryOptions] = useState([] as any[]);
  const [environmentDescriptorOptions, setEnvironmentDescriptorOptions] =
    useState([] as any[]);

  const [category, setCategory] = useState(subCategoryOptions[0] || "");
  const [access, setAccess] = useState(ACCESS_OPTIONS[0] || "");
  const [price, setPrice] = useState(PRICE_OPTIONS[0] || "");
  const [vibe, setVibe] = useState(
    environmentDescriptorOptions[0] || ADDITIONAL_VIBE_OPTIONS[0] || ""
  );

  const { categoryTitle } = useParams<{ categoryTitle: string }>();

  const [priority1, setPriority1] = useState(DEFAULT_PRIORITIES[0] || "");
  const [priority2, setPriority2] = useState(DEFAULT_PRIORITIES[1] || "");
  const [priority3, setPriority3] = useState(DEFAULT_PRIORITIES[3] || "");

  const [additionalUserProfileDetails, setAdditionalUserProfileDetails] =
    useState("");

  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const [response, setResponse] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth?.user) {
      navigate("/");
    }

    const fetchCategories = async () => {
      if (auth?.user && categoryTitle) {
        const categoriesRef = ref(
          database,
          `users/${auth.user.id}/categories/${categoryTitle}`
        );
        const categoriesSnapshot = await get(categoriesRef);
        const categoriesData = categoriesSnapshot.val();

        setSubCategoryOptions(categoriesData.relatedSubcategories || []);
        const combinedVibes = [
          ...(categoriesData.environmentDescriptors || []),
          ...(ADDITIONAL_VIBE_OPTIONS || []),
        ];
        const uniqueVibes = Array.from(new Set(combinedVibes));
        setEnvironmentDescriptorOptions(uniqueVibes);
        // TODO: Add user preferences to the user's profile
        console.log(
          DEFAULT_USER_PREFERENCES +
            " " +
            (categoriesData.userPreferences || "")
        );
        setAdditionalUserProfileDetails(
          DEFAULT_USER_PREFERENCES +
            ". " +
            (categoriesData.userPreferences || "")
        );
      } else if (auth?.user) {
        const categoriesRef = ref(database, `users/${auth.user.id}/categories`);
        const categoriesSnapshot = await get(categoriesRef);
        const categoriesData = categoriesSnapshot.val();

        if (!categoriesData) {
          setSubCategoryOptions(DEFAULT_CATEGORIES);
          return;
        } else {
          const categoryTitles = Object.keys(categoriesData);
          setSubCategoryOptions(categoryTitles);
        }

        setEnvironmentDescriptorOptions(ADDITIONAL_VIBE_OPTIONS);
        //TODO: Replace this with overall description of the user's preferences from their profile
        setAdditionalUserProfileDetails(DEFAULT_USER_PREFERENCES);
      }
    };

    fetchCategories();
  }, [auth, categoryTitle, navigate]);

  const goBack = () => {
    navigate(-1);
  };

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
    title: { color: "black" },
    arrowButton: {
      padding: "10px",
      border: "none",
      backgroundColor: "transparent",
      borderRadius: "5px",
      cursor: "pointer",
    },
    titleContainer: {
      display: "flex",
      justifyContent: "start",
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
      priority3,
      additionalUserProfileDetails
    );
    setResponse(response);
    setLoading(false);
  };

  const getSearchPageTitle = () => {
    if (categoryTitle) {
      return `Search ${categoryTitle}`;
    } else {
      return "General Search Page";
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <button onClick={goBack} style={styles.arrowButton}>
          &larr;
        </button>
        <h1 style={styles.title}>{getSearchPageTitle()}</h1>
      </div>
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
            <p style={styles.userData}>{additionalUserProfileDetails}</p>
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
          {subCategoryOptions.map((c) => (
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
          {subCategoryOptions.map((c) => (
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
          {ACCESS_OPTIONS.map((a) => (
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
          {PRICE_OPTIONS.map((p) => (
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
          {environmentDescriptorOptions.map((v) => (
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
          {DEFAULT_PRIORITIES.map((p) => (
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
          {DEFAULT_PRIORITIES.map((p) => (
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
          {DEFAULT_PRIORITIES.map((p) => (
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
