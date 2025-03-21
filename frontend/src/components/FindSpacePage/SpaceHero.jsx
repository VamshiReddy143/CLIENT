// src/components/FindSpacePage/SpaceHero.jsx
import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import useMarketStore from "../../store/marketStore";

const SpaceHero = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  
  const {
    filters: { location, price, size },
    setLocation,
    setPriceRange,
    setSizeRange,
    fetchMarkets,
  } = useMarketStore();

  const sizeOptions = [
    { value: "10-100", label: "10 - 100" },
    { value: "100-500", label: "100 - 500" },
    { value: "500-1000", label: "500 - 1000" },
  ];

  // Animation variants
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

  const handleSizeSelect = (value) => {
    setSizeRange(value);
    setIsSizeDropdownOpen(false);
  };

  const handleSearch = () => {
    fetchMarkets({ location, price, size });
    // Scroll to SpaceFilter section
    const filterSection = document.getElementById('filtercard');
    if (filterSection) {
      filterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[url('/spacebg.png')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-white opacity-80 z-10"></div>

      <motion.div
        className="relative z-20 flex flex-col items-center justify-center lg:min-h-screen transition-all duration-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h1
          className="z-30 md:w-[776px] w-[375px] text-[38px] leading-[48px] font-700 md:text-[57px] text-center font-bold md:leading-[79px]"
          variants={textVariants}
        >
          <span className="block">{t.spacepageherotitle1}</span>
          {t.spacepageherotitle2}
        </motion.h1>

        <div className="flex flex-col bg-white px-5 md:flex-row md:items-center md:justify-between gap-4 md:gap-2 mt-6 md:mt-7 w-full md:w-[700px] md:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] md:rounded-[26px] md:p-3">
          <motion.div
            className="relative rounded-[14px] border-gray-400 border-[1px] px-3 py-2 w-full"
            variants={inputVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <label className="font-medium text-[16px] sm:text-[17px] md:text-[18px] lg:text-[14px] font-sans block">
              {t.location}
            </label>
            <input
              type="text"
              placeholder={t.locationPlaceholder}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-gray-500 text-[14px] font-sans bg-transparent border-none outline-none truncate"
            />
          </motion.div>

          <motion.div
            className="relative rounded-[14px] border-gray-400 border-[1px] px-3 py-2 w-full"
            variants={inputVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <label className="font-medium text-[16px] sm:text-[17px] md:text-[18px] lg:text-[14px] font-sans block">
              {t.priceRange}
            </label>
            <input
              type="text"
              placeholder={t.priceRangePlaceholder}
              value={price}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full text-gray-500 text-[14px] font-sans bg-transparent border-none outline-none truncate"
            />
          </motion.div>

          <motion.div
            className="relative rounded-[14px] border-gray-400 border-[1px] px-3 py-2 w-full"
            variants={inputVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <label className="font-medium text-[16px] sm:text-[17px] md:text-[18px] lg:text-[14px] font-sans block">
              {t.spaceSize}
            </label>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
            >
              <span className="text-gray-500 text-[14px] font-sans truncate">
                {size || t.spaceSizePlaceholder}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            {isSizeDropdownOpen && (
              <div className="absolute z-20 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 left-0">
                {sizeOptions.map((option) => (
                  <div
                    key={option.value}
                    className="px-3 py-2 text-gray-700 hover:bg-[#FF8126] hover:text-white cursor-pointer transition-colors duration-150 text-[14px]"
                    onClick={() => handleSizeSelect(option.label)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            variants={inputVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-[#FF8126] text-white px-4 py-3 md:py-[18px] rounded-xl shadow-2xl w-full md:w-[110px] lg:w-[110px] flex items-center justify-center"
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
      </motion.div>
    </div>
  );
};

export default SpaceHero;