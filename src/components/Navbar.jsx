import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  const t = translations[language];


  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 0.8,
      },
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
  };

  return (
    <motion.div
      className="relative px-4 sm:px-6 md:px-10 xl:px-10"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center py-4">
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
        >
          {t.brand.split(" ")[0]} <span className="text-orange-500">{t.brand.split(" ")[1]}</span>
        </motion.h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <motion.button
              onClick={toggleLangDropdown}
              className="bg-white text-gray-800 flex items-center gap-1 px-2 py-1 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              variants={langButtonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <span className="text-sm font-medium">{language === "en" ? "EN" : "FR"}</span>
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
                  className="absolute top-10 right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-10"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`w-full text-left px-4 py-2 text-sm font-medium ${language === "en" ? "bg-orange-100 text-orange-600" : "text-gray-800 hover:bg-gray-100"}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange("fr")}
                    className={`w-full text-left px-4 py-2 text-sm font-medium ${language === "fr" ? "bg-orange-100 text-orange-600" : "text-gray-800 hover:bg-gray-100"}`}
                  >
                    Français
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            onClick={toggleMenu}
            className="text-2xl"
            whileHover={{ rotate: 90, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ☰
          </motion.button>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center py-4 max-w-10xl mx-auto">
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
        >
          <Link to="/">{t.brand.split(" ")[0]} <span className="text-orange-500">{t.brand.split(" ")[1]}</span></Link>
        </motion.h1>
        <div className="flex items-center gap-6 xl:gap-8">
          <motion.ul
            className="flex gap-4 xl:gap-6 text-base font-normal cursor-pointer"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.li variants={linkVariants} initial="initial" animate="animate" whileHover="hover">
              <Link to="/find-space">{t.findSpace}</Link>
            </motion.li>
            <motion.li variants={linkVariants} initial="initial" animate="animate" whileHover="hover">
              <Link to="/list-space">{t.listSpace}</Link>
            </motion.li>
            <motion.li variants={linkVariants} initial="initial" animate="animate" whileHover="hover">
              <Link to="/about">{t.aboutUs}</Link>
            </motion.li>
            <motion.li variants={linkVariants} initial="initial" animate="animate" whileHover="hover">
              <Link to="/contact">{t.contactUs}</Link>
            </motion.li>
          </motion.ul>
        </div>
        <div className="flex items-center gap-3 xl:gap-5">
          <motion.button
            className="text-orange-500 text-lg"
            variants={linkVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            {t.logIn}
          </motion.button>
          <motion.button
            className="bg-orange-500 text-white px-4 py-2 rounded-xl shadow-md min-w-[113px] cursor-pointer"
          >
            {t.signUp}
          </motion.button>
          <div className="relative">
            <motion.button
              onClick={toggleLangDropdown}
              className="bg-white text-gray-800 flex items-center gap-1 px-2 py-1 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              variants={langButtonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <span className="text-sm font-medium">{language === "en" ? "EN" : "FR"}</span>
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
                  className="absolute top-10 z-[99] right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-xl "
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`w-full text-left  px-4 py-2 text-sm font-medium ${language === "en" ? "bg-orange-100 text-orange-600" : "text-gray-800 hover:bg-gray-100"}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange("fr")}
                    className={`w-full text-left px-4 py-2 text-sm font-medium ${language === "fr" ? "bg-orange-100 text-orange-600" : "text-gray-800 hover:bg-gray-100"}`}
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
            className="fixed flex flex-col gap-8 rounded-r-[15px] items-start top-0 left-0 h-full w-[370px] max-w-[380px] bg-white border border-gray-300 shadow-2xl md:hidden z-50"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="relative w-full" variants={sidebarItemVariants}>
              <h1 className="text-2xl font-bold p-10 mt-[3em]">
                {t.brand.split(" ")[0]} <span className="text-orange-500">{t.brand.split(" ")[1]}</span>
              </h1>
              <motion.button
                onClick={toggleMenu}
                className="absolute top-0 right-0 text-2xl p-3"
                whileHover={{ rotate: 180, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ✕
              </motion.button>
            </motion.div>
            <div className="p-10">
              <motion.ul
                className="flex flex-col font-normal text-lg gap-10"
                variants={sidebarItemVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.li variants={sidebarItemVariants} whileHover={{ x: 10, color: "#f97316" }}>
                  <Link to="/find-space" onClick={toggleMenu}>{t.findSpace}</Link>
                </motion.li>
                <motion.li variants={sidebarItemVariants} whileHover={{ x: 10, color: "#f97316" }}>
                  <Link to="/list-space" onClick={toggleMenu}>{t.listSpace}</Link>
                </motion.li>
                <motion.li variants={sidebarItemVariants} whileHover={{ x: 10, color: "#f97316" }}>
                  <Link to="/about" onClick={toggleMenu}>{t.aboutUs}</Link>
                </motion.li>
                <motion.li variants={sidebarItemVariants} whileHover={{ x: 10, color: "#f97316" }}>
                  <Link to="/contact" onClick={toggleMenu}>{t.contactUs}</Link>
                </motion.li>
              </motion.ul>
              <motion.div
                className="flex mt-10 gap-10 w-full"
                variants={sidebarItemVariants}
              >
                <motion.button
                  className="text-orange-500 text-left text-lg"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  {t.logIn}
                </motion.button>
                <motion.button
                  className="bg-orange-500 text-white px-3 py-2 rounded-xl"
                >
                  {t.signUp}
                </motion.button>
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