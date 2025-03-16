import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Constants
const IMAGES = [
  '/listingpageimage11.svg',
  '/listingpageimage33.svg',
  '/listingpageimage22.svg',
];

const HIGHLIGHTS = [
  "Fully Furnished",
  "300 sq. ft.",
  "Near Metro",
  "Prime Location",
  "High Foot Traffic",
  "Flexible Lease",
  "Business-Friendly",
  "Easy Booking",
  "24/7 Security",
];

// Animation Variants
const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
    zIndex: 0,
  }),
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Slider Component
const ImageSlider = ({ currentIndex, direction, goToPrevious, goToNext }) => {
  const getVisibleIndices = () => {
    const prevIndex = currentIndex === 0 ? IMAGES.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === IMAGES.length - 1 ? 0 : currentIndex + 1;
    return [prevIndex, currentIndex, nextIndex];
  };

  return (
    <div className="w-full shadow-sm rounded-xl mb-2">
      <div className="flex items-center justify-center bg-gray-100 min-h-[24.3125rem] py-[1rem] w-full">
        <div className="relative w-full h-[22.8125rem]">
          <div className="flex justify-center items-center overflow-hidden h-full w-full">
            <AnimatePresence initial={false} custom={direction}>
              {getVisibleIndices().map((index, position) => (
                <motion.div
                  key={index}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 200, damping: 25, mass: 0.5 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  className={`flex-shrink-0 px-[0.5rem] ${position === 0 ? 'w-full md:w-1/3 order-1' :
                    position === 1 ? 'w-full md:w-1/3 order-2 z-10' :
                    'w-full md:w-1/3 order-3'}`}
                >
                  <img
                    src={IMAGES[index]}
                    alt={`Slide ${index + 1}`}
                    className="w-full max-w-[28.75rem] h-[22.8125rem] rounded-[0.5rem] border-none mx-auto object-cover"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={goToPrevious}
            className="absolute z-[20] left-[0.5rem] md:left-[2.5rem] top-1/2 h-[2.875rem] w-[2.875rem] transform -translate-y-1/2 bg-[#9F9F9F] hover:bg-[#8A8A8A] text-white p-[0.5rem] rounded-[0.125rem] transition-colors duration-200"
          >
            {"<"}
          </motion.button>
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={goToNext}
            className="absolute z-[20] right-[0.5rem] md:right-[2.5rem] top-1/2 h-[2.875rem] w-[2.875rem] transform -translate-y-1/2 bg-[#FF8126] hover:bg-[#E67320] text-white p-[0.5rem] rounded-[0.125rem] transition-colors duration-200"
          >
            {">"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Highlights Component
const HighlightsSection = () => (
  <div className="w-full md:w-auto md:mt-0 lg:w-auto lg:mt-0 mt-[2em]">
    <motion.h2
      variants={textVariants}
      initial="hidden"
      animate="visible"
      className="font-bold md:hidden lg:flex text-[#FF8126] text-[1rem] leading-[100%] text-left md:text-left mb-[1em]"
    >
      Space Highlights:
    </motion.h2>

    {/* Desktop Version */}
    <div className="hidden lg:flex gap-[1.5rem] justify-center">
      {Array(3).fill().map((_, colIdx) => (
        <motion.div
          key={colIdx}
          className="flex flex-col"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: colIdx * 0.1 }}
        >
          {HIGHLIGHTS.slice(colIdx * 3, colIdx * 3 + 3).map((text, idx) => (
            <p key={idx}>
              ✓<span className="ml-[0.5rem] font-normal text-gray-500 text-[0.75rem] lg:leading-[120%]">
                {text}
              </span>
            </p>
          ))}
        </motion.div>
      ))}
    </div>

    {/* Tablet/Mobile Version */}
    <motion.div
      className="md:hidden lg:hidden flex-col gap-[1rem] items-center"
      variants={textVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-2 gap-x-[1rem] w-full max-w-[20rem]">
        {HIGHLIGHTS.map((text, idx) => (
          <p key={idx} className="flex items-center">
            ✓<span className="ml-[0.5rem] font-normal text-gray-500 text-[0.75rem] leading-[120%]">
              {text}
            </span>
          </p>
        ))}
      </div>
    </motion.div>
  </div>
);

// Property Info Component
const PropertyInfo = () => (
  <motion.div
    className="flex flex-col md:flex-row md:gap-[1rem] items-center w-full md:w-auto"
    variants={textVariants}
    initial="hidden"
    animate="visible"
  >
    <img
      src="/shoppingmall.svg"
      alt="shoppingmallimage"
      className="hidden md:block w-[7.25rem] h-[8rem] rounded-[0.25rem]"
    />
    <div className="flex flex-col gap-[0.8em] w-full max-w-[19.1rem]">
      <h2 className="text-[2rem] md:text-[1.25rem] font-normal leading-[100%]">
        Downtown Shopping Center
      </h2>
      <div className="flex gap-[0.5rem] items-center">
        <img src="/phone2.svg" alt="phonesvg" className="w-[0.749rem] h-[0.749rem]" />
        <p className="text-[#FF8126] text-[0.875rem]">+43 1 234 5678</p>
      </div>
      <div className="flex gap-[0.5rem] items-center">
        <img src="/loc.svg" alt="locationimage" className="w-[1.25rem] h-[1.25rem]" />
        <p className="max-w-[17.475rem] font-normal text-[0.75rem] leading-[100%]">
          Downtown Shopping Center, New York
        </p>
      </div>
    </div>
  </motion.div>
);

// Pricing Component
const PricingSection = () => (
  <motion.div
    className="flex md:flex-col items-center md:items-start gap-[1rem] md:gap-[1em]"
    variants={textVariants}
    initial="hidden"
    animate="visible"
  >
    <h1 className="w-[8.1875rem] font-normal text-[#FF8126] text-[1.4375rem] leading-[100%]">
      $500/Month
    </h1>
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className="text-white bg-[#FF8126] h-[2.875rem] w-[9.9375rem] rounded-[0.5625rem]"
    >
      Send Request
    </motion.button>
  </motion.div>
);

// Main Hero Component
const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(currentIndex === 0 ? IMAGES.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex(currentIndex === IMAGES.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="lg:min-h-[100vh] mt-[1rem] mx-auto px-[1rem] sm:px-[1.5rem] md:px-[2.5rem] lg:px-[3rem] w-full max-w-[74.6875rem]">
      <motion.h1
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="w-full text-[2.375rem] leading-[3rem] md:text-[2.5625rem] md:leading-[4.5625rem] font-bold text-center md:text-start p-[1rem] mx-auto"
      >
        Downtown Shopping Center
      </motion.h1>

      <ImageSlider
        currentIndex={currentIndex}
        direction={direction}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />

      <div className="flex justify-center lg:hidden mt-4 space-x-2">
        {IMAGES.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-orange-500' : 'bg-gray-400'}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      <motion.div
        className="w-full flex flex-col md:flex-row md:justify-between lg:justify-between gap-[1rem] md:gap-[2rem] lg:gap-[2rem] items-center p-[2rem] shadow-xl mx-auto rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <PropertyInfo />
        <HighlightsSection />
        <PricingSection />
      </motion.div>
    </div>
  );
};

export default Hero;