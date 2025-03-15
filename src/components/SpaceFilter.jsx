import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

// Reusable Components
const CheckboxItem = ({ label, count }) => (
  <div className="flex justify-between items-center mb-[0.75rem] px-[1rem]">
    <div className="flex items-center gap-[0.5rem]">
      <input type="checkbox" className="accent-[#FF8126] w-[1rem] h-[1rem]" />
      <p className="text-gray-500 text-[0.625rem] sm:text-[0.75rem] md:text-[0.875rem] truncate flex-1">{label}</p>
    </div>
    {count && <p className="text-gray-500 text-[0.625rem] sm:text-[0.75rem] md:text-[0.875rem] ml-[0.5rem]">{count}</p>}
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
  <div className="mb-[1.5rem]">
    <div className="px-[1rem] sm:px-[1.5rem]">
      <h1 className="mt-[1.5rem] mb-[1rem] text-[0.75rem] sm:text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] font-semibold leading-tight">{title}</h1>
      {children}
    </div>
    <div className="bg-gray-300 w-full h-[0.0625rem] mt-[1.5rem]" />
  </div>
);

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const ListingCard = ({ t }) => (
  <div id="card" className="p-[0.75rem] md:shadow-lg md:rounded-xl md:p-0">
    <div className="flex sm:flex-row items-start sm:items-center gap-[0.75rem] sm:gap-[1rem] md:pr-[1rem] rounded-xl w-[23.375rem] md:w-full">
      <div id="image" className="relative sm:w-auto">
        <img
          src="/img1.jpg"
          className="w-[5rem] sm:w-[5.8125rem] md:w-[10.75rem] h-[5.625rem] sm:h-[7.1875rem] md:h-[13.25rem] object-cover rounded-md"
        />
        <img
          src="/heart1.svg"
          className="absolute hidden md:block top-[0.25rem] sm:top-[0.5rem] left-[0.25rem] sm:left-[0.5rem] w-[1.25rem] sm:w-[1.5rem] h-[1.25rem] sm:h-[1.5rem] cursor-pointer"
        />
      </div>

      <div className="flex-1">
        <div id="filterprice" className="flex sm:flex-row sm:items-start items-center gap-[0.5rem] sm:gap-[1rem]">
          <h1 id="title" className="w-[11rem] sm:w-[60%] md:w-[18.75rem] font-normal text-[0.75rem] sm:text-[1rem] md:text-[1.25rem] leading-tight">
            {t.downtownshoppingcenter}
          </h1>
          <h1 className="text-[#FF8126] text-[0.625rem] sm:text-[0.875rem] md:text-[1.25rem] font-normal leading-tight">
            {t.pricepermonth}
          </h1>
        </div>

        <div className="flex w-[16.875rem] md:w-full sm:flex-row gap-[0.75rem] sm:gap-[1rem] mt-[0.5rem]">
          <div className="flex w-[13.125rem] md:w-[7.6875rem] flex-col">
            <h1 className="text-[#FF8126] text-[0.625rem] sm:text-[0.875rem] md:text-[1rem] font-bold leading-tight">
              {t.services}
            </h1>
            <div className="mt-[0.5rem] md:mt-[0.75rem]">
              <p className="text-[0.625rem] sm:text-[0.75rem] md:text-[0.8125rem] leading-tight">
                ✓<span className="ml-[0.25rem]">{t.fullyfurnished}</span>
              </p>
              <p className="text-[0.625rem] sm:text-[0.75rem] md:text-[0.8125rem] leading-tight">
                ✓<span className="ml-[0.25rem]">{t.threesqft}</span>
              </p>
              <p className="text-[0.625rem] sm:text-[0.75rem] md:text-[0.8125rem] leading-tight">
                ✓<span className="ml-[0.25rem]">{t.nearmetro}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-[0.5rem]">
              <img src="/phone2.svg" alt="phone" className="h-[0.5rem] sm:h-[0.75rem] w-[0.5rem] sm:w-[0.75rem]" />
              <p className="text-[#FF8126] font-mono text-[0.625rem] sm:text-[0.75rem] md:text-[0.8125rem] leading-tight">
                +43 1 234 5678
              </p>
            </div>
            <div className="flex items-start gap-[0.5rem] mt-[0.5rem] md:mt-[1rem]">
              <img src="/loc.svg" alt="location" className="h-[0.5rem] sm:h-[0.75rem] w-[0.5rem] sm:w-[0.75rem] mt-[0.25rem]" />
              <p className="text-[0.625rem] sm:text-[0.75rem] md:text-[0.8125rem] leading-tight flex-1">
                {t.locationdetails}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex hidden flex-row sm:flex-col items-center gap-[0.5rem] w-full sm:w-auto mt-[0.75rem] sm:mt-0">
        <button className="bg-[#FF8126] w-full sm:w-[8.75rem] md:w-[9.9375rem] h-[2.5rem] md:h-[3rem] rounded-lg text-white text-[0.875rem] md:text-[1rem]">
          {t.viewlisting}
        </button>
        <button className="border-[0.0625rem] border-[#FF8126] w-full sm:w-[8.75rem] md:w-[9.9375rem] h-[2.5rem] md:h-[3rem] rounded-lg text-[0.875rem] md:text-[1rem]">
          {t.sendmessage}
        </button>
      </div>
    </div>

    <div id="mobile" className="flex md:hidden w-[23.3125rem] flex-row sm:flex-col items-center gap-[0.5rem] sm:w-auto mt-[0.75rem] sm:mt-0">
      <button id="btn1" className="bg-[#FF8126] w-[11.25rem] sm:w-[8.75rem] md:w-[9.9375rem] h-[2.5rem] md:h-[3rem] rounded-lg text-white text-[0.875rem] md:text-[1rem]">
        {t.viewlisting}
      </button>
      <button className="border-[0.0625rem] border-[#FF8126] w-[11.25rem] sm:w-[8.75rem] md:w-[9.9375rem] h-[2.5rem] md:h-[3rem] rounded-lg text-[0.875rem] md:text-[1rem]">
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
    boxShadow: "0rem 0.375rem 1.25rem rgba(0, 0, 0, 0.25), 0rem -0.125rem 0.5rem rgba(255, 255, 255, 0.2)",
  },
  hover: {
    scale: 1.03,
    y: -0.1875,
    boxShadow: "0rem 0.625rem 1.5625rem rgba(0, 0, 0, 0.3), 0rem -0.1875rem 0.625rem rgba(255, 255, 255, 0.25)",
    transition: { duration: 0.15, ease: "easeOut" },
  },
  tap: {
    scale: 0.97,
    y: 0.25,
    boxShadow: "0rem 0.125rem 0.625rem rgba(0, 0, 0, 0.15), 0rem -0.0625rem 0.25rem rgba(255, 255, 255, 0.1)",
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
      setSidebarHeight(`${contentRef.current.offsetHeight / 16}rem`);
    }
    const handleResize = () => {
      if (contentRef.current) {
        setSidebarHeight(`${contentRef.current.offsetHeight / 16}rem`);
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
    <div id="filtercard" className="min-h-[100vh] flex flex-col md:flex-row relative w-full max-w-[90rem] mx-auto">
      {/* Sidebar - Desktop */}
      <div
        className="hidden md:block w-full md:w-[18.75rem] lg:w-[22.3125rem] border-r border-gray-300 relative"
        style={{ height: sidebarHeight }}
      >
        <div className="p-[1rem] sm:p-[1.5rem] lg:p-[2rem] sticky top-0">
          <div className="flex justify-between items-center mb-[1.5rem]">
            <h1 className="text-[1.25rem] sm:text-[1.5rem] md:text-[1.75rem] lg:text-[2.5rem] font-normal leading-tight">{t.filters}</h1>
            <p className="text-[0.625rem] sm:text-[0.75rem] md:text-[0.875rem] cursor-pointer">{t.resetall}</p>
          </div>

          <FilterSection title={t.typeofspace}>
            {FILTER_SECTIONS.spaceTypes.map((item, index) => (
              <CheckboxItem key={index} label={item.label} count={item.count} />
            ))}
          </FilterSection>

          <FilterSection title={t.price}>
            <div className="flex justify-between mb-[0.5rem]">
              <h1 className="text-[0.75rem] sm:text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] font-semibold">{t.price}</h1>
              <div className="w-[1.25rem] sm:w-[1.5rem] h-[1.25rem] sm:h-[1.5rem] text-[#FF8126]">
                <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16.9997 14.8301C16.8123 15.0163 16.5589 15.1208 16.2947 15.1208C16.0305 15.1208 15.7771 15.0163 15.5897 14.8301L11.9997 11.2901L8.4597 14.8301C8.27234 15.0163 8.01889 15.1208 7.7547 15.1208C7.49052 15.1208 7.23707 15.0163 7.0497 14.8301C6.95598 14.7371 6.88158 14.6265 6.83081 14.5046C6.78004 14.3828 6.75391 14.2521 6.75391 14.1201C6.75391 13.988 6.78004 13.8573 6.83081 13.7355C6.88158 13.6136 6.95598 13.503 7.0497 13.4101L11.2897 9.17006C11.3827 9.07633 11.4933 9.00194 11.6151 8.95117C11.737 8.9004 11.8677 8.87426 11.9997 8.87426C12.1317 8.87426 12.2624 8.9004 12.3843 8.95117C12.5061 9.00194 12.6167 9.07633 12.7097 9.17006L16.9997 13.4101C17.0934 13.503 17.1678 13.6136 17.2186 13.7355C17.2694 13.8573 17.2955 13.988 17.2955 14.1201C17.2955 14.2521 17.2694 14.3828 17.2186 14.5046C17.1678 14.6265 17.0934 14.7371 16.9997 14.8301Z"
                    fill="#FF8126"
                  />
                </svg>
              </div>
            </div>
            <img src="/bar.png" alt={t.pricerangeslider} className="w-full" />
            <div className="flex justify-between mt-[0.5rem]">
              <p className="text-[0.625rem] sm:text-[0.75rem] md:text-[0.75rem] lg:text-[0.75rem] text-gray-500">{t.price175}</p>
              <p className="text-[0.625rem] sm:text-[0.75rem] md:text-[0.75rem] lg:text-[0.75rem] text-gray-500">{t.price3175}</p>
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
            className="fixed top-0 z-[999999] left-0 w-[80%] max-w-[22.3125rem] h-[100vh] bg-white border-r border-gray-300 overflow-y-auto"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
          >
            <div className="p-[1rem] sm:p-[1.5rem]">
              <div className="flex justify-between items-center mb-[1.5rem]">
                <h1 className="text-[1.25rem] sm:text-[1.5rem] md:text-[1.75rem] font-normal leading-tight">{t.filters}</h1>
                <div className="flex items-center gap-[1rem]">
                  <p className="text-[0.625rem] sm:text-[0.75rem] md:text-[0.875rem] cursor-pointer">{t.resetall}</p>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="w-[1.5rem] h-[1.5rem]">
                    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none">
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
                <div className="flex justify-between mb-[0.5rem]">
                  <h1 className="text-[0.75rem] sm:text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] font-semibold">{t.price}</h1>
                  <div className="w-[1.25rem] sm:w-[1.5rem] h-[1.25rem] sm:h-[1.5rem] text-[#FF8126]">
                    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M16.9997 14.8301C16.8123 15.0163 16.5589 15.1208 16.2947 15.1208C16.0305 15.1208 15.7771 15.0163 15.5897 14.8301L11.9997 11.2901L8.4597 14.8301C8.27234 15.0163 8.01889 15.1208 7.7547 15.1208C7.49052 15.1208 7.23707 15.0163 7.0497 14.8301C6.95598 14.7371 6.88158 14.6265 6.83081 14.5046C6.78004 14.3828 6.75391 14.2521 6.75391 14.1201C6.75391 13.988 6.78004 13.8573 6.83081 13.7355C6.88158 13.6136 6.95598 13.503 7.0497 13.4101L11.2897 9.17006C11.3827 9.07633 11.4933 9.00194 11.6151 8.95117C11.737 8.9004 11.8677 8.87426 11.9997 8.87426C12.1317 8.87426 12.2624 8.9004 12.3843 8.95117C12.5061 9.00194 12.6167 9.07633 12.7097 9.17006L16.9997 13.4101C17.0934 13.503 17.1678 13.6136 17.2186 13.7355C17.2694 13.8573 17.2955 13.988 17.2955 14.1201C17.2955 14.2521 17.2694 14.3828 17.2186 14.5046C17.1678 14.6265 17.0934 14.7371 16.9997 14.8301Z"
                        fill="#FF8126"
                      />
                    </svg>
                  </div>
                </div>
                <img src="/bar.png" alt={t.pricerangeslider} className="w-full" />
                <div className="flex justify-between mt-[0.5rem]">
                  <p className="text-[0.625rem] sm:text-[0.75rem] md:text-[0.75rem] lg:text-[0.75rem] text-gray-500">{t.price175}</p>
                  <p className="text-[0.625rem] sm:text-[0.75rem] md:text-[0.75rem] lg:text-[0.75rem] text-gray-500">{t.price3175}</p>
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
      <div className="w-full px-[0.5rem] mt-[1rem] md:mt-0 mb-[1.25rem] md:mb-0 sm:p-[1.5rem] md:p-[2rem]" ref={contentRef}>
        <div className="max-w-[54.375rem] mx-auto">
          <div className="flex justify-between items-center mb-[1.5rem]">
            <div className="hidden md:flex items-center gap-[0.5rem]">
              <h1 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[3rem] font-semibold leading-tight">
                {t.searchresults}
              </h1>
              <div className="bg-[#FF8126] h-[0.09375rem] sm:h-[0.125rem] w-[2.5rem] sm:w-[3rem] md:w-[4rem] mt-[0.5rem] sm:mt-[0.75rem] md:mt-[1rem]" />
            </div>

            <button
              className="flex md:hidden items-center gap-[0.5rem]"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <img src="/vis.svg" alt={t.visualizer} className="h-[0.75rem] sm:h-[1rem] w-[1rem] sm:w-[1rem]" />
              <h1 className="text-[0.75rem] sm:text-[1rem] md:text-[1.125rem] font-semibold leading-tight">
                {t.filters}
              </h1>
            </button>

            <div className="flex items-center gap-[0.5rem]">
              <p className="text-[0.75rem] sm:text-[1rem] md:text-[1.25rem] font-normal text-gray-600 leading-tight">
                {t.sortby}
              </p>
              <img src="/sort.svg" alt={t.sort} className="w-[1rem] sm:w-[1.25rem] h-[1rem] sm:h-[1.25rem]" />
            </div>
          </div>

          <p className="text-gray-500 hidden md:block text-[0.75rem] sm:text-[0.875rem] md:text-[1rem] leading-tight mb-[1.5rem]">
            {t.exploretext}
          </p>

          <div className="space-y-[1.5rem]">
            {Array(7)
              .fill(null)
              .map((_, index) => (
                <ListingCard key={index} t={t} />
              ))}
          </div>
          <div className="flex flex-col items-center mt-[2.5rem]">
            <motion.button
              className="bg-[#FF8126] text-white px-[0.75rem] sm:px-[1rem] md:px-[1.25rem] py-[0.5rem] md:py-[0.5rem] lg:py-[0.75rem] rounded-lg shadow-xl min-w-[6.25rem] md:min-w-[7.0625rem] lg:min-w-[8.125rem] flex items-center justify-center"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              style={{
                borderTop: "0.0625rem solid rgba(255, 255, 255, 0.3)",
                position: "relative",
              }}
            >
              Load More
              <img src="/arrow.svg" alt="arrowimg" className="ml-[0.75rem] w-[1rem] sm:w-[1.25rem] h-[1rem] sm:h-[1.25rem]" />
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