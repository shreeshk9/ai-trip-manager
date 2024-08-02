import React, { useState, useEffect } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg'); // Default placeholder image

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip.userSelection.location.label,
      };
      const resp = await GetPlaceDetails(data);
      const photoName = resp.data.places[0]?.photos[3]?.name; // Ensure the photo index and name exist
      if (photoName) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(PhotoUrl);
      } else {
        console.error('Photo not found for the place');
      }
    } catch (error) {
      console.error('Error fetching place photo:', error);
    }
  };

  return (
   <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
      <img src={photoUrl} alt="Trip location" className="object-cover rounded-xl h-[220px]" />
      <div>
        <h2 className="font-bold text-lg">
          {trip?.userSelection?.location?.label}
        </h2>
        <h2 className="text-sm text-gray-500">
          {trip?.userSelection?.noOfDays} Days Trip with {trip?.userSelection?.budget} Budget
        </h2>
      </div>
    </div>
    </Link>
  );
}

export default UserTripCardItem;
