import React from "react";
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
import "./App.css";

function App() {
  return (
    <div className="App">
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
              path="/search-prompt"
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
            <Route path="/" element={<LandingPage />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
