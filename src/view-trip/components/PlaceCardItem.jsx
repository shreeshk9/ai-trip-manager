import React from 'react'
import { Button } from '@/components/ui/button';
import { TiLocationArrowOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { useEffect, useState } from 'react';



function PlaceCardItem({place}) {
  const [photoUrl, setPhotoUrl] = useState(); // Default placeholder image

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };
    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[3]);
      
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link to = {'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src= {photoUrl?photoUrl: '/placeholder.jpg'}
        className='w-[100px] [h-100px] rounded-xl'
        />
        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-400'>{place.placeDetails}</p>
            {/* <Button size='sm'><TiLocationArrowOutline /></Button> */}
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem