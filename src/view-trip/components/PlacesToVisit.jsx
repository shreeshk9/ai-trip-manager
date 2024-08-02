import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  return (
    <div className="p-5">
      <h2 className="font-bold text-lg mb-5">Places to Visit</h2>
      <div className="grid gap-10">
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={index} className="mb-10">
            <h2 className="font-medium text-lg mb-3">{item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item.plan.map((place, index) => (
                <div key={index} className="my-3 p-3 border rounded-lg">
                  <h2 className="font-medium text-sm text-orange-600 mb-2">{place.time}</h2>
                  <PlaceCardItem place={place} />
                  
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
