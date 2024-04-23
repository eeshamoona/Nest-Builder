import React, { useEffect, useMemo } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

interface SectionProps {
  id: string;
  title: string;
  content: React.ReactNode;
  buttonText?: string; // Optional button text
  buttonAction?: () => void; // Optional function for button click
}

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = UserAuth();

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  const styles: { [key: string]: React.CSSProperties } = {
    section: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      boxSizing: "border-box",
      backgroundColor: "#f4f4f4",
      color: "#333",
    },
    button: {
      marginTop: "10px",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#007BFF",
      color: "white",
      cursor: "pointer",
      fontSize: "1em",
    },
    header: {
      position: "fixed",
      top: 0,
      height: "5vh",
      width: "100%",
      zIndex: 1000,
      padding: "10px 20px",
      boxSizing: "border-box",
      backgroundColor: "#f4f4f4",
    },
    nav: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    link: {
      color: "#333",
      textDecoration: "none",
      fontSize: "1.2em",
      cursor: "pointer",
    },

    activeLink: {
      color: "#007BFF",
      textDecoration: "none",
      fontSize: "1.2em",
    },
    footer: {
      position: "fixed",
      left: 0,
      bottom: 0,
      width: "100%",
      margin: "1rem",
    },
  };

  //TODO: Move section's content to a separate file
  const sections: SectionProps[] = useMemo(
    () => [
      {
        id: "hero",
        title: "Welcome to Nested",
        content: (
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <p>
              Moving to a new city is overwhelming. Nested, powered by
              Gemini AI and Google Maps, eliminates stress by finding essential
              amenities near you. From gyms to grocery stores, explore options
              based on location, budget, and lifestyle.
            </p>
            <h3> Find your happily ever after, build your nest.</h3>
          </div>
        ),
        buttonText: "Get Started",
        buttonAction: () => {
          navigate("/login");
        },
      },
      {
        id: "about",
        title: "About Us",
        content: "[Describe team, motivation, and the problem]",
      },
      {
        id: "features",
        title: "Features",
        content: (
          <ul>
            <li>[List feature 1]</li>
            <li>[List feature 2]</li>
            <li>[List feature 3]</li>
          </ul>
        ),
      },
      {
        id: "try-it-out",
        title: "Try It Out!",
        content: (
          <p>
            [Explain the benefits of trying your app and the free Google login
            option]
          </p>
        ),
        buttonText: "Try with Google",
        buttonAction: () => {
          navigate("/login");
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Scroll to the section based on the URL hash or scroll to the top
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const element = document.getElementById(id);
      if (element && sections.some((section) => section.id === id)) {
        element.scrollIntoView();
      } else {
        scroll.scrollToTop();
        navigate("/");
      }
    } else {
      scroll.scrollToTop();
    }
  }, [location, navigate, sections]);

  return (
    <div>
      <header style={styles.header}>
        <nav style={styles.nav}>
          {sections.map((section) => (
            <Link
              key={section.id}
              to={section.id}
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              activeClass="active"
              style={styles.link}
              activeStyle={styles.activeLink}
            >
              {section.title}
            </Link>
          ))}
        </nav>
      </header>

      <main>
        {sections.map((section) => (
          <section key={section.id} id={section.id} style={styles.section}>
            <h2>{section.title}</h2>
            {section.content}
            {section.buttonText && (
              <button style={styles.button} onClick={section.buttonAction}>
                {section.buttonText}
              </button>
            )}
          </section>
        ))}
      </main>

      <footer style={styles.footer}>
        <p>&copy;2024 MS..AI</p>
      </footer>
    </div>
  );
};

export default LandingPage;
