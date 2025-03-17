import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    console.log("Current path:", location.pathname);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  const t = translations[language];

  const navLinks = [
    { to: "/find-space", label: t.findSpace },
    { to: "/list-space", label: t.listSpace },
    { to: "/about", label: t.aboutUs },
    { to: "/contact", label: t.contactUs },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 15, mass: 0.8 },
    },
  };

  const linkVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: {
      y: -5,
      color: "#f97316",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const langButtonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: "backOut" } },
    hover: {
      rotate: 360,
      scale: 1.2,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
    exit: { opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.2 } },
  };

  const sidebarVariants = {
    hidden: { clipPath: "circle(0% at 0 0)" },
    visible: {
      clipPath: "circle(150% at 0 0)",
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    exit: {
      clipPath: "circle(0% at 0 0)",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const sidebarItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 150, damping: 20, staggerChildren: 0.15 },
    },
    hover: {
      x: 10,
      color: "#f97316",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const buttonVariants = {
    initial: {
      scale: 1,
      y: 0,
      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.25), 0px -2px 8px rgba(255, 255, 255, 0.2)",
    },
    hover: {
      scale: 1.03,
      y: -3,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3), 0px -3px 10px rgba(255, 255, 255, 0.25)",
      transition: { duration: 0.15, ease: "easeOut" },
    },
    tap: {
      scale: 0.97,
      y: 4,
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15), 0px -1px 4px rgba(255, 255, 255, 0.1)",
      transition: { duration: 0.1, ease: "easeIn" },
    },
  }

  return (
    <motion.div
      className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1440px] mx-auto"
      initial="hidden"
      animate="visible"
      variants={navVariants}
      key={location.pathname}
    >
      {/* Mobile Navbar */}
      <div className="lg:hidden  flex justify-between items-center py-3 sm:py-4">
        <motion.h1
          className="text-xl sm:text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
        >
          <Link to="/">
            {t.brand.split(" ")[0]}{" "}
            <span className="text-orange-500">{t.brand.split(" ")[1]}</span>
          </Link>
        </motion.h1>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <motion.button
              onClick={toggleLangDropdown}
              className="bg-white text-gray-800 flex items-center gap-1 px-2 py-1 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              variants={langButtonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <span className="text-xs sm:text-sm font-medium">
                {language === "en" ? "EN" : "FR"}
              </span>
              <motion.svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isLangDropdownOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div
                  className="absolute top-9 sm:top-10 right-0 w-28 sm:w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-[99]"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`w-full text-left px-3 py-2 text-xs sm:text-sm font-medium ${language === "en" ? "bg-orange-100 text-orange-600" : "text-gray-800 hover:bg-gray-100"}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange("fr")}
                    className={`w-full text-left px-3 py-2 text-xs sm:text-sm font-medium ${language === "fr" ? "bg-orange-100 text-orange-600" : "text-gray-800 hover:bg-gray-100"}`}
                  >
                    Français
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            onClick={toggleMenu}
            className="text-xl md:mr-2 md:ml-2  sm:text-2xl"
            whileHover={{ rotate: 90, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ☰
          </motion.button>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:hidden lg:flex justify-between items-center py-4">
        <motion.h1
          className="text-xl md:text-2xl lg:text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
        >
          <Link to="/">
            {t.brand.split(" ")[0]}{" "}
            <span className="text-orange-500">{t.brand.split(" ")[1]}</span>
          </Link>
        </motion.h1>
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          <motion.ul
            className="flex gap-3 md:gap-4 lg:gap-6 xl:gap-8 text-sm md:text-base lg:text-[16px] font-normal cursor-pointer"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {navLinks.map((link) => (
              <motion.li
                key={link.to}
                variants={linkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className={location.pathname === link.to ? "text-orange-500" : "text-gray-800"}
              >
                <Link to={link.to}>{link.label}</Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4 xl:gap-5">
         <Link to="/login">
         <button className="text-orange-500 text-sm md:text-base lg:text-[16px] mr-6">
            {t.logIn}
          </button>
         </Link>
          <Link to="/signup">
          <motion.button
            className="bg-[#FF8126] text-white px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-3 rounded-lg shadow-xl min-w-[100px] md:min-w-[113px] lg:min-w-[130px] flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.3)",
              borderBottom: "3px solid rgba(0, 0, 0, 0.2)",
              position: "relative",
            }}
          >
            {t.signUp}
          </motion.button>
          </Link>
          <div className="relative">
            <motion.button
              onClick={toggleLangDropdown}
              className="bg-white text-gray-800 flex items-center gap-1 px-2 py-1 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              variants={langButtonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <span className="text-xs md:text-sm lg:text-base font-medium">
                {language === "en" ? "EN" : "FR"}
              </span>
              <motion.svg
                className="w-3 h-3 md:w-4 md:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isLangDropdownOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div
                  className="absolute top-9 md:top-10 right-0 w-28 md:w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-[99]"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`w-full text-left px-3 py-2 text-xs md:text-sm font-medium ${language === "en" ? "bg-orange-100 text-orange-600" : "text-gray-800 hover:bg-gray-100"}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange("fr")}
                    className={`w-full text-left px-3 py-2 text-xs md:text-sm font-medium ${language === "fr" ? "bg-orange-100 text-orange-600" : "text-gray-800 hover:bg-gray-100"}`}
                  >
                    Français
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed flex flex-col  gap-6 sm:gap-8 rounded-r-[15px] items-start top-0 left-0 h-full w-[80%] sm:w-[370px] max-w-[380px] bg-white border border-gray-300 shadow-2xl lg:hidden z-50"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="relative w-full" variants={sidebarItemVariants}>
              <h1 className="text-xl sm:text-2xl font-bold pl-15 pt-10 sm:p-10 mt-[2em] sm:mt-[3em]">
                <Link to="/" onClick={toggleMenu}>
                  {t.brand.split(" ")[0]}{" "}
                  <span className="text-orange-500">{t.brand.split(" ")[1]}</span>
                </Link>
              </h1>
              <motion.button
                onClick={toggleMenu}
                className="absolute top-0 right-0 text-xl sm:text-2xl p-3 sm:p-4"
                whileHover={{ rotate: 180, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ✕
              </motion.button>
            </motion.div>
            <div className="pl-15 pt-10 sm:p-10">
              <motion.ul
                className="flex flex-col  font-normal text-base sm:text-lg gap-6 sm:gap-10"
                variants={sidebarItemVariants}
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.to}
                    variants={sidebarItemVariants}
                    whileHover="hover"
                    className={location.pathname === link.to ? "text-orange-500" : "text-gray-800"}
                  >
                    <Link to={link.to} onClick={toggleMenu}>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                className="flex mt-15 sm:mt-10 items-center gap-6 sm:gap-10 w-full"
                variants={sidebarItemVariants}
              >
                <Link to="/login">
                <motion.button
                  className="text-orange-500 text-base sm:text-lg"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  {t.logIn}
                </motion.button>
                </Link>
                <Link to="/signup">
                <motion.button
                  className="bg-orange-500 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl min-w-[100px] sm:min-w-[113px]"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  style={{
                    borderTop: "1px solid rgba(255, 255, 255, 0.3)",
                    borderBottom: "3px solid rgba(0, 0, 0, 0.2)",
                    position: "relative",
                  }}
                >
                  {t.signUp}
                </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-300 bg-opacity-50 md:hidden z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={toggleMenu}
        />
      )}
    </motion.div>
  );
};

export default Navbar;