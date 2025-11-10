import { useParams } from "react-router-dom";
import { destinations } from "../Data/Destinations";
import { motion } from "framer-motion";

export default function DestinationDetail() {
  const { id } = useParams();

  // Convert ID to string for consistent matching
  const place = destinations.find((d) => String(d.id) === String(id));

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-red-400 text-xl font-semibold">
        Place not found
      </div>
    );
  }

  // Safe defaults
  const lat = place.lat ?? place?.pointOfView?.lat;
  const lng = place.lng ?? place?.pointOfView?.lng;
  const hasMap = lat && lng;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] w-full">
        <img
          src={place.img}
          alt={place.name}
          className="h-full w-full object-cover rounded-b-3xl shadow-2xl"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-b-3xl">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-cyan-400 text-center px-4"
          >
            {place.name || "Unknown Place"}
          </motion.h1>
        </div>
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto px-6 md:px-0 py-12 space-y-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">
          Overview
        </h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          {place.Deepdesc || "No description available for this destination."}
        </p>

        {/* Map Section */}
        {hasMap ? (
          <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg">
            <iframe
              title={`${place.name || "Destination"} map`}
              src={`https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`}
              className="w-full h-full border-0"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="text-gray-400 italic text-center">
            Map not available for this destination.
          </div>
        )}
      </motion.div>
    </div>
  );
}
