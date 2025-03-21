// src/components/Hero.jsx
import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import useMarketStore from "../../store/marketStore";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);

  const {
    filters: { location, price, size },
    setLocation,
    setPriceRange,
    setSizeRange,
    fetchMarkets,
  } = useMarketStore();

  // Space size dropdown options
  const sizeOptions = [
    { value: "10-100", label: "10 - 100 sq. ft" },
    { value: "100-500", label: "100 - 500 sq. ft" },
    { value: "500-1000", label: "500 - 1000 sq. ft" },
  ];

  // Animation variants (unchanged)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    initial: {
      scale: 1,
      y: 0,
      boxShadow: "0px 7px 20px rgba(0, 0, 0, 0.25)",
    },
    hover: {
      scale: 1.03,
      y: 0,
      boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.15, ease: "easeOut" },
    },
    tap: {
      scale: 0.97,
      y: 4,
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.1, ease: "easeIn" },
    },
  };

  // Handler for size dropdown
  const handleSizeSelect = (value) => {
    setSizeRange(value);
    setIsSizeDropdownOpen(false);
  };

  // Search handler
  const handleSearch = () => {
    fetchMarkets({ location, price, size }); // Fetch markets with filters
    navigate("/find-space"); // Navigate to listing page
  };

  return (
    <div className="w-full  overflow-x-hidden relative">
      <motion.div
        className="min-h-[50vh] md:min-h-[600px] flex flex-col md:flex-row justify-between items-center py-10 md:py-0 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 max-w-[1326px] mx-auto transition-all duration-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Left Section: Text and Inputs */}
        <div className="w-full md:w-2/3 lg:w-[70%] max-w-[945px]">
          <motion.h1
            className="font-bold text-[28px] sm:text-[34px] md:text-[30px] lg:text-[55px] leading-tight"
            variants={textVariants}
          >
            {t.heroTitlePart1}
            <motion.span
              className={`text-[#FF8126] inline-block ${language === "en" ? "ml-2 md:mr-12 lg:mr-[50px]" : "ml-1 md:mr-1 lg:mr-0"}`}
              variants={textVariants}
            >
              {t.heroTitlePart2}
            </motion.span>
            <span className="block">{t.heroTitlePart3}</span>
          </motion.h1>

          <motion.p
            className="text-[14px] leading-[30px] sm:text-[15px] md:text-[16px] text-gray-400 mt-3 md:mt-4 max-w-[90%] md:max-w-[550px] lg:max-w-[650px]"
            variants={textVariants}
          >
            {t.heroDescription}
          </motion.p>

          {/* Input and Button Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-2 mt-6 md:mt-7 w-full md:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] md:rounded-[26px] md:p-3">
            {/* Location Input */}
            <motion.div
              className="relative rounded-[14px] border-gray-400 border-[1px] px-3 py-2 w-full"
              variants={inputVariants}
              whileHover="hover"
            >
              <label className="font-medium text-[16px] sm:text-[17px] md:text-[7px] lg:text-[13px] font-sans block">
                {t.location}
              </label>
              <input
                type="text"
                placeholder={t.locationPlaceholder}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-gray-500 md:placeholder:text-[10px] text-[14px] font-sans bg-transparent border-none outline-none truncate"
              />
            </motion.div>

            {/* Price Range Input */}
            <motion.div
              className="relative rounded-[14px] border-gray-400 border-[1px] px-3 py-2 w-full"
              variants={inputVariants}
              whileHover="hover"
            >
              <label className="font-medium text-[16px] sm:text-[17px] md:text-[7px] lg:text-[13px] font-sans block">
                {t.priceRange}
              </label>
              <input
                type="text"
                placeholder={t.priceRangePlaceholder}
                value={price}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full text-gray-500 md:placeholder:text-[10px] text-[14px] font-sans bg-transparent border-none outline-none truncate"
              />
            </motion.div>

            {/* Space Size Dropdown */}
            <motion.div
              className="relative rounded-[14px] border-gray-400 border-[1px] px-3 py-2 w-full flex justify-between items-center gap-2"
              variants={inputVariants}
              whileHover="hover"
            >
              <div className="w-full">
                <label className="font-medium text-[16px] sm:text-[17px] md:text-[7px] lg:text-[13px] font-sans block">
                  {t.spaceSize}
                </label>
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
                >
                  <span className="text-gray-500 md:placeholder:text-[10px] text-[14px] font-sans truncate">
                    {size ? sizeOptions.find(opt => opt.value === size)?.label : t.spaceSizePlaceholder}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
                {isSizeDropdownOpen && (
                  <div className="absolute z-20 w-full  mt-2 bg-white rounded-lg shadow-lg border border-gray-200 left-0 top-full">
                    {sizeOptions.map((option) => (
                      <div
                        key={option.value}
                        className="px-3 py-2 text-gray-700 hover:bg-[#FF8126] hover:text-white cursor-pointer transition-colors duration-150 text-[14px]"
                        onClick={() => handleSizeSelect(option.value)}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Search Button */}
            <motion.div variants={inputVariants}>
              <motion.button
                className="bg-[#FF8126] text-white px-4 py-3 md:py-[14px] rounded-xl shadow-2xl w-full md:w-[90px] lg:w-[110px] flex items-center justify-center"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={handleSearch}
                style={{
                  borderTop: "0px solid rgba(255, 255, 255, 0.3)",
                  borderBottom: "5px solid rgba(0, 0, 0, 0.2)",
                  position: "relative",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              >
                {t.search}
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Right Section: Image */}
        <motion.div
          className="w-full md:w-1/3 lg:w-[387px] mt-8 md:mt-0 flex justify-center"
          variants={imageVariants}
        >
          <motion.img
            src="/hero11.svg"
            alt="Hero"
            className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[390px] lg:w-[381px] lg:h-[381px]"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;