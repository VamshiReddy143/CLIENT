import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Working from "./components/Working";
import Listing from "./components/Listing";
import Blog from "./components/Blog";
import Subscribe from "./components/Subscribe";
import Footer from "./components/Footer";
import FindSpace from "./components/FindSpace"; 
import ListingPage from "./ListingPage";
import AboutUsPage from "./AboutUsPage";

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <Navbar />
          <Routes>
            {/* Home Page Route */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <About />
                  <Working />
                  <Listing />
                  <Blog />
                </>
              }
            />
            {/* Find a Space Page Route */}
            <Route path="/find-space" element={<FindSpace />} />
            <Route path="/list-space" element={<ListingPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            {/* Add more routes as needed */}
          </Routes>
          <Subscribe />
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;