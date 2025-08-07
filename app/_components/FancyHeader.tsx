// components/FancyHeader.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FancyHeader() {
  const scrollToContent = () => {
    const section = document.getElementById("automations");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Link
        href="/mini-products"
        className="absolute top-6 right-8 px-4 py-2 text-white text-sm font-thin rounded-md border border-white
             hover:bg-white hover:text-black transition duration-300 ease-in-out shadow-md
             hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.7)]"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        Mini Products ↗
      </Link>

      <section className="h-screen flex flex-col items-center justify-center text-center bg-black text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-br from-gray-100 via-gray-400 to-gray-100 bg-clip-text text-transparent tracking-tight max-w-4xl mx-auto"
        >
          Automate Everything with{" "}
          <span className="text-blue-400">Make.com</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-lg md:text-2xl text-gray-300 max-w-xl mx-auto"
        >
          Showcasing powerful workflows powered by AI and automation
        </motion.p>

        <motion.button
          onClick={scrollToContent}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md"
        >
          ↓ Explore Automations
        </motion.button>
      </section>
    </div>
  );
}
