import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import Globe from "react-globe.gl";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { destinations } from "../Data/Destinations";


export default function Home() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  





const globeRef = useRef();

<Globe
  ref={globeRef}
  globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
  backgroundColor="rgba(0,0,0,0)"
  pointsData={[{ lat: 27.3, lng: 88.6, size: 0.5, color: "red" }]}
  pointAltitude="size"
  pointColor="color"
/>

useEffect(() => {
  if (globeRef.current) {
    setTimeout(() => {
      globeRef.current.pointOfView(
        { lat: 27.3, lng: 88.6, altitude: 1.5 },
        2000
      );
    }, 500);
  }
}, []);
  // chatbot states
const [chatOpen, setChatOpen] = useState(false);
const [messages, setMessages] = useState([
  {
    from: "bot",
    text: "👋 Hi! I’m your Sikkim Travel Assistant. Tell me how many days you’re visiting, your budget and preferences (adventure, culture, relaxation), and I’ll create a custom itinerary for you!",
  },
]);

// activity plans
const adventurePlan = [
  "Trek to Tsomgo Lake & Nathula",
  "River rafting in Teesta",
  "North Sikkim trip (Lachen, Gurudongmar)",
  "Hike to Goecha La (Kanchenjunga views)",
  "Camping at Yuksom",
  "Explore caves in Tashiding",
  "Mountain biking in Gangtok",
];

const culturePlan = [
  "Explore Rumtek Monastery",
  "Namgyal Institute & MG Marg",
  "Village homestay in Dzongu",
  "Pemayangtse Monastery & Rabdentse ruins",
  "Local food trail in Gangtok",
  "Handicraft shopping in Namchi",
  "Festival experience (if dates match)",
];

const relaxPlan = [
  "Hot springs at Yumthang",
  "Tea gardens in Temi",
  "Spa & sunset view in Pelling",
  "Chill by Khecheopalri Lake",
  "Nature walk in Dzongu",
  "Skywalk at Pelling",
  "Luxury stay at a hillside resort",
];

const balancedPlan = [
  "Gangtok city & monasteries",
  "Tsomgo Lake + Nathula Pass",
  "Yumthang Valley",
  "Pelling sightseeing (Skywalk, Pemayangtse)",
  "Namchi Char Dham temple visit",
  "Local food + MG Marg shopping",
  "Relax at Temi Tea gardens",
];

// --- helper: extract budget ---
const extractBudget = (msg) => {
  const num = msg.match(/\d{2,6}/)?.[0];
  if (!num) return null;
  if (msg.toLowerCase().includes("k")) return parseInt(num) * 1000;
  if (msg.toLowerCase().includes("lakh")) return parseInt(num) * 100000;
  return parseInt(num);
};

// --- itinerary generator ---
const generateItinerary = (msg) => {
  let days = parseInt(msg.match(/\d+/)?.[0]) || 3;
  if (days > 7) days = 7; // max 7 days

  let budget = extractBudget(msg);

  let selectedPlan = balancedPlan;
  let type = "Balanced";

  if (msg.toLowerCase().includes("adventure")) {
    selectedPlan = adventurePlan;
    type = "Adventure";
  } else if (msg.toLowerCase().includes("culture")) {
    selectedPlan = culturePlan;
    type = "Cultural";
  } else if (msg.toLowerCase().includes("relax")) {
    selectedPlan = relaxPlan;
    type = "Relaxing";
  }

  let plan = selectedPlan.slice(0, days);

  return `${type} ${days}-Day Plan${budget ? ` (Budget: ₹${budget})` : ""}:\n${plan
    .map((activity, i) => `- Day ${i + 1}: ${activity}`)
    .join("\n")}\n\n${
    budget && budget < 20000
      ? "💡 Budget Tip: Travel with shared cabs & homestays."
      : "✨ Luxury Add-on: Private tours & premium stays."
  }`;
};

