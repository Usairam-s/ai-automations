// components/ScrollButton.tsx
"use client";
import { motion } from "framer-motion";

export default function ScrollButton() {
  const scrollToContent = () => {
    const section = document.getElementById("automations");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToContent}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="mt-10 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg"
    >
      ↓ Explore Automations
    </motion.button>
  );
}
