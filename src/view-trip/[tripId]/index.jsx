import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { db } from 'D:/React App/ai-travel-planner/src/service/firebaseConfig';
import InfoSection from '../components/InfoSection'; // Adjust this import based on your project structure
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState({}); // Correctly initializing useState

    useEffect(() => {
        if (tripId) {
            const fetchData = async () => {
                try {
                    await GetTripData();
                } catch (error) {
                    console.error("Error fetching trip data:", error);
                }
            };
            fetchData();
        }
    }, [tripId]);

    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document: ", docSnap.data());
            setTrip(docSnap.data());
        } else {
            console.log("No such document!");
            toast('No Trip Found!');
        }
    };

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information Section */}
            <InfoSection trip={trip} />
            {/* Recommended Hotels */}


            
            <Hotels trip={trip} />
            {/* {Daily Plan} */}
            <PlacesToVisit trip={trip} />
            {/* {Footer} */}
            <Footer trip = {trip}/>
        </div>
    );
}

export default Viewtrip;
