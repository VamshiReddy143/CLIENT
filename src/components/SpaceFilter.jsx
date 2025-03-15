import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

// Reusable Components
const CheckboxItem = ({ label, count }) => (
  <div className="flex justify-between items-center mb-3 px-4">
    <div className="flex items-center gap-2">
      <input type="checkbox" className="accent-[#FF8126] w-4 h-4" />
      <p className="text-gray-500 text-[10px] sm:text-[12px] md:text-[14px] truncate flex-1">{label}</p>
    </div>
    {count && <p className="text-gray-500 text-[10px] sm:text-[12px] md:text-[14px] ml-2">{count}</p>}
  </div>
);

CheckboxItem.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.string,
};

CheckboxItem.defaultProps = {
  count: null,
};

const FilterSection = ({ title, children }) => (
  <div className="mb-6">
    <div className="px-4 sm:px-6">
      <h1 className="mt-6 mb-4 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-semibold leading-tight">{title}</h1>
      {children}
    </div>
    <div className="bg-gray-300 w-full h-[1px] mt-6" />
  </div>
);

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const ListingCard = ({ t }) => (

  // className="flex-row sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:shadow-lg rounded-xl w-[374px] md:w-full"
  <div className="p-3 md:p-0">
    <div className="flex sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:pr-4 rounded-xl w-[374px] md:w-full">
      <div className="relative sm:w-auto">
        <img
          src="/img1.jpg"
          className="w-[80px] sm:w-[93px] md:w-[172px] h-[90px] sm:h-[115px] md:h-[212px] object-cover rounded-md"
        />
        <img
          src="/heart1.svg"
          className="absolute hidden md:block top-1 sm:top-2 left-1 sm:left-2 w-5 sm:w-6 h-5 sm:h-6 cursor-pointer"
        />
      </div>

      <div className="flex-1">
        <div className="flex sm:flex-row sm:items-start items-center gap-2 sm:gap-4">
          <h1 className="w-[176px] sm:w-[60%] md:w-[300px] font-normal text-[12px] sm:text-[16px] md:text-[20px] leading-tight">
            {t.downtownshoppingcenter}
          </h1>
          <h1 className="text-[#FF8126] text-[10px] sm:text-[14px] md:text-[20px] font-normal leading-tight">
            {t.pricepermonth}
          </h1>
        </div>

        <div className="flex w-[270px] md:w-full sm:flex-row gap-3 sm:gap-4 mt-2">
          <div className="flex w-[210px] md:w-[123px] flex-col">
            <h1 className="text-[#FF8126] text-[10px] sm:text-[14px] md:text-[16px] font-bold leading-tight">
              {t.services}
            </h1>
            <div className="mt-2 md:mt-3">
              <p className="text-[10px] sm:text-[12px] md:text-[13px] leading-tight">
                ✓<span className="ml-1">{t.fullyfurnished}</span>
              </p>
              <p className="text-[10px] sm:text-[12px] md:text-[13px] leading-tight">
                ✓<span className="ml-1">{t.threesqft}</span>
              </p>
              <p className="text-[10px] sm:text-[12px] md:text-[13px] leading-tight">
                ✓<span className="ml-1">{t.nearmetro}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <img src="/phone2.svg" alt="phone" className="h-2 sm:h-3 w-2 sm:w-3" />
              <p className="text-[#FF8126] font-mono text-[10px] sm:text-[12px] md:text-[13px] leading-tight">
                +43 1 234 5678
              </p>
            </div>
            <div className="flex items-start gap-2 mt-2 md:mt-4">
              <img src="/loc.svg" alt="location" className="h-2 sm:h-3 w-2 sm:w-3 mt-1" />
              <p className="text-[10px] sm:text-[12px] md:text-[13px] leading-tight flex-1">
                {t.locationdetails}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex  hidden flex-row sm:flex-col items-center gap-2 w-full sm:w-auto mt-3 sm:mt-0">
        <button className="bg-[#FF8126] w-full sm:w-[140px] md:w-[159px] h-10 md:h-12 rounded-lg text-white text-sm md:text-base">
          {t.viewlisting}
        </button>
        <button className="border-[1px] border-[#FF8126] w-full sm:w-[140px] md:w-[159px] h-10 md:h-12 rounded-lg text-sm md:text-base">
          {t.sendmessage}
        </button>
      </div>
    </div>

    <div className="flex md:hidden w-[373px] flex-row sm:flex-col items-center gap-2  sm:w-auto mt-3 sm:mt-0">
      <button className="bg-[#FF8126] w-[180px] sm:w-[140px] md:w-[159px] h-10 md:h-12 rounded-lg text-white text-sm md:text-base">
        {t.viewlisting}
      </button>
      <button className="border-[1px] border-[#FF8126] w-[180px] sm:w-[140px] md:w-[159px] h-10 md:h-12 rounded-lg text-sm md:text-base">
        {t.sendmessage}
      </button>
    </div>
  </div>
);

