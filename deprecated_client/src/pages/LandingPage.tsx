import React, { useEffect, useMemo } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import WelcomePage from "../components/landing/WelcomePage";
import AboutUsPage from "../components/landing/AboutUsPage";
import HowItWorksPage from "../components/landing/HowItWorksPage";
import SuccessPage from "../components/landing/SuccessPage";
import TryItOutPage from "../components/landing/TryItOutPage";
import NestedLogo from "../assets/nested-logo.png";
import { Typography } from "@mui/material";

interface SectionProps {
  id: string;
  title: string;
  content: React.ReactNode;
}

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = UserAuth();

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  const styles = {
    section: {
      height: "100vh",
      display: "flex",
      flexDirection: "column" as "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      boxSizing: "border-box" as "border-box",
      backgroundColor: "#f9faf6",
      color: "#333",
    },
    header: {
      position: "fixed" as "fixed",
      top: 0,
      height: "10vh",
      width: "100%",
      zIndex: 1000,
      boxSizing: "border-box" as "border-box",
      backgroundColor: "#f9faf6",
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
    buttonStyle: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#63a757",
      color: "#fff",
      cursor: "pointer",
    },
    activeLink: {
      color: "#63a757",
      textDecoration: "none",
      fontSize: "1.2em",
    },
    footer: {
      position: "fixed" as "fixed",
      left: 0,
      bottom: 0,
      width: "100%",
      marginLeft: "1rem",
    },
  };

  const sections: SectionProps[] = useMemo(
    () => [
      {
        id: "hero",
        title: "Welcome to Nested",
        content: WelcomePage(),
      },
      {
        id: "how-it-works",
        title: "How It Works",
        content: HowItWorksPage(),
      },
      {
        id: "about",
        title: "About Us",
        content: AboutUsPage(),
      },
      {
        id: "success",
        title: "Our Success",
        content: SuccessPage(),
      },
      {
        id: "try-it-out",
        title: "Try It Out!",
        content: TryItOutPage(),
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
          <img
            src={NestedLogo}
            alt="Nested Logo"
            onClick={() => scroll.scrollToTop()}
            style={{ width: "5rem", height: "5rem", cursor: "pointer" }}
          />
          {sections.map((section) => (
            <Link
              key={section.id}
              to={section.id}
              spy={true}
              smooth={true}
              offset={section.id === "try-it-out" ? 100 : 0}
              duration={500}
              activeClass="active"
              style={
                section.id === "try-it-out"
                  ? { ...styles.link, ...styles.buttonStyle }
                  : styles.link
              }
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
            {section.content}
          </section>
        ))}
      </main>

      <footer style={styles.footer}>
        <Typography variant="body2" color="textSecondary" align="left">
          Last Updated: June 7th 2024 by Eesha Moona
        </Typography>
      </footer>
    </div>
  );
};

export default LandingPage;
