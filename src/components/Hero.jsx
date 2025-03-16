import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Default styles
import "../customDatePicker.css"; // Custom styles

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [showCalendar, setShowCalendar] = useState(false); // State to toggle calendar
  const [dateRange, setDateRange] = useState([null, null]); // State for start and end dates
  const [startDate, endDate] = dateRange;

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

  const handleDateSelect = (dates) => {
    const [start, end] = dates;
    setDateRange([start, end]);
    // Removed: if (end) setShowCalendar(false);
    // The calendar will now only close when clicking outside
  };

  // Function to determine custom day classes based on range (inside component)
  const getDayClassName = (date) => {
    if (!startDate || !endDate) return "";
    if (date >= startDate && date <= endDate) {
      if (date.getTime() === startDate.getTime() || date.getTime() === endDate.getTime()) {
        return "range-end"; // Full orange for start and end
      } else {
        return "range-middle"; // Light orange for middle days
      }
    }
    return "";
  };

  return (
    <div className="w-full overflow-x-hidden relative">
      <motion.div
        className={`min-h-[50vh] md:min-h-[500px] flex flex-col md:flex-row justify-between items-center py-10 md:py-0 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 max-w-[1326px] mx-auto transition-all duration-300 ${showCalendar ? "backdrop-blur-sm" : ""}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Left Section: Text and Inputs */}
        <div className="w-full md:w-2/3 lg:w-[70%] max-w-[945px]">
          <motion.h1
            className="font-bold text-[28px] sm:text-[34px] md:text-[40px] lg:text-[55px] leading-tight"
            variants={textVariants}
          >
            {t.heroTitlePart1}
            <motion.span
              className={`text-[#FF8126] inline-block ${language === "en" ? "ml-2 md:mr-12 lg:mr-[50px]" : "ml-1 md:mr-1  lg:mr-0"}`}
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
            {[
              { title: t.location, placeholder: t.locationPlaceholder, type: "text" },
              { title: t.priceRange, placeholder: t.priceRangePlaceholder, type: "text" },
              { title: t.spaceSize, placeholder: t.spaceSizePlaceholder, type: "number", icon: "/cal.svg" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`relative rounded-[14px] border-gray-400 border-[1px] px-3 py-2 w-full md:w-[825px] lg:w-[825px] ${item.icon ? "flex justify-between items-center gap-2" : ""}`}
                variants={inputVariants}
                whileHover="hover"
              >
                <div className="w-full">
                  <label className="font-medium text-[16px] sm:text-[17px] md:text-[18px] font-sans block">
                    {item.title}
                  </label>
                  <input
                    type={item.type}
                    placeholder={item.placeholder}
                    className="w-full text-gray-500 text-[14px] font-sans bg-transparent border-none outline-none truncate"
                  />
                </div>
                {item.icon && (
                  <div className="relative">
                    <img
                      src={item.icon}
                      alt="Calendar"
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar
                    />
                  </div>
                )}
              </motion.div>
            ))}
            <motion.div variants={inputVariants}>
              <motion.button
                className="bg-[#FF8126] text-white px-4 py-3 md:py-[18px] rounded-xl shadow-2xl w-full md:w-[110px] lg:w-[110px] flex items-center justify-center"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
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

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-xl p-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateSelect} // Update date range
              inline // Show calendar without input
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                  <button onClick={decreaseMonth} className="text-gray-600 hover:text-[#FF8126]">
                    {"<"}
                  </button>
                  <span className="text-lg font-semibold text-gray-800">
                    {date.toLocaleString("default", { month: "long", year: "numeric" })}
                  </span>
                  <button onClick={increaseMonth} className="text-gray-600 hover:text-[#FF8126]">
                    {">"}
                  </button>
                </div>
              )}
              dayClassName={(date) => getDayClassName(date)}
              onClickOutside={() => setShowCalendar(false)} // Calendar closes only on outside click
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;