import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel plan for location : Las Vegas, for 3 Days for Couple with a cheap budget, Give me a Hotels options list with HotelName, Hotel address , Price, hotel image url, geo co-ordinates , ratings , descriptions, and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates , ticket Pricing , rating ,Time travel each of the location for 3 days with ech day plan with best time to visit in JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50 - $100 per night\",\n      \"hotelImageUrl\": \"https://www.thed.com/images/hotel-gallery/featured-image.jpg\",\n      \"geoCoordinates\": \"36.1699° N, 115.1423° W\",\n      \"ratings\": \"4.0 stars\",\n      \"description\": \"A budget-friendly hotel located in the heart of Fremont Street, offering a vibrant casino, live entertainment, and a retro-themed atmosphere.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"$40 - $80 per night\",\n      \"hotelImageUrl\": \"https://www.circuscircus.com/content/dam/caesars/circus-circus/hero/circus-circus-hero-mobile.jpg\",\n      \"geoCoordinates\": \"36.1273° N, 115.1672° W\",\n      \"ratings\": \"3.5 stars\",\n      \"description\": \"A classic Las Vegas hotel known for its circus-themed attractions, affordable rooms, and a large casino.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Hotel & Casino\",\n      \"hotelAddress\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$60 - $120 per night\",\n      \"hotelImageUrl\": \"https://www.goldennugget.com/las-vegas/media/images/goldennugget-lasvegas-homepage-hero-photo.jpg\",\n      \"geoCoordinates\": \"36.1699° N, 115.1424° W\",\n      \"ratings\": \"4.0 stars\",\n      \"description\": \"A historic hotel with a stylish ambiance, featuring a world-class casino, upscale dining options, and a thrilling shark tank.\"\n    },\n    {\n      \"hotelName\": \"Main Street Station Casino, Brewery & Hotel\",\n      \"hotelAddress\": \"200 N 3rd St, Las Vegas, NV 89101\",\n      \"price\": \"$45 - $90 per night\",\n      \"hotelImageUrl\": \"https://www.mainstreetstationcasino.com/content/dam/caesars/main-street-station/hero/main-street-station-hero-mobile.jpg\",\n      \"geoCoordinates\": \"36.1692° N, 115.1398° W\",\n      \"ratings\": \"3.5 stars\",\n      \"description\": \"A unique hotel with a railroad theme, offering affordable rooms, a bustling casino, and a brewery.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": \"Day 1\",\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"Explore the vibrant pedestrian mall with its iconic canopy, free live entertainment, and numerous street performers.\",\n          \"placeImageUrl\": \"https://www.fremontstreet.com/wp-content/uploads/2022/03/Fremont-Street-Experience-Las-Vegas-Canopy-6-768x432.jpg\",\n          \"geoCoordinates\": \"36.1699° N, 115.1423° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"4.5 stars\",\n          \"time\": \"Afternoon\"\n        },\n        {\n          \"placeName\": \"The Mob Museum\",\n          \"placeDetails\": \"Learn about the history of organized crime in Las Vegas and the United States.\",\n          \"placeImageUrl\": \"https://www.themobmuseum.org/sites/default/files/styles/hero_image/public/2022-07/mob-museum-hero-image-2022.jpg\",\n          \"geoCoordinates\": \"36.1713° N, 115.1408° W\",\n          \"ticketPricing\": \"$29.95\",\n          \"rating\": \"4.0 stars\",\n          \"time\": \"Evening\"\n        },\n        {\n          \"placeName\": \"Neon Museum\",\n          \"placeDetails\": \"Admire a collection of historic neon signs from Las Vegas's past.\",\n          \"placeImageUrl\": \"https://www.neonmuseum.org/sites/default/files/styles/hero_image/public/2022-07/Neon%20Museum%20Hero%20Image%202022.jpg\",\n          \"geoCoordinates\": \"36.1663° N, 115.1448° W\",\n          \"ticketPricing\": \"$25\",\n          \"rating\": \"4.5 stars\",\n          \"time\": \"Night\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 2\",\n      \"plan\": [\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"Hike scenic trails, enjoy breathtaking rock formations, and admire the desert landscape.\",\n          \"placeImageUrl\": \"https://www.nps.gov/redr/learn/nature/images/RedRockCanyon_014.jpg\",\n          \"geoCoordinates\": \"36.2328° N, 115.3366° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"4.5 stars\",\n          \"time\": \"Morning\"\n        },\n        {\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"Experience a breathtaking display of floral artistry and unique plant life.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/content/dam/mgmresorts/bellagio/homepage/gallery/conservatory/Bellagio-Conservatory-Floral-Art-Display.jpg\",\n          \"geoCoordinates\": \"36.1186° N, 115.1724° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"4.5 stars\",\n          \"time\": \"Afternoon\"\n        },\n        {\n          \"placeName\": \"Fountains of Bellagio\",\n          \"placeDetails\": \"Watch a spectacular water show synchronized to music and lights.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/content/dam/mgmresorts/bellagio/homepage/gallery/fountains/Fountains-of-Bellagio-Shows.jpg\",\n          \"geoCoordinates\": \"36.1185° N, 115.1725° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"4.5 stars\",\n          \"time\": \"Evening\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 3\",\n      \"plan\": [\n        {\n          \"placeName\": \"Hoover Dam\",\n          \"placeDetails\": \"Take a tour of the iconic dam and admire its engineering marvel.\",\n          \"placeImageUrl\": \"https://www.nps.gov/hove/learn/nature/images/hoover-dam-1936-looking-west.jpg\",\n          \"geoCoordinates\": \"36.0002° N, 114.9997° W\",\n          \"ticketPricing\": \"$30\",\n          \"rating\": \"4.5 stars\",\n          \"time\": \"Morning\"\n        },\n        {\n          \"placeName\": \"High Roller Observation Wheel\",\n          \"placeDetails\": \"Enjoy panoramic views of the Las Vegas Strip from the world's tallest observation wheel.\",\n          \"placeImageUrl\": \"https://www.caesars.com/content/dam/caesars/high-roller/hero/high-roller-hero-mobile.jpg\",\n          \"geoCoordinates\": \"36.1209° N, 115.1719° W\",\n          \"ticketPricing\": \"$30\",\n          \"rating\": \"4.0 stars\",\n          \"time\": \"Afternoon\"\n        },\n        {\n          \"placeName\": \"Linq Promenade\",\n          \"placeDetails\": \"Stroll along the lively pedestrian promenade with its shops, restaurants, and entertainment options.\",\n          \"placeImageUrl\": \"https://www.linq.com/content/dam/caesars/linq/hero/linq-hero-mobile.jpg\",\n          \"geoCoordinates\": \"36.1204° N, 115.1721° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"4.0 stars\",\n          \"time\": \"Evening\"\n        }\n      ]\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });

  
