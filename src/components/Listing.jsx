import React from 'react'
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

const Listing = () => {
   const { language } = useLanguage();
      const t = translations[language];
  
  return (
    <div className='min-h-screen py-10 md:py-0 px-4 md:px-10 mb-2'>
     <div className='flex flex-col items-center text-center'>
        <h1 className='font-700 md:text-[57px] text-[32px]'>{t.listingTitle1} <span className='md:inline block'>{t.listingTitle2}</span></h1>
        <p className='font-400 md:text-[18px] text-[14px] text-gray-500'>{t.listingdes1} <span className='md:block'>{t.listingdes2}</span></p>
     </div>

     <div className='flex items-center justify-between w-full gap-10 mt-10'>
      <div className='flex items-center md:gap-7 gap-4'>
      <img src='/dtshopping.jpg' alt='dtshopping' className='md:h-[220px] md:w-[160px] w-[131px] h-[165.94px] rounded-[4px] object-cover'/>
       <div className='flex flex-col md:gap-7 gap-2 md:w-full w-[191px]' >
         <h1 className='font-400 md:text-[25.8px] md:w-[300px] w-[191px] text-[15px]'>{t.listingdowntownTitle1} <span className='block'>{t.listingdowntownTitle2}</span></h1>
         <h4 className='font-400 md:text-[30.8px] text-[#FF8126]'>$500/{t.listingMonth}</h4>

         <div className='items-center md:hidden gap-5'>
         <div className='flex gap-3  items-center mt-2'>
           <img src='/listing1.png' alt='home'/>
           <p className='text-[#FF8126] text-sm'>{t.listinghome}</p>
         </div>
         <div className='flex gap-3 items-center mt-2'>
           <img src='/listing2.png' alt='place'/>
           <p className='text-[#FF8126] text-sm'>{t.listingplace}</p>
         </div>
         <div className='flex gap-3 items-center mt-2'>
           <img src='/listing3.png' alt='location'/>
           <p className='text-[#FF8126] text-sm'>{t.listinglocation}</p>
         </div>
       </div>
       </div>

      </div>


       <div className='md:flex hidden md:w-[555px] items-center gap-5'>
         <div className='flex gap-3 items-center'>
           <img src='/listing1.png' alt='home'/>
           <p className='text-[#FF8126] text-sm'>{t.listinghome}</p>
         </div>
         <div className='flex gap-3 items-center'>
           <img src='/listing2.png' alt='place'/>
           <p className='text-[#FF8126] text-sm'>{t.listingplace}</p>
         </div>
         <div className='flex gap-3 items-center'>
           <img src='/listing3.png' alt='location'/>
           <p className='text-[#FF8126] text-sm'>{t.listinglocation}</p>
         </div>
       </div>

       <div className='rotate-270'>
         <button className='border-[#FF8126]  md:ml-0 ml-5   md:w-[134px] md:h-[42px] w-[162px] h-[28px] md:rounded-[12px] rounded-[4px]   border-[1px] text-[#FF8126]'>{t.listingbutton}</button>
       </div>

     </div>
     <div className='w-full h-[1px] bg-gray-400 mt-8'/>



     <div className='flex items-center justify-between w-full gap-10 mt-10'>
      <div className='flex items-center md:gap-7 gap-4'>
      <img src='/fc.jpg' alt='dtshopping' className='md:h-[220px] md:w-[160px]  w-[131px] h-[165.94px] rounded-[4px] object-cover'/>
       <div className='flex flex-col md:gap-7 gap-2' >
         <h1 className='font-400 md:text-[25.8px] md:w-[300px] w-[191px] text-[15px]'>Food Court Space,Los <span className='block'>Angeles</span></h1>
         <h4 className='font-400 md:text-[30.8px] text-[#FF8126]'>$800/{t.listingMonth}</h4>

         <div className='items-center md:hidden '>
         <div className='flex gap-3  items-center mt-2'>
           <img src='/listing1.png' alt='home'/>
           <p className='text-[#FF8126] text-sm'>{t.listinghome}</p>
         </div>
         <div className='flex gap-3 items-center mt-2'>
           <img src='/listing2.png' alt='place'/>
           <p className='text-[#FF8126] text-sm'>{t.listingplace}</p>
         </div>
         <div className='flex gap-3 items-center mt-2'>
           <img src='/listing3.png' alt='location'/>
           <p className='text-[#FF8126] text-sm'>{t.listinglocation}</p>
         </div>
       </div>
       </div>
      </div>


       <div className='md:flex hidden md:w-[555px]  items-center gap-5'>
         <div className='flex gap-3 items-center'>
           <img src='/listing1.png' alt='home'/>
           <p className='text-[#FF8126] text-sm'>{t.listinghome}</p>
         </div>
         <div className='flex gap-3 items-center'>
           <img src='/listing2.png' alt='place'/>
           <p className='text-[#FF8126] text-sm'>{t.listingplace}</p>
         </div>
         <div className='flex gap-3 items-center'>
           <img src='/listing3.png' alt='location'/>
           <p className='text-[#FF8126] text-sm'>{t.listinglocation}</p>
         </div>
       </div>

       <div className='rotate-270'>
         <button className='border-[#FF8126] md:ml-0 ml-5   md:w-[134px] md:h-[42px] w-[162px] h-[28px] md:rounded-[12px] rounded-[4px]   border-[1px] text-[#FF8126]'>{t.listingbutton}</button>
       </div>

     </div>
     <div className='w-full h-[1px] bg-gray-400 mt-8'/>



     <div className='flex items-center justify-between w-full gap-10 mt-10'>
      <div className='flex items-center md:gap-7 gap-4'>
      <img src='/brs.jpg' alt='dtshopping' className='md:h-[220px] md:w-[160px]  w-[131px] h-[165.94px] rounded-[4px] object-cover'/>
       <div className='flex flex-col md:gap-7 gap-2' >
         <h1 className='font-400 md:text-[25.8px] md:w-[300px] w-[190px] text-[15px]'>Boutique Retail Space, <span className='block'>Chicago</span></h1>
         <h4 className='font-400 md:text-[30.8px] text-[#FF8126]'>$600/{t.listingMonth}</h4>

         <div className='items-center md:hidden gap-5'>
         <div className='flex gap-3  items-center mt-2'>
           <img src='/listing1.png' alt='home'/>
           <p className='text-[#FF8126] text-sm'>{t.listinghome}</p>
         </div>
         <div className='flex gap-3 items-center mt-2'>
           <img src='/listing2.png' alt='place'/>
           <p className='text-[#FF8126] text-sm'>{t.listingplace}</p>
         </div>
         <div className='flex gap-3 items-center mt-2'>
           <img src='/listing3.png' alt='location'/>
           <p className='text-[#FF8126] text-sm'>{t.listinglocation}</p>
         </div>
       </div>
       </div>
      </div>


       <div className='md:flex hidden md:w-[555px] items-center gap-5'>
         <div className='flex gap-3 items-center'>
           <img src='/listing1.png' alt='home'/>
           <p className='text-[#FF8126] text-sm'>{t.listinghome}</p>
         </div>
         <div className='flex gap-3 items-center'>
           <img src='/listing2.png' alt='place'/>
           <p className='text-[#FF8126] text-sm'>{t.listingplace}</p>
         </div>
         <div className='flex gap-3 items-center'>
           <img src='/listing3.png' alt='location'/>
           <p className='text-[#FF8126] text-sm inline'>{t.listinglocation}</p>
         </div>
       </div>

       <div className='rotate-270'>
         <button className='border-[#FF8126] md:ml-0 ml-5  md:w-[134px] w-[162px] h-[28px] md:h-[42px] md:rounded-[12px] rounded-[4px]  border-[1px] text-[#FF8126]'>{t.listingbutton}</button>
       </div>

     </div>
     <div className='w-full h-[1px] bg-gray-400 mt-8'/>

     <div className='md:flex md:justify-center  mt-10'>
     <button className='bg-[#FF8126]  md:w-[134px] md:h-[42px] rounded-[12px] w-full h-[55px]  border-[1px] text-white'>View More</button>
     </div>

    </div>
  )
}

export default Listing