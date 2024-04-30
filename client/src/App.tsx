import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Protected from "./components/Protected";
import SignInPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import CategoriesPage from "./pages/CategoriesPage";
import UserProfilePage from "./pages/UserProfilePage";
import { AuthContextProvider } from "./context/AuthContext";
import { Loader } from "@googlemaps/js-api-loader";
import "./App.css";
import OnboardingPage from "./pages/OnboardingPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import MyNestPage from "./pages/MyNestPage";
import ExplorePage from "./pages/ExplorePage";

const THEME = createTheme({
  typography: {
    fontFamily: `"Product Sans Regular", "Product Sans Bold", "Product Sans Italic", "Product Sans Light"`,
  },
});

function App() {
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_googleMapsAPIKey || "",
      version: "weekly",
      libraries: ["places"],
    });

    loader.importLibrary("maps").then((google) => {
      console.log("Google Maps API loaded");
    });
    loader.importLibrary("marker").then((google) => {
      console.log("Google Maps Marker API loaded");
    });
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={THEME}>
        <AuthContextProvider>
          <Router>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <Protected>
                    <Dashboard />
                  </Protected>
                }
              />
              <Route
                path="/search-prompt/:categoryTitle?"
                element={
                  <Protected>
                    <SearchPage />
                  </Protected>
                }
              />
              <Route
                path="/categories"
                element={
                  <Protected>
                    <CategoriesPage />
                  </Protected>
                }
              />
              <Route
                path="/user-profile"
                element={
                  <Protected>
                    <UserProfilePage />
                  </Protected>
                }
              />
              <Route
                path="/onboarding/*"
                element={
                  <Protected>
                    <OnboardingPage />
                  </Protected>
                }
              />
              <Route
                path="/my-nest"
                element={
                  <Protected>
                    <MyNestPage />
                  </Protected>
                }
              />
              <Route
                path="/explore"
                element={
                  <Protected>
                    <ExplorePage />
                  </Protected>
                }
              />
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/not-found" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </AuthContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
