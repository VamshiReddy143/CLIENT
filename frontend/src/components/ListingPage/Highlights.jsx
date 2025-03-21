// src/components/Highlights.jsx
import React from 'react';
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";
import useMarketStore from '../../store/marketStore';



const Highlights = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { selectedMarket, loading } = useMarketStore();

  // Log to debug
  console.log('Selected market:', selectedMarket);
  console.log('Loading state:', loading);

  // Return loading state if data isn’t ready
  if (loading || !selectedMarket) {
    return <div className="text-center p-4">Loading highlights...</div>;
  }


  console.log("highlights",selectedMarket.highlights)
  if (loading || !selectedMarket) {
    return <div className="text-center p-4">Loading highlights...</div>;
  }
  
  
  const highlightsRaw = selectedMarket?.highlights;
  const highlights = typeof highlightsRaw === "string" ? JSON.parse(highlightsRaw) : highlightsRaw || {
    spaceHighlights: [],
    heading2: [],
    heading3: [],
    heading4: []
  };

  // Debug logs
  console.log("selectedMarket.highlights type:", typeof selectedMarket.highlights);
  console.log("selectedMarket.highlights:", selectedMarket.highlights);
  console.log("Highlights object:", highlights);
  console.log("spaceHighlights:", highlights.spaceHighlights);

  return (
    <div className="relative mt-[1rem] mx-auto px-[1rem] sm:px-[1.5rem] md:px-[2.5rem] md:py-10 lg:py-10 lg:px-[3rem] w-full max-w-[1440px] md:mb-10">
      <div className='md:shadow-xl py-5 px-3  lg:max-w-[70%] md:w-[100%] rounded-xl'>
        <div>
          <h1 className='text-[30px] leading-[100%] font-400 mb-[1em] font-[belanosima]'>{t.Space_Highlights}</h1>
          <div>
            <p className='text-[#7D7D7D] md:w-[700px] lg:w-fit w-full font-[poppins] text-[14.4px]'>{t.prime_loc_des}</p>      
            <div className='ml-3  text-[#7D7D7D] font-[poppins] text-[14.4px] leading-[170%]'>
              {Array.isArray(highlights?.spaceHighlights) && highlights?.spaceHighlights.length > 0 ? (
                highlights?.spaceHighlights?.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))
              ) : (
                <li>No highlights available</li>
              )}
            </div>
          </div>
        </div>

        <div>
          <h1 className='leading-[100%] font-bold mt-7 text-[14.4px] font-[poppins] mb-2'>{t.heading2}</h1>   
          <div className='ml-3 clear-both text-[#7D7D7D] font-[poppins] text-[14.4px] leading-[170%]'>
            {Array.isArray(highlights.heading2) && highlights.heading2.length > 0 ? (
              highlights.heading2.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))
            ) : (
              <li>No amenities available</li>
            )}
          </div>
        </div>

        <div>
          <h1 className='leading-[100%] font-bold mt-7 text-[14.4px] font-[poppins] mb-2'>{t.heading3}</h1>   
          <div className='ml-3 clear-both text-[#7D7D7D] font-[poppins] text-[14.4px] leading-[170%]'>
            {Array.isArray(highlights.heading3) && highlights.heading3.length > 0 ? (
              highlights.heading3.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))
            ) : (
              <li>No accessibility features available</li>
            )}
          </div>
        </div>

        <div>
          <h1 className='leading-[100%] font-bold mt-7 text-[14.4px] font-[poppins] mb-2'>{t.heading4}</h1>   
          <div className='ml-3 clear-both text-[#7D7D7D] font-[poppins] text-[14.4px] leading-[170%]'>
            {Array.isArray(highlights.heading4) && highlights.heading4.length > 0 ? (
              highlights.heading4.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))
            ) : (
              <li>No lease terms available</li>
            )}
          </div>
        </div>

        {/* Static "How to secure this space" section */}
        <div className='md:block hidden'>
          <h1 className='leading-[100%] font-400 mt-7 text-[14.4px] font-[poppins]'>
            <span className='text-[#FF8126] w-full font-bold text-[14.4px] mr-1'>{t.question1}</span>{t.question2}
          </h1>   
        </div>
      </div>

      <div className='block md:hidden py-5'>
        <h1 className='leading-[100%] font-400 mt-7 text-[14.4px] font-[poppins]'>
          <span className='text-[#FF8126] w-full font-bold text-[14.4px] mb-3 block'>{t.question1}</span>
          {t.question3}<span className='block mb-3 mt-3'>+43 1 234 5678</span>{t.question4}
        </h1>   
      </div>

      <div>
        <img src='/pizzahut.svg' alt='pizzahutimage' className='absolute md:hidden lg:block lg:w-[296.22px] lg:h-[310px] w-[149px] h-[155px] md:bottom-5 bottom-0 right-4'/>
      </div>
    </div>
  );
};

export default Highlights;