ListingCard.propTypes = {
  t: PropTypes.object.isRequired,
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
};

const SpaceFilter = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const contentRef = useRef(null);
  const [sidebarHeight, setSidebarHeight] = useState("auto");
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (contentRef.current) {
      setSidebarHeight(`${contentRef.current.offsetHeight}px`);
    }
    const handleResize = () => {
      if (contentRef.current) {
        setSidebarHeight(`${contentRef.current.offsetHeight}px`);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const FILTER_SECTIONS = {
    spaceTypes: [
      { label: t.retailspaces, count: "20+" },
      { label: t.foodcourtspaces, count: "15+" },
      { label: t.kiosk, count: "25+" },
      { label: t.storagewarehouse, count: "15+" },
      { label: t.eventspace, count: "25+" },
    ],
    spaceSizes: [t.size100500, t.size500700, t.size700800, t.size800900, t.size9001000],
    locations: [t.cairo, t.algiers, t.casablanca, t.tunis, t.tripoli],
  };

  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative w-full max-w-[1440px] mx-auto">
      {/* Sidebar - Desktop */}
      <div
        className="hidden md:block w-full md:w-[300px] lg:w-[357px] border-r border-gray-300 relative"
        style={{ height: sidebarHeight }}
      >
        <div className="p-4 sm:p-6 lg:p-8 sticky top-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[40px] font-normal leading-tight">{t.filters}</h1>
            <p className="text-[10px] sm:text-[12px] md:text-[14px] cursor-pointer">{t.resetall}</p>
          </div>

          <FilterSection title={t.typeofspace}>
            {FILTER_SECTIONS.spaceTypes.map((item, index) => (
              <CheckboxItem key={index} label={item.label} count={item.count} />
            ))}
          </FilterSection>

          <FilterSection title={t.price}>
            <div className="flex justify-between mb-2">
              <h1 className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-semibold">{t.price}</h1>
              <div className="w-5 sm:w-6 h-5 sm:h-6 text-[#FF8126]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16.9997 14.8301C16.8123 15.0163 16.5589 15.1208 16.2947 15.1208C16.0305 15.1208 15.7771 15.0163 15.5897 14.8301L11.9997 11.2901L8.4597 14.8301C8.27234 15.0163 8.01889 15.1208 7.7547 15.1208C7.49052 15.1208 7.23707 15.0163 7.0497 14.8301C6.95598 14.7371 6.88158 14.6265 6.83081 14.5046C6.78004 14.3828 6.75391 14.2521 6.75391 14.1201C6.75391 13.988 6.78004 13.8573 6.83081 13.7355C6.88158 13.6136 6.95598 13.503 7.0497 13.4101L11.2897 9.17006C11.3827 9.07633 11.4933 9.00194 11.6151 8.95117C11.737 8.9004 11.8677 8.87426 11.9997 8.87426C12.1317 8.87426 12.2624 8.9004 12.3843 8.95117C12.5061 9.00194 12.6167 9.07633 12.7097 9.17006L16.9997 13.4101C17.0934 13.503 17.1678 13.6136 17.2186 13.7355C17.2694 13.8573 17.2955 13.988 17.2955 14.1201C17.2955 14.2521 17.2694 14.3828 17.2186 14.5046C17.1678 14.6265 17.0934 14.7371 16.9997 14.8301Z"
                    fill="#FF8126"
                  />
                </svg>
              </div>
            </div>
            <img src="/bar.png" alt={t.pricerangeslider} className="w-full" />
            <div className="flex justify-between mt-2">
              <p className="text-[10px] sm:text-[12px] md:text-[12px] lg:text-[12px] text-gray-500">{t.price175}</p>
              <p className="text-[10px] sm:text-[12px] md:text-[12px] lg:text-[12px] text-gray-500">{t.price3175}</p>
            </div>
          </FilterSection>

          <FilterSection title={t.spacesize}>
            {FILTER_SECTIONS.spaceSizes.map((size, index) => (
              <CheckboxItem key={index} label={size} />
            ))}
          </FilterSection>

          <FilterSection title={t.location}>
            {FILTER_SECTIONS.locations.map((location, index) => (
              <CheckboxItem key={index} label={location} />
            ))}
          </FilterSection>
        </div>
      </div>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            className="fixed top-0 z-[999999] left-0 w-[80%] max-w-[357px] h-screen bg-white border-r border-gray-300 overflow-y-auto"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-[20px] sm:text-[24px] md:text-[28px] font-normal leading-tight">{t.filters}</h1>
                <div className="flex items-center gap-4">
                  <p className="text-[10px] sm:text-[12px] md:text-[14px] cursor-pointer">{t.resetall}</p>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="w-6 h-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                </div>
              </div>

              <FilterSection title={t.typeofspace}>
                {FILTER_SECTIONS.spaceTypes.map((item, index) => (
                  <CheckboxItem key={index} label={item.label} count={item.count} />
                ))}
              </FilterSection>

              <FilterSection title={t.price}>
                <div className="flex justify-between mb-2">
                  <h1 className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-semibold">{t.price}</h1>
                  <div className="w-5 sm:w-6 h-5 sm:h-6 text-[#FF8126]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M16.9997 14.8301C16.8123 15.0163 16.5589 15.1208 16.2947 15.1208C16.0305 15.1208 15.7771 15.0163 15.5897 14.8301L11.9997 11.2901L8.4597 14.8301C8.27234 15.0163 8.01889 15.1208 7.7547 15.1208C7.49052 15.1208 7.23707 15.0163 7.0497 14.8301C6.95598 14.7371 6.88158 14.6265 6.83081 14.5046C6.78004 14.3828 6.75391 14.2521 6.75391 14.1201C6.75391 13.988 6.78004 13.8573 6.83081 13.7355C6.88158 13.6136 6.95598 13.503 7.0497 13.4101L11.2897 9.17006C11.3827 9.07633 11.4933 9.00194 11.6151 8.95117C11.737 8.9004 11.8677 8.87426 11.9997 8.87426C12.1317 8.87426 12.2624 8.9004 12.3843 8.95117C12.5061 9.00194 12.6167 9.07633 12.7097 9.17006L16.9997 13.4101C17.0934 13.503 17.1678 13.6136 17.2186 13.7355C17.2694 13.8573 17.2955 13.988 17.2955 14.1201C17.2955 14.2521 17.2694 14.3828 17.2186 14.5046C17.1678 14.6265 17.0934 14.7371 16.9997 14.8301Z"
                        fill="#FF8126"
                      />
                    </svg>
                  </div>
                </div>
                <img src="/bar.png" alt={t.pricerangeslider} className="w-full" />
                <div className="flex justify-between mt-2">
                  <p className="text-[10px] sm:text-[12px] md:text-[12px] lg:text-[12px] text-gray-500">{t.price175}</p>
                  <p className="text-[10px] sm:text-[12px] md:text-[12px] lg:text-[12px] text-gray-500">{t.price3175}</p>
                </div>
              </FilterSection>

              <FilterSection title={t.spacesize}>
                {FILTER_SECTIONS.spaceSizes.map((size, index) => (
                  <CheckboxItem key={index} label={size} />
                ))}
              </FilterSection>

              <FilterSection title={t.location}>
                {FILTER_SECTIONS.locations.map((location, index) => (
                  <CheckboxItem key={index} label={location} />
                ))}
              </FilterSection>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="w-full px-2  mt-4 md:mt-0 mb-5 md:mb-0 sm:p-6 md:p-8" ref={contentRef}>
        <div className="max-w-[870px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="hidden md:flex items-center gap-2">
              <h1 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[48px] font-semibold leading-tight">
                {t.searchresults}
              </h1>
              <div className="bg-[#FF8126] h-[1.5px] sm:h-[2px] w-10 sm:w-12 md:w-16 mt-2 sm:mt-3 md:mt-4" />
            </div>

            <button
              className="flex md:hidden items-center gap-2"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <img src="/vis.svg" alt={t.visualizer} className="h-3 sm:h-4 w-4 sm:w-4" />
              <h1 className="text-[12px]  sm:text-[16px] md:text-[18px] font-semibold leading-tight">
                {t.filters}
              </h1>
            </button>

            <div className="flex items-center gap-2">
              <p className="text-[12px] sm:text-[16px] md:text-[20px] font-normal text-gray-600 leading-tight">
                {t.sortby}
              </p>
              <img src="/sort.svg" alt={t.sort} className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
          </div>

          <p className="text-gray-500 hidden md:block text-[12px] sm:text-[14px] md:text-[16px] leading-tight mb-6">
            {t.exploretext}
          </p>

          <div className="space-y-6">
            {Array(7)
              .fill(null)
              .map((_, index) => (
                <ListingCard key={index} t={t} />
              ))}
          </div>
          <div className="flex flex-col items-center mt-10">
            <motion.button
              className="bg-[#FF8126] text-white px-3 sm:px-4 md:px-5 py-2 md:py-2 lg:py-3 rounded-lg shadow-xl min-w-[100px] md:min-w-[113px] lg:min-w-[130px] flex items-center justify-center"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.3)",
                position: "relative",
              }}
            >
              Load More
              <img src="/arrow.svg" alt="arrowimg" className="ml-3 w-4 sm:w-5 h-4 sm:h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-40 md:hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpaceFilter;