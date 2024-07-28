import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie ,faBuilding,faCalendar, faWallet, faClipboardQuestion, faCircleCheck, faCircleXmark} from '@fortawesome/free-solid-svg-icons';

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
//   faUserTie
} from 'react-icons/fa';
// import Contact from './Contact.jsx';

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
    const {currentUser} = useSelector((state)=>state.user)
  SwiperCore.use([Navigation]);
  const [contact, setcontact] = useState(false)
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/getListing/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        const formattedData = {
            ...data,
            interviewDate: new Date(data.interviewDate).toISOString().split('T')[0]
          };
        setListing(formattedData);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
//   console.log(loading);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>


          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <div className="flex flex-row items-center  gap-6">
            <p className='flex items-center  text-2xl gap-2 font-semibold'>
            <FontAwesomeIcon icon={faUserTie} className='text-black-700'/>
            
            {listing.intervieweeName} 
            </p>
            <p className='flex items-center  gap-2 text-slate-800 text-2xl font-semibold '>
              
            <FontAwesomeIcon icon={faBuilding} className='text-green-550' />
              {`${listing.companyName} : ${listing.jobTitle}`}
            </p>
            </div>
                
            <div className='flex items-center gap-2 '>
              <FontAwesomeIcon icon={faCalendar} className='text-black-700 text-xl' />
              <p className='bg-red-900  max-w-[150px] text-white text-center p-2 rounded-md'>
                {listing.interviewDate}
              </p>
             
            </div>

              <div className='flex items-center gap-2 '>
              <FontAwesomeIcon icon={faWallet} className='text-green-800' />
              <p className=' text-green-800 font-semibold'>
               CTC: {listing.ctc} lpa
              </p>
              <p className=' text-green-800 font-semibold'>
               BASE: {listing.base} lpa
              </p>
             
            </div>
            <p className=' text-green-800 font-semibold'>
                {listing.type === 'full-time' ? 'Full-Time' : `${listing.type === 'intern' ? 'Intern':'Full-Time + Intern'}`}
              </p>
            
              <div className='flex items-center gap-2 '>
              <FontAwesomeIcon icon={faClipboardQuestion} className='text-green-800'/>
              <p className=' text-green-800 font-semibold'>
                {listing.rounds} Rounds
              </p>
              {
                listing.selected && 
                (   
                    <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faCircleCheck} className='text-green-800'/>
                    <p className=' text-green-800 font-semibold'>
               Selected
              </p>
                    </div>
                )
              }
              {
                !listing.selected && 
                (
                    <div className="flex gap-2 items-center">

                    <FontAwesomeIcon icon={faCircleXmark} className='text-red-800' />
                    <p className=' text-red-800 font-semibold'>
               Not Selected
              </p>
                    </div>
                )
              }
      
             
            </div>
            
  
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>overallExperience - </span>
              {listing.overallExperience}
            </p>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>tips - </span>
              {listing.tips}
            </p>

            {/* <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul> */}
           
            
          </div>
        </div>
      )}
    </main>
  );
}