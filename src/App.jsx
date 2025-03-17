// src/App.jsx
import React from "react";
import PropTypes from 'prop-types'; // Add this import
import { LanguageProvider } from "./context/LanguageContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/HomePage/Hero";


import Subscribe from "./components/Subscribe";
import Footer from "./components/Footer";
import FindSpace from "./components/FindSpace";
import ListingPage from "./ListingPage";
import AboutUsPage from "./AboutUsPage";
import Contact from "./components/ContactUsPage/Contact";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import About from "./components/HomePage/About";
import Blog from "./components/HomePage/Blog";
import Working from "./components/HomePage/Working";
import Listing from "./components/HomePage/Listing";


const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    <Navbar />
    {children}
    <Subscribe />
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired // Add PropTypes validation
};

const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-100">
    {children}
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired // Add PropTypes validation
};

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Routes with Navbar and Footer */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Hero />
                <About />
                <Working />
                <Listing />
                <Blog />
              </MainLayout>
            }
          />
          <Route
            path="/find-space"
            element={
              <MainLayout>
                <FindSpace />
              </MainLayout>
            }
          />
          <Route
            path="/list-space"
            element={
              <MainLayout>
                <ListingPage />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <AboutUsPage />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />

          {/* Routes without Navbar and Footer */}
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <SignUp />
              </AuthLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;