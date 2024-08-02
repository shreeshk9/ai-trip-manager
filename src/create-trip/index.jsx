import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constansts/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null); // Initialized to null
  const [formData, setForm] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null); // State to store user info
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setForm({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    if (user) {
      console.log("User Information:", {
        email: user.email,
        family_name: user.family_name,
        given_name: user.given_name,
        id: user.id,
        name: user.name,
        picture: user.picture,
        verified_email: user.verified_email,
      });
    }
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (!formData?.location || !formData?.budget || !formData?.travelers) {
      toast("Please fill all details");
      return;
    }
    if (formData?.noOfDays > 11) {
      toast("You can't select more than 11 days");
      return;
    }
    setLoading(true);
    try {
      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        formData?.location?.label
      )
        .replace("{totalDays}", formData?.noOfDays)
        .replace("{traveler}", formData?.travelers)
        .replace("{budget}", formData?.budget);

      // Generate trip data
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());

      // Save trip data
      await SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("An error occurred while generating the trip.");
    } finally {
      setLoading(false); // Ensure loading is stopped even if there's an error
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    try {
      const docId = Date.now().toString(); // Ensure parentheses are used
      const user = JSON.parse(localStorage.getItem("user"));
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData), // Ensure TripData is in the correct format
        userEmail: user?.email,
        id: docId,
      });
      navigate('/view-trip/' + docId); // Navigate to the view trip page
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("An error occurred while saving the trip.");
    } finally {
      setLoading(false); // Ensure loading is stopped even if there's an error
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Response Data:", response.data);
        console.log("Response Headers:", response.headers);
        console.log("Response Status:", response.status);
        console.log("Response Status Text:", response.statusText);

        // Update user state with fetched data
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data)); // Store user info in local storage
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch((error) => {
        console.log("Error fetching user profile: ", error.response || error);
        if (error.response) {
          console.log("Error Response Data:", error.response.data);
          console.log("Error Response Headers:", error.response.headers);
          console.log("Error Response Status:", error.response.status);
          console.log("Error Response Status Text:", error.response.statusText);
        }
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences🗺️🎫
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is the destination of your choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div className="mt-8">
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <input
            placeholder="Example: 3"
            type="number"
            className="mt-2 p-2 border rounded w-full"
            onChange={(e) =>
              handleInputChange("noOfDays", Number(e.target.value))
            }
            min="1" // Optional: ensure the number is positive
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${
                    formData?.budget === item.title
                      ? "shadow-lg border-black"
                      : ""
                  }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on travelling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("travelers", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${
                    formData.travelers === item.people
                      ? "shadow-lg border-black"
                      : ""
                  }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="my-10 justify-end flex">
          <Button disabled={loading} onClick={OnGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" alt="logo" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in to the app with Google authentication securely</p>
                <Button
                  disabled={loading}
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="h-7 w-7" /> Sign In with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
