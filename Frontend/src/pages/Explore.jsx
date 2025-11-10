// src/pages/Explorer.jsx
import { useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { destinations } from "../Data/Destinations";
import Button from "../components/Button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Explorer() {
  const mapRef = useRef(null);
  const scrollRef = useRef(null);
  const [activePlace, setActivePlace] = useState(null);

  const handlePinClick = (place) => {
    setActivePlace(place);
    const map = mapRef.current;
    if (map) {
      map.flyTo([place.lat, place.lng], 11, { duration: 1.5 });
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -340 : 340,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 text-center text-4xl md:text-5xl font-extrabold 
          bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.5)]"
      >
         Explore Sikkim Like Never Before
      </motion.header>

      {/* Map Section */}
      <motion.div
        className="w-full h-[520px] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.25)] border border-cyan-500/30 mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <MapContainer
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
          center={[27.5, 88.6]}
          zoom={8}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          {/* Dark map tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains={["a", "b", "c"]}
          />

          {/* Pins */}
          {destinations.map((p, idx) => (
            <CircleMarker
              key={idx}
              center={[p.lat, p.lng]}
              radius={activePlace?.name === p.name ? 13 : 9}
              pathOptions={{
                color: activePlace?.name === p.name ? "#22d3ee" : "#3b82f6",
                fillColor: activePlace?.name === p.name ? "#22d3ee" : "#3b82f6",
                fillOpacity: 0.95,
                weight: activePlace?.name === p.name ? 4 : 2,
              }}
              eventHandlers={{
                click: () => handlePinClick(p),
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <div className="text-sm font-bold text-cyan-300">{p.name}</div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </motion.div>

      {/* Scrollable Cards Section */}
      <section className="relative mt-12 px-12">
        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 
            bg-gray-800/70 hover:bg-cyan-500/30 
            p-4 rounded-full shadow-[0_0_25px_rgba(0,255,255,0.4)] 
            backdrop-blur-xl transition z-20"
        >
          <ChevronLeft className="text-cyan-300" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 
            bg-gray-800/70 hover:bg-cyan-500/30 
            p-4 rounded-full shadow-[0_0_25px_rgba(0,255,255,0.4)] 
            backdrop-blur-xl transition z-20"
        >
          <ChevronRight className="text-cyan-300" />
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex space-x-8 overflow-x-auto scrollbar-hide pb-8"
        >
          {destinations.map((place, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 150 }}
              className={`min-w-[300px] rounded-2xl overflow-hidden 
                shadow-[0_0_30px_rgba(0,255,255,0.15)] 
                border backdrop-blur-xl 
                cursor-pointer transition 
                bg-gradient-to-b from-gray-900/90 to-black/90 
                ${
                  activePlace?.name === place.name
                    ? "border-cyan-400 shadow-[0_0_40px_rgba(0,255,255,0.5)]"
                    : "border-gray-800"
                }`}
              onClick={() => handlePinClick(place)}
            >
              <img
                src={place.img}
                alt={place.name}
                className="h-44 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-cyan-300">{place.name}</h3>
                <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                  {place.desc}
                </p>
                <div className="mt-4">
                  <Button
                    onClick={() => handlePinClick(place)}
                    className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]"
                  >
                    Show on Map
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
