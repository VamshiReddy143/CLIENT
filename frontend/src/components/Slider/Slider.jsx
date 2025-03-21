
import React, { useState } from 'react';


const images = [
  '/listingpageimage1.png', 
  '/listingpageimage2.png',
  '/listingpageimage3.png',
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Calculate the indices for the three visible images
  const getVisibleIndices = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    return [prevIndex, currentIndex, nextIndex];
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="relative w-[1195px] h-[389px]">
        <div className="flex justify-center items-center overflow-hidden">
          {getVisibleIndices().map((index) => (
            <div key={index} className="w-1/3 flex-shrink-0 px-2">
              <div className="relative">
                <img
                  src={images[index]}
                  alt={`Slide ${index + 1}`}
                  className="w-[460px] h-[365px] rounded-lg border-4 border-none"
                />
               
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={goToPrevious}
          className="absolute left-10 top-1/2 h-[46px] w-[46px] transform -translate-y-1/2 bg-[#9F9F9F] text-white p-2 rounded-[2px]"
        >
          {"<"}
        </button>
        <button
          onClick={goToNext}
          className="absolute right-10 top-1/2  h-[46px] w-[46px] transform -translate-y-1/2  bg-[#FF8126] text-white p-2 rounded-[2px]"
        >
          {">"}
        </button>
        {/* <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-orange-500' : 'bg-gray-400'}`}
            ></button>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Slider;