// send message
const [input, setInput] = useState("");
const sendMessage = (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  const userMsg = { from: "user", text: input };
  setMessages((prev) => [...prev, userMsg]);

  setTimeout(() => {
    const reply = generateItinerary(input);
    setMessages((prev) => [...prev, { from: "bot", text: reply }]);
  }, 800);

  setInput("");
};

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % destinations.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + destinations.length) % destinations.length);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col scroll-smooth overflow-x-hidden">
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 
        bg-gradient-to-r from-gray-900/70 via-gray-800/50 to-gray-900/70 
        backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.35)]
        flex justify-between items-center px-8 py-4 
        max-w-7xl mx-auto w-full rounded-b-2xl border-b border-cyan-500/40"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-extrabold tracking-wide text-transparent 
            bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 
            hover:drop-shadow-[0_0_18px_rgba(0,255,255,0.7)] transition-all duration-500"
        >
          Explore Sikkim
        </motion.h1>

        <ul className="flex space-x-10 text-gray-300 font-medium text-lg">
          {["Home", "Destinations", "Map", "Contact"].map((item, i) => (
            <li key={i}>
              <Link
                to={item.toLowerCase()}
                smooth
                duration={800}
                className="relative cursor-pointer group"
              >
                <span className="group-hover:text-cyan-400 transition">
                  {item}
                </span>
                <span
                  className="absolute left-0 -bottom-1 w-0 h-[2px] 
                  bg-gradient-to-r from-cyan-400 to-blue-500 
                  group-hover:w-full transition-all duration-500"
                ></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <div
  id="home"
  className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
>
  {/* Background image with animation */}
  <motion.div
    initial={{ scale: 1.1 }}
    animate={{ scale: 1 }}
    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
    className="absolute inset-0"
    style={{
      backgroundImage:
        "url('https://media-cdn.tripadvisor.com/media/photo-m/1280/15/33/fc/fb/sikkim.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "brightness(0.7) blur(1px)", // thoda dark + blur
    }}
  ></motion.div>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90"></div>

  {/* Content */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="relative z-10"
  >
    <motion.h2
      animate={{ textShadow: "0px 0px 25px rgba(0,255,255,0.9)" }}
      transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
      className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r 
        from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
    >
      Discover Sikkim
    </motion.h2>
    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
      Snow peaks, glacial lakes, flower valleys & monasteries await you.
    </p>
    <div className="mt-6 flex justify-center space-x-4">
      <Button onClick={() => navigate("/explorer")}>Get Started</Button>
      <Button className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-500/20">
        Learn More
      </Button>
    </div>
  </motion.div>
</div>
      {/* Destinations */}
      <section id="destinations" className="py-20 relative overflow-hidden">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-16 text-transparent 
            bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text"
        >
          Top Destinations of Sikkim
        </motion.h3>

        <div className="relative flex justify-center items-center">
          {/* Left */}
          <button
            onClick={prev}
            className="absolute left-10 z-20 p-4 rounded-full 
              bg-cyan-400/20 hover:bg-cyan-400/40 
              backdrop-blur-xl text-white shadow-lg transition"
          >
            ◀
          </button>

          {/* Carousel */}
          <div className="flex items-center justify-center w-full h-[450px] perspective-[1200px]">
            <AnimatePresence>
              {destinations.map((dest, i) => {
                let offset = (i - index + destinations.length) % destinations.length;
                if (offset > 2) offset = offset - destinations.length;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: offset === 0 ? 1 : 0.6,
                      scale: offset === 0 ? 1 : 0.85,
                      rotateY: offset * 30,
                      x: offset * 320,
                      zIndex: offset === 0 ? 10 : 0,
                    }}
                    whileHover={{ scale: 1.05, rotateY: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="absolute rounded-3xl overflow-hidden 
                      bg-gray-900/70 border border-cyan-500/30 backdrop-blur-xl 
                      shadow-[0_0_40px_rgba(0,255,255,0.3)] w-[280px] h-[420px] hover:shadow-[0_0_60px_rgba(0,255,255,0.6)]"
                  >
                    <img
                      src={dest.img}
                      alt={dest.name}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-6">
                      <h4 className="text-2xl font-bold text-white">
                        {dest.name}
                      </h4>
                      <p className="mt-2 text-gray-300 text-sm line-clamp-3">
                        {dest.desc}
                      </p>
                      <button
                        onClick={() => navigate(`/place/${dest.id}`)}
                        className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r 
                          from-cyan-400 via-blue-500 to-purple-500 
                          text-white font-semibold hover:shadow-[0_0_25px_rgba(0,255,255,0.7)] transition"
                      >
                        Explore
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right */}
          <button
            onClick={next}
            className="absolute right-10 z-20 p-4 rounded-full 
              bg-cyan-400/20 hover:bg-cyan-400/40 
              backdrop-blur-xl text-white shadow-lg transition"
          >
            ▶
          </button>
        </div>
      </section>

      {/* Globe */}
      <section
        id="map"
        className="py-20 relative bg-gradient-to-b from-gray-900 via-black to-gray-950"
      >
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 
            bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          Explore on Map
        </motion.h3>
        <div className="h-[500px] flex justify-center relative">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-3xl animate-pulse"></div>
          <Globe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="rgba(0,0,0,0)"
            pointsData={[
              { lat: 27.3, lng: 88.6, size: 0.5, color: "red" },
            ]}
            pointAltitude="size"
            pointColor="color"
            onGlobeReady={(globeEl) => {
              setTimeout(() => {
                globeEl.pointOfView(
                  { lat: 27.3, lng: 88.6, altitude: 1.5 },
                  2000
                );
              }, 500);
            }}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-28 bg-gradient-to-b from-gray-950 via-black to-gray-950 overflow-hidden"
      >
        {/* Glow Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-48 -left-40 w-[600px] h-[600px] rounded-full 
            bg-cyan-500/25 blur-[140px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[550px] h-[550px] rounded-full 
            bg-purple-600/25 blur-[140px] animate-pulse delay-1000"></div>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-extrabold text-center mb-20
            bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 
            bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.4)]"
        >
          Get in Touch
        </motion.h3>

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 px-6">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl p-10 bg-gray-900/70 border border-cyan-500/40 
              backdrop-blur-2xl shadow-[0_0_35px_rgba(0,255,255,0.25)] 
              hover:shadow-[0_0_55px_rgba(0,255,255,0.5)] transition"
          >
            <h4 className="text-3xl font-semibold text-cyan-400 mb-6">
              Contact Information
            </h4>
            <p className="text-gray-300 mb-10 leading-relaxed text-lg">
              Whether you’re planning an adventurous trek, a cultural tour, or
              just want tips for exploring Sikkim, we’d love to hear from you!
            </p>
            <ul className="space-y-6 text-lg">
          
              <li className="flex items-center space-x-4">
                <span className="text-cyan-400 text-2xl">📞</span>
                <span>+91 xxxxx xxxxx</span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="text-cyan-400 text-2xl">📧</span>
                <span>xxx@email.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl p-10 bg-gray-900/70 border border-purple-500/40 
              backdrop-blur-2xl shadow-[0_0_35px_rgba(128,0,255,0.25)] 
              hover:shadow-[0_0_55px_rgba(128,0,255,0.5)] transition space-y-6"
          >
            <h4 className="text-3xl font-semibold text-purple-400 mb-4">
              Send a Message
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="px-5 py-4 rounded-xl bg-black/30 border border-gray-700 
                  focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 
                  text-white placeholder-gray-400 outline-none transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-5 py-4 rounded-xl bg-black/30 border border-gray-700 
                  focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 
                  text-white placeholder-gray-400 outline-none transition"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full px-5 py-4 rounded-xl bg-black/30 border border-gray-700 
                focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 
                text-white placeholder-gray-400 outline-none transition"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-5 py-4 rounded-xl bg-black/30 border border-gray-700 
                focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 
                text-white placeholder-gray-400 outline-none transition"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r 
                from-cyan-400 via-blue-500 to-purple-500 text-white 
                shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:scale-[1.02] transition"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>
       <motion.button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r 
          from-cyan-400 via-blue-500 to-purple-500 shadow-lg hover:scale-110 transition"
        whileHover={{ rotate: 10 }}
      >
        💬
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-20 right-6 w-80 md:w-96 h-[420px] 
              bg-gray-900/90 border border-cyan-400/40 rounded-2xl 
              shadow-[0_0_35px_rgba(0,255,255,0.4)] backdrop-blur-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-t-2xl">
              Sikkim Travel Assistant
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl max-w-[80%] ${
                    m.from === "user"
                      ? "bg-cyan-500/20 ml-auto text-cyan-300"
                      : "bg-gray-800/70 mr-auto text-gray-200"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="flex items-center border-t border-gray-700"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your plan..."
                className="flex-1 bg-transparent px-3 py-2 outline-none text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 text-cyan-400 font-bold hover:text-cyan-300"
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
