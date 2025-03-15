import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { motion, AnimatePresence } from "framer-motion";

// 3D Button Variants (for View More button)
const buttonVariants3D = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25), 0px -2px 10px rgba(255, 255, 255, 0.2)",
    background: "linear-gradient(135deg, #FF8126, #F97316)",
  },
  hover: {
    scale: 1.05,
    y: -4,
    boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.35), 0px -3px 12px rgba(255, 255, 255, 0.3)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.95,
    y: 4,
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.15), 0px -1px 5px rgba(255, 255, 255, 0.1)",
    transition: { duration: 0.1, ease: "easeIn" },
  },
};

// Simple Hover Variants (for left buttons)
const buttonVariantsHover = {
  initial: {
    backgroundColor: "transparent",
    color: "#FF8126",
  },
  hover: {
    backgroundColor: "#FF8126",
    color: "#FFFFFF",
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

// Card Variants for Entry Animation
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Listing = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="w-full max-w-[1440px] mx-auto min-h-screen py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 px-3 sm:px-4 md:px-6 lg:px-10 xl:px-12 mb-2">
      {/* Header Section with Fade-In */}
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="font-bold text-2xl sm:text-[28px] md:text-[32px] lg:text-[40px] xl:text-[57px] text-gray-800 leading-tight">
          {t.listingTitle1}{" "}
          <span className="md:inline block text-orange-500">{t.listingTitle2}</span>
        </h1>
        <p className="font-normal text-xs sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[18px] text-gray-500 mt-1 sm:mt-2 md:mt-3 max-w-[90%] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[600px] xl:max-w-[600px]">
          {t.listingdes1} <span className="">{t.listingdes2}</span>
        </p>
      </motion.div>

      {/* Listings Section */}
      <AnimatePresence>
        {[
          { img: "/dtshopping.jpg", title1: t.listingdowntownTitle1, title2: t.listingdowntownTitle2, price: "$500" },
          { img: "/fc.jpg", title1: "Food Court Space,Los", title2: "Angeles", price: "$800" },
          { img: "/brs.jpg", title1: "Boutique Retail Space,", title2: "Chicago", price: "$600" },
        ].map((listing, index) => (
          <React.Fragment key={index}>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-10"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
            >
              {/* Left Section: Image + Text */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-6 lg:gap-7 w-full sm:w-[600px]  sm:p-5 md:p-5 lg:p-5 xl:p-5">
                <motion.img
                  src={listing.img}
                  alt="listing"
                  className="w-[100px] mr-1 md:mr-0 h-[140px] sm:w-[120px] sm:h-[165px] md:w-[150px] md:h-[180px] lg:w-[160px] lg:h-[220px] xl:w-[160px] xl:h-[220px] rounded-lg object-cover shadow-md"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                />
                <div className="flex flex-col gap-1 sm:gap-2 md:gap-4 lg:gap-7 xl:gap-7 w-full">
                  <h1 className="font-normal text-[13px] sm:text-[15px] md:text-[18px] lg:text-[25.8px] xl:text-[25.8px] max-w-[150px] sm:max-w-[200px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[300px] text-gray-800">
                    {listing.title1} <span className="block">{listing.title2}</span>
                  </h1>
                  <h4 className="font-bold text-[16px] sm:text-[20px] md:text-[24px] lg:text-[30.8px] xl:text-[30.8px] text-orange-500">
                    {listing.price}/{t.listingMonth}
                  </h4>

                  {/* Mobile Icons */}
                  <div className="flex flex-col gap-1 sm:gap-2 md:hidden">
                    {["listinghome", "listingplace", "listinglocation"].map((key, i) => (
                      <motion.div
                        key={i}
                        className="flex gap-2 sm:gap-3 items-center"
                        whileHover={{ x: 5 }}
                      >
                        <img src={`/listing${i + 1}.svg`} alt={key} className="w-4 h-4 sm:w-5 sm:h-5" />
                        <p className="text-orange-500 text-[10px] sm:text-xs md:text-sm">{t[key]}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex pr-4 md:hidden items-center sm:items-end justify-center sm:justify-end">
                  <motion.button
                    className="absolute border-orange-500 rotate-[270deg] w-[120px] h-[29px] sm:w-[150px] sm:h-[28px] md:w-[150px] md:h-[32px] rounded-lg border-2 font-medium"
                    variants={buttonVariantsHover}
                    initial="initial"
                    whileHover="hover"
                    whileTap="hover"
                  >
                    {t.listingbutton}
                  </motion.button>
                </div>
              </div>

              {/* Desktop Icons */}
              <div className="hidden md:flex w-full sm:w-auto md:w-[400px] lg:w-[555px] xl:w-[555px] items-center gap-2 lg:gap-3 xl:gap-5">
                {["listinghome", "listingplace", "listinglocation"].map((key, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-1 lg:gap-2 xl:gap-3 items-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img src={`/listing${i + 1}.svg`} alt={key} className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-6 xl:h-6" />
                    <p className="text-orange-500 text-[10px] md:text-xs lg:text-sm xl:text-sm">{t[key]}</p>
                  </motion.div>
                ))}
              </div>

              {/* Normal Listing Button */}
              <div className="md:flex hidden items-center sm:items-end justify-center sm:justify-end">
                <motion.button
                  className="border-orange-500 rotate-[270deg] w-[120px] h-[24px] md:w-[140px] md:h-[28px] lg:w-[150px] lg:h-[37px] xl:w-[134px] xl:h-[42px] rounded-lg md:rounded-xl border-2 font-medium"
                  variants={buttonVariantsHover}
                  initial="initial"
                  whileHover="hover"
                  style={{ position: "relative", top: "50%", transform: "translateY(-50%)" }}
                >
                  {t.listingbutton}
                </motion.button>
              </div>
            </motion.div>

            {/* Divider after each listing */}
            {index < 2 && (
              <motion.div
                className="w-full h-[1px] bg-gray-400 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            )}
          </React.Fragment>
        ))}
      </AnimatePresence>

      {/* Divider */}
      <motion.div
        className="w-full h-[1px] bg-gray-400 mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* View More Button with 3D Effect */}
      <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-10">
        <motion.button
          className="bg-orange-500 text-white px-3 sm:px-4 md:px-5 lg:px-6 xl:px-6 py-1 sm:py-2 md:py-3 lg:py-3 xl:py-3 rounded-xl shadow-xl min-w-[120px] sm:min-w-[130px] md:min-w-[140px] lg:min-w-[150px] xl:min-w-[150px] flex items-center justify-center font-medium text-sm sm:text-base md:text-base lg:text-base xl:text-base"
          variants={buttonVariants3D}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.3)",
            borderBottom: "3px solid rgba(0, 0, 0, 0.2)",
            position: "relative",
          }}
        >
          View More
        </motion.button>
      </div>
    </div>
  );
};

export default Listing;