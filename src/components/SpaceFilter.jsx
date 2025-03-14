import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

// Reusable Components
const CheckboxItem = ({ label, count }) => (
  <div className="flex justify-between items-center mb-3">
    <div className="flex items-center gap-2">
      <input type="checkbox" className="accent-[#FF8126]" />
      <p className="w-[190px] text-gray-500 text-[12px]">{label}</p>
    </div>
    {count && <p className="text-gray-500 text-[12px]">{count}</p>}
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
  <div>
    <h1 className="mt-7 mb-4 text-[18px] font-semibold leading-[100%]">{title}</h1>
    {children}
    <div className="bg-gray-500 w-full h-[1px] mt-8" />
  </div>
);

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const ListingCard = ({ t }) => (
  <div className="flex items-center md:gap-4 gap-3 py-10 md:shadow-2xl md:p-2 rounded-[20px]">
    <div className="relative">
      <img
        src="/img1.jpg"
        className="md:w-[172px] md:h-[212px] h-[114.63px] w-[93px] object-cover rounded-[4px]"
      />
      <img
        src="/heart.png"
        className="absolute md:block hidden top-0 p-2 w-[44px] h-[44px] cursor-pointer"
      />
    </div>

    <div>
      <div className="flex gap-4">
        <h1 className="md:w-[300px] w-[176px] font-normal md:text-[20px] text-[18px] leading-[100%] md:mb-3">
          {t.downtownshoppingcenter}
        </h1>
        <h1 className="text-[#FF8126] md:w-[114px] w-[80px] md:text-[20px] text-[14px] font-normal md:leading-[100%] leading-[23px]">
          {t.pricepermonth}
        </h1>
      </div>

      <div className="flex gap-4 md:w-full w-full md:mt-0 mt-1">
        <div className="flex flex-col items-start">
          <h1 className="text-[#FF8126] md:text-[16px] text-[14px] font-bold leading-[100%]">
            {t.services}
          </h1>
          <div className="md:mt-4">
            <p>
              ✓<span className="ml-1 w-[103px]  font-normal text-[12px] leading-[100%]">
                {t.fullyfurnished}
              </span>
            </p>
            <p>
              ✓<span className="ml-1 w-[103px] font-normal text-[12px] leading-[100%]">
                {t.threesqft}
              </span>
            </p>
            <p>
              ✓<span className="ml-1 w-[103px] font-normal text-[12px] leading-[100%]">
                {t.nearmetro}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col text-start md:ml-10 ml-1">
          <div className="flex gap-3">
            <img src="/phone2.svg" alt="phone" className="h-[11.98px] w-[11.98px]" />
            <p className="text-[#FF8126] w-[92px] font-normal text-[12px] leading-[100%]">
              {t.phone}
            </p>
          </div>
          <div className="flex md:mt-7 mt-2">
            <img src="/loc.svg" alt="location" className="h-[11.67px] w-[11.67px]" />
            <p className="md:w-[279.6px] w-[130px] font-normal text-[12px] leading-[100%]">
              {t.locationdetails}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="hidden md:flex flex-col items-center gap-2">
      <button className="bg-[#FF8126] w-[159px] h-[48px] rounded-[9px] text-white cursor-pointer">
        {t.viewlisting}
      </button>
      <button className="border-[1px] border-[#FF8126] w-[159px] h-[48px] rounded-[9px] cursor-pointer">
        {t.sendmessage}
      </button>
    </div>
  </div>
);

ListingCard.propTypes = {
  t: PropTypes.object.isRequired,
};

