// src/App.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LanguageProvider } from './context/LanguageContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/HomePage/Hero';
import Subscribe from './components/Subscribe';
import Footer from './components/Footer';
import FindSpace from './components/FindSpace';
import { Toaster } from 'react-hot-toast'; // Import Toaster
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
import VendorNotifications from './components/Vendor/VendorNotifications';
import AdminListings from './components/Admin/AdminListings';
import MarketOwners from './components/Admin/MarketOwners';
import VendorsSection from './components/Admin/VendorsSection';
import AdminSettings from './components/Admin/AdminSettings';
import AdminNotifications from './components/Admin/AdminNotifications';
import AdminsCheckingUserProfile from './components/Admin/AdminsCheckingUserProfile';
import AdminCheckingOwnerProfile from './components/Admin/AdminCheckingOwnerProfile';
import MOvendors from './components/MarketOwnerDashboard/MOvendors';
import MOrequests from './components/MarketOwnerDashboard/MOrequests';
import MOlistings from './components/MarketOwnerDashboard/MOlistings';
import MOsettings from './components/MarketOwnerDashboard/MOsettings';
import MOnotifications from './components/MarketOwnerDashboard/MOnotifications';
import MOinvoice from './components/MarketOwnerDashboard/MOinvoice';
import MOvendorlisting from './components/MarketOwnerDashboard/MOvendorlisting';
import EditMarket from './components/EditMarket';
import ResetPassword from './components/ResetPassword';
import MarketDetails from './components/Admin/MarketDetailsOfreceiveddata';
import VendorProfile from './components/MarketOwnerDashboard/VendorProfile';




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
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/listings" element={<AdminLayout><AdminListings /></AdminLayout>} />
            <Route path="/admin/marketowners" element={<AdminLayout><MarketOwners /></AdminLayout>} />
            <Route path="/admin/vendors" element={<AdminLayout><VendorsSection /></AdminLayout>} />
            <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
            <Route path="/admin/notifications" element={<AdminLayout><AdminNotifications /></AdminLayout>} />
            <Route path="/admin/vendor/profile/:vendorId" element={<AdminLayout><AdminsCheckingUserProfile /></AdminLayout>} />
            <Route path="/admin/owner/:ownerId" element={<AdminLayout><AdminCheckingOwnerProfile /></AdminLayout>} />
            <Route path="/admin/market/:marketId" element={<AdminLayout><MarketDetails /></AdminLayout>} />
            
          </Route>
          <Route element={<ProtectedRoute allowedRole="vendor" />}>
            <Route path="/vendor" element={<VendorLayout><VendorDashboard /></VendorLayout>} />
            <Route path="/vendor/listings" element={<VendorLayout><VendorListing /></VendorLayout>} />
            <Route path="/vendor/requests" element={<VendorLayout><VendorRequests /></VendorLayout>} />
            <Route path="/vendor/settings" element={<VendorLayout><VendorSettings /></VendorLayout>} />
            <Route path="/vendor/notifications" element={<VendorLayout><VendorNotifications /></VendorLayout>} />
          </Route>
          <Route element={<ProtectedRoute allowedRole="market_owner" />}>
            <Route path="/market-owner" element={<MarketOwnerLayout><MarketOwnerDashboard /></MarketOwnerLayout>} />
            <Route path="/market-owner/vendors" element={<MarketOwnerLayout><MOvendors /></MarketOwnerLayout>} />
            <Route path="/market-owner/requests" element={<MarketOwnerLayout><MOrequests /></MarketOwnerLayout>} />
            <Route path="/market-owner/listings" element={<MarketOwnerLayout><MOlistings /></MarketOwnerLayout>} />
            <Route path="/market-owner/settings" element={<MarketOwnerLayout><MOsettings /></MarketOwnerLayout>} />
            <Route path="/market-owner/notifications" element={<MarketOwnerLayout><MOnotifications /></MarketOwnerLayout>} />
            <Route path="/mo/invoice" element={<MarketOwnerLayout><MOinvoice /></MarketOwnerLayout>} />
            <Route path="/vendor/listing" element={<MarketOwnerLayout><MOvendorlisting /></MarketOwnerLayout>} />
            <Route path="/vendor/:vendorId" element={<MarketOwnerLayout><VendorProfile /></MarketOwnerLayout>} />
            <Route path="/edit-market/:id" element={<EditMarket />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;