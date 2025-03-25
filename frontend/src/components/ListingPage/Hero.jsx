import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";
import { useParams } from 'react-router-dom';
import useMarketStore from '../../store/marketStore';
import useAuthStore from '@/store/authSlice';
import toast from 'react-hot-toast';

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { id } = useParams();
  const { user } = useAuthStore();
  const { selectedMarket, fetchMarketById, loading, error, sendRequest } = useMarketStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hasSentRequest, setHasSentRequest] = useState(false);

  // Fetch market data and check for sent requests
  useEffect(() => {
    if (!selectedMarket || selectedMarket.id !== parseInt(id)) {
      fetchMarketById(id);
    }

    const sentRequests = JSON.parse(localStorage.getItem('sentRequests')) || {};
    if (sentRequests[id] && sentRequests[id].userId === user?.id) {
      setHasSentRequest(true);
    }
  }, [id, fetchMarketById, selectedMarket, user]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex === media.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoSlide); // Cleanup on unmount
  }, [currentIndex]); // Re-run when currentIndex changes

  const handleSendRequest = async () => {
    if (!user) {
      toast.error('Please log in to send a request');
      return;
    }

    if (hasSentRequest) {
      toast.error('You already sent the request');
      return;
    }

    const requestData = {
      vendorId: user.id,
      vendorName: user.name,
      marketId: selectedMarket.id,
      marketName: selectedMarket.marketName,
      spaceSize: selectedMarket.size || 300,
      rentalPrice: selectedMarket.price,
      propertyType: selectedMarket.type,
    };

    try {
      await sendRequest(requestData);
      setHasSentRequest(true);
      const sentRequests = JSON.parse(localStorage.getItem('sentRequests')) || {};
      sentRequests[id] = { userId: user.id, timestamp: Date.now() };
      localStorage.setItem('sentRequests', JSON.stringify(sentRequests));
      toast.success('Request sent successfully!');
    } catch (err) {
      toast.error('Failed to send request. Please try again.');
    }
  };

  if (loading) return <div className="text-center p-4">Loading market data...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  const media = selectedMarket ? [...(selectedMarket.images || []), ...(selectedMarket.videos || [])] : [
    '/listingpageimage11.svg',
    '/listingpageimage33.svg',
    '/listingpageimage22.svg',
  ];

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: { x: 0, opacity: 1, scale: 1, zIndex: 1 },
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

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };
  const highlightsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 } },
  };
  const priceButtonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.4 } },
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(currentIndex === 0 ? media.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex(currentIndex === media.length - 1 ? 0 : currentIndex + 1);
  };

  const getVisibleIndices = () => {
    const prevIndex = currentIndex === 0 ? media.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === media.length - 1 ? 0 : currentIndex + 1;
    return [prevIndex, currentIndex, nextIndex];
  };

  const highlights = selectedMarket ? [
    selectedMarket.furnished ? `${t.Fully_Furnished}` : 'Unfurnished',
    `${selectedMarket.size || 300} sq. ft.`,
    selectedMarket.nearMetro ? `${t.Near_Metro}` : 'Not Near Metro',
    `${t.Prime_Location}`,
    selectedMarket.highFootTraffic ? `${t.High_Foot_Traffic}` : 'Moderate Traffic',
    selectedMarket.flexibleLease ? `${t.Flexible_Lease}` : 'Fixed Lease',
    `${t.Business_Friendly}`,
    `${t.Easy_Booking}`,
    selectedMarket.security ? `24/7 ${t.Security}` : 'Basic Security',
  ] : [
    `${t.Fully_Furnished}`,
    "300 sq. ft.",
    `${t.Near_Metro}`,
    `${t.Prime_Location}`,
    `${t.High_Foot_Traffic}`,
    `${t.Flexible_Lease}`,
    `${t.Business_Friendly}`,
    `${t.Easy_Booking}`,
    `24/7 ${t.Security}`,
  ];

  return (
    <div className="mt-[1rem] mx-auto px-[1rem] sm:px-[1.5rem] md:px-[2.5rem] lg:px-[3rem] w-full max-w-[1440px]">
      <motion.h1
        className="w-full text-[2.375rem] leading-[3rem] md:text-[2.5625rem] md:leading-[4.5625rem] font-bold text-center md:text-start p-[1rem] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={titleVariants}
      >
        {selectedMarket ? selectedMarket.marketName : t.Downtown_Shopping_Center}
      </motion.h1>

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
                      x: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
                      opacity: { duration: 0.5 },
                      scale: { duration: 0.5 },
                    }}
                    className={`flex-shrink-0 px-[0.5rem] ${
                      position === 0 ? 'w-full md:w-1/3 order-1' :
                      position === 1 ? 'w-full md:w-1/3 order-2 z-10' :
                      'w-full md:w-1/3 order-3'
                    }`}
                  >
                    <div className="relative">
                      {media[index].endsWith('.mp4') ? (
                        <video
                          src={media[index]}
                          autoPlay
                          muted
                          loop
                          className="w-full max-w-[28.75rem] h-[22.8125rem] rounded-[0.5rem] border-none mx-auto object-cover"
                        />
                      ) : (
                        <img
                          src={media[index]}
                          alt={`Slide ${index + 1}`}
                          className="w-full max-w-[28.75rem] h-[22.8125rem] rounded-[0.5rem] border-none mx-auto object-cover"
                        />
                      )}
                    </div>
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

      <div className="flex justify-center lg:hidden mt-4 space-x-2">
        {media.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-orange-500' : 'bg-gray-400'}`}
          ></button>
        ))}
      </div>

      <motion.div
        className="w-full flex flex-col md:justify-between md:flex-row gap-[1rem] md:gap-[2rem] lg:items-center lg:flex-row lg:gap-[1rem] items-center p-[1rem] shadow-xl mx-auto rounded-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={highlightsVariants}
      >
        <div className="flex flex-col md:flex-row md:gap-[1rem] items-center w-full md:w-auto">
          <img
            src={selectedMarket && selectedMarket.images && selectedMarket.images.length > 0 ? selectedMarket.images[0] : "/shoppingmall.svg"}
            alt="market-image"
            className="hidden md:block w-[7.25rem] h-[8rem] rounded-[0.25rem]"
          />
          <div className="flex flex-col gap-[0.8em] w-full max-w-[19.1rem]">
            <h2 className="text-[2rem] md:text-[1.25rem] font-normal leading-[100%]">
              {selectedMarket ? selectedMarket.marketName : 'Downtown Shopping Center'}
            </h2>
            <div className="flex gap-[0.5rem] items-center">
              <img src="/phone2.svg" alt="phonesvg" className="w-[0.749rem] h-[0.749rem]" />
              <p className="text-[#FF8126] text-[0.875rem]">
                {selectedMarket ? selectedMarket.phone : '+43 1 234 5678'}
              </p>
            </div>
            <div className="flex gap-[0.5rem] items-center">
              <img src="/loc.svg" alt="locationimage" className="w-[1.25rem] h-[1.25rem]" />
              <p className="max-w-[17.475rem] font-normal text-[0.75rem] leading-[100%]">
                {selectedMarket ? selectedMarket.location : t.Downtown_Shopping_Center_New_York}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto md:mt-0 lg:w-auto lg:mt-0 mt-[2em]">
          <h2 className="font-bold md:hidden text-[#FF8126] text-[1rem] leading-[100%] text-center flex md:text-left lg:flex mb-[1em]">
            Space Highlights:
          </h2>

          <div className="hidden lg:flex gap-[2rem] lg:gap-[1rem] justify-center">
            {Array(3)
              .fill()
              .map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col">
                  {highlights.slice(colIdx * 3, colIdx * 3 + 3).map((text, idx) => (
                    <p key={idx}>
                      ✓
                      <span className="ml-[0.5rem] font-normal text-gray-500 text-[0.75rem] lg:leading-[120%]">
                        {text}
                      </span>
                    </p>
                  ))}
                </div>
              ))}
          </div>

          <div className="hidden md:hidden lg:hidden flex-col gap-[1rem] items-center">
            <div className="grid grid-cols-2 gap-x-[1.5rem] gap-y-[0.75rem] w-full max-w-[28rem]">
              {highlights.map((text, idx) => (
                <p key={idx} className="flex items-center">
                  ✓
                  <span className="ml-[0.5rem] font-normal text-gray-500 text-[0.875rem] leading-[120%]">
                    {text}
                  </span>
                </p>
              ))}
            </div>
          </div>

          <div className="flex md:hidden flex-col gap-[1em] items-center">
            <div className="grid grid-cols-2 w-full max-w-[20rem]">
              {highlights.map((text, idx) => (
                <p key={idx} className="flex items-center">
                  ✓
                  <span className="ml-[0.5rem] font-normal text-gray-500 text-[0.75rem] leading-[120%]">
                    {text}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="flex md:flex-col items-center md:items-start gap-[1rem] md:gap-[1em]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={priceButtonVariants}
        >
          <h1 className="w-[8.1875rem] font-normal text-[#FF8126] text-[1.4375rem] leading-[100%]">
            {selectedMarket ? `$${selectedMarket.price}/Month` : t._$500_Month}
          </h1>
          <motion.button
            className={`text-white h-[2.875rem] w-[9.9375rem] rounded-[0.5625rem] ${
              hasSentRequest ? 'bg-orange-300 text-gray-100 cursor-not-allowed' : 'bg-[#FF8126] hover:bg-[#E67320]'
            }`}
            whileHover={hasSentRequest ? {} : { scale: 1.05 }}
            whileTap={hasSentRequest ? {} : { scale: 0.95 }}
            onClick={handleSendRequest}
            disabled={hasSentRequest}
          >
            {hasSentRequest ? "RequestSent" : t.Send_Request}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;