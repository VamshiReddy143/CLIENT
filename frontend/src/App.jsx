// src/App.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { LanguageProvider } from './context/LanguageContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/HomePage/Hero';
import Subscribe from './components/Subscribe';
import Footer from './components/Footer';
import FindSpace from './components/FindSpace';
import ListingPage from './ListingPage';
import AboutUsPage from './AboutUsPage';
import Contact from './components/ContactUsPage/Contact';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import About from './components/HomePage/About';
import Blog from './components/HomePage/Blog';
import Working from './components/HomePage/Working';
import Listing from './components/HomePage/Listing';
import CreateMarket from './components/CreateMarket';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './components/Admin/AdminDashboard';
import VendorLayout from './components/Vendor/VendorLayout';
import VendorDashboard from './components/Vendor/VendorDashboard';
import MarketOwnerLayout from './components/MarketOwnerDashboard/MarketOwnerLayout';
import MarketOwnerDashboard from './components/MarketOwnerDashboard/MarketOwnerDashboard';
import VendorListing from './components/Vendor/VendorListing';
import VendorRequests from './components/Vendor/VendorRequests';
import VendorSettings from './components/Vendor/VendorSettings';


const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    <Navbar />
    {children}
    <Subscribe />
    <Footer />
  </div>
);
MainLayout.propTypes = { children: PropTypes.node.isRequired };

const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-100">
    {children}
  </div>
);
AuthLayout.propTypes = { children: PropTypes.node.isRequired };

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
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
          <Route path="/find-space" element={<MainLayout><FindSpace /></MainLayout>} />
          <Route path="/market/:id" element={<MainLayout><ListingPage /></MainLayout>} />
          <Route path="/list-space" element={<MainLayout><ListingPage /></MainLayout>} />
          <Route path="/about" element={<MainLayout><AboutUsPage /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/create-market" element={<MainLayout><CreateMarket /></MainLayout>} />

          {/* Auth Routes */}
          <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          </Route>
          <Route element={<ProtectedRoute allowedRole="vendor" />}>
            <Route path="/vendor" element={<VendorLayout><VendorDashboard /></VendorLayout>} />
            <Route path="/vendor/listings" element={<VendorLayout><VendorListing /></VendorLayout>} />
            <Route path="/vendor/requests" element={<VendorLayout><VendorRequests /></VendorLayout>} />
            <Route path="/vendor/settings" element={<VendorLayout><VendorSettings /></VendorLayout>} />
          </Route>
          <Route element={<ProtectedRoute allowedRole="market_owner" />}>
            <Route path="/market-owner" element={<MarketOwnerLayout><MarketOwnerDashboard /></MarketOwnerLayout>} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;