const SpaceFilter = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const contentRef = useRef(null);
  const [sidebarHeight, setSidebarHeight] = useState('auto');
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (contentRef.current) {
      setSidebarHeight(`${contentRef.current.offsetHeight}px`);
    }
  }, []);

  const FILTER_SECTIONS = {
    spaceTypes: [
      { label: t.retailspaces, count: '20+' },
      { label: t.foodcourtspaces, count: '15+' },
      { label: t.kiosk, count: '25+' },
      { label: t.storagewarehouse, count: '15+' },
      { label: t.eventspace, count: '25+' },
    ],
    spaceSizes: [
      t.size100500,
      t.size500700,
      t.size700800,
      t.size800900,
      t.size9001000,
    ],
    locations: [
      t.cairo,
      t.algiers,
      t.casablanca,
      t.tunis,
      t.tripoli,
    ],
  };

  const sidebarVariants = {
    hidden: {
      x: '-100%',
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96],
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.5,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const filterSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar - Desktop (static, matches content height) */}
      <div
        className="hidden md:block w-[357px] rounded-r-[12px] border-[1px] border-gray-300 p-10"
        style={{ height: sidebarHeight }}
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="w-[155px] text-[40px] font-normal leading-[100%]">{t.filters}</h1>
          <p className="w-[56px] font-normal text-[14px] leading-[100%] cursor-pointer">{t.resetall}</p>
        </div>

        <FilterSection title={t.typeofspace}>
          {FILTER_SECTIONS.spaceTypes.map((item, index) => (
            <CheckboxItem key={index} label={item.label} count={item.count} />
          ))}
        </FilterSection>

        <FilterSection title={t.price}>
          <div className="flex justify-between mb-2">
            <h1 className="text-[18px] font-semibold w-[41px]">{t.price}</h1>
            <div className="w-[24px] h-[24px] text-[#FF8126]">
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
            <p className="w-[26px] text-[12px] text-gray-500">{t.price175}</p>
            <p className="w-[26px] text-[12px] text-gray-500">{t.price3175}</p>
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

      {/* Sidebar - Mobile (animated, defaults to closed) */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            className="w-[357px] h-screen border-[1px] border-gray-300 p-10 fixed top-0 left-0 bg-white z-50 overflow-y-auto"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
          >
            <div className="flex justify-between items-center mb-10">
              <h1 className="w-[155px] text-[28px] font-normal leading-[100%]">{t.filters}</h1>
              <div className="flex items-center gap-4">
                <p className="w-[56px] font-normal text-[14px] leading-[100%] cursor-pointer">{t.resetall}</p>
                <button
                  className="w-[24px] h-[24px] text-gray-600"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <motion.div variants={filterSectionVariants}>
              <FilterSection title={t.typeofspace}>
                {FILTER_SECTIONS.spaceTypes.map((item, index) => (
                  <CheckboxItem key={index} label={item.label} count={item.count} />
                ))}
              </FilterSection>
            </motion.div>

            <motion.div variants={filterSectionVariants}>
              <FilterSection title={t.price}>
                <div className="flex justify-between mb-2">
                  <h1 className="text-[18px] font-semibold w-[41px]">{t.price}</h1>
                  <div className="w-[24px] h-[24px] text-[#FF8126]">
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
                  <p className="w-[26px] text-[12px] text-gray-500">{t.price175}</p>
                  <p className="w-[26px] text-[12px] text-gray-500">{t.price3175}</p>
                </div>
              </FilterSection>
            </motion.div>

            <motion.div variants={filterSectionVariants}>
              <FilterSection title={t.spacesize}>
                {FILTER_SECTIONS.spaceSizes.map((size, index) => (
                  <CheckboxItem key={index} label={size} />
                ))}
              </FilterSection>
            </motion.div>

            <motion.div variants={filterSectionVariants}>
              <FilterSection title={t.location}>
                {FILTER_SECTIONS.locations.map((location, index) => (
                  <CheckboxItem key={index} label={location} />
                ))}
              </FilterSection>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="md:w-[870px] w-full" ref={contentRef}>
        <div className="p-5">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex items-center">
              <h1 className="flex items-end w-[328px] font-semibold text-[48px]">
                {t.searchresults}
              </h1>
              <div className="bg-[#FF8126] h-[2px] w-[64px] mt-5" />
            </div>

            <button
              className="flex md:hidden items-center gap-2"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <img src="/vis.svg" alt={t.visualizer} className="h-[17.58px] w-[18.5px]" />
              <h1 className="flex items-end w-[44px] font-semibold text-[18px] leading-[100%]">
                {t.filters}
              </h1>
            </button>

            <div className="flex gap-2">
              <p className="w-[72px] text-[20px] leading-[100%] font-normal text-gray-600">
                {t.sortby}
              </p>
              <img src="/sort.png" alt={t.sort} className="w-[24px] h-[24px]" />
            </div>
          </div>

          <p className="text-gray-500 md:block hidden w-[330px] font-normal text-[16px] leading-[100%] mt-4">
            {t.exploretext}
          </p>

          <div className="mt-8 space-y-4">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <React.Fragment key={index}>
                  <ListingCard t={t} />
                  <div className="flex md:hidden items-center gap-2">
                    <button className="bg-[#FF8126] w-[159px] h-[48px] rounded-[9px] text-white cursor-pointer">
                      {t.viewlisting}
                    </button>
                    <button className="border-[1px] border-[#FF8126] w-[159px] h-[48px] rounded-[9px] cursor-pointer">
                      {t.sendmessage}
                    </button>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
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