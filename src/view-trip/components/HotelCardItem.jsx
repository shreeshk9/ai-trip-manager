import React from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { useEffect, useState } from 'react';

function HotelCardItem({hotel}) {
    const [photoUrl, setPhotoUrl] = useState(); // Default placeholder image

    useEffect(() => {
      if (hotel) {
        GetPlacePhoto();
      }
    }, [hotel]);
  
    const GetPlacePhoto = async () => {
      const data = {
        textQuery: hotel?.hotelName,
      };
      const result = await GetPlaceDetails(data).then(resp => {
        console.log(resp.data.places[0].photos[3]);
        
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
      });
    };
  
  
  
    return (
    <Link to = {'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName+ "," +hotel?.hotelAddress} target='_blank'>
          <div className='hover:scale-105 transition-all cursor-pointer'>
            <img src={photoUrl?photoUrl: '/placeholder.jpg'}  className='rounded-xl w-full object-cover'/>
            
          <div className='my-2 flex flex-col'>
          <h2 className='font-medium'>{hotel?.hotelName}</h2>
          <h2 className='font-xs text-gray-500'> 📍 {hotel?.hotelAddress}</h2>
          <h2 className='text-sm'> 💵 {hotel?.price}</h2>
          <h2 className='text-sm'> ⭐ {hotel?.ratings}</h2>

            </div>

            </div>
            </Link>
  )
}

export default HotelCardItem