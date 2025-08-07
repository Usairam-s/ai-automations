"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type ProductType = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  previewImage: string;
  livePreviewUrl?: string;
};

interface Props {
  products: ProductType[];
}

// Sample data for demonstration
const sampleProducts: ProductType[] = [
  {
    id: "1",
    title: "Free AI Background Remover",
    description:
      "Instantly remove image backgrounds using powerful AI — no design skills needed. Upload your image and get a clean, transparent background in seconds.",
    techStack: ["Nextjs", "Make.com", "AI"],
    previewImage:
      "https://res.cloudinary.com/dmx22dkwy/image/upload/v1754525924/ai_remove_zjcic0.png",
    livePreviewUrl: "https://ai-removebg.netlify.app/",
  },
];

export default function MiniProductsShowcase({
  products = sampleProducts,
}: Props) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <>
      <Link
        href="/"
        className="absolute top-6 left-8 px-4 py-2 text-white text-sm font-thin rounded-md border border-white
             hover:bg-white hover:text-black transition duration-300 ease-in-out shadow-md
             hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.7)]"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        ← Back to Home
      </Link>
      <div className="min-h-screen  py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mini Products
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Custom code + Make.com products
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="space-y-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onHoverStart={() => setHoveredCard(product.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <motion.h3
                      className="text-2xl font-bold text-white mb-4"
                      animate={{
                        color:
                          hoveredCard === product.id ? "#60a5fa" : "#ffffff",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {product.title}
                    </motion.h3>

                    <p className="text-gray-300 leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wider">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {product.techStack.map((tech, idx) => (
                          <motion.span
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium border border-gray-600 hover:border-blue-500 transition-colors"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Live Preview Button */}
                    {product.livePreviewUrl && (
                      <motion.a
                        href={product.livePreviewUrl}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 w-fit"
                        target="_blank"
                      >
                        <span>Live Preview</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </motion.a>
                    )}
                  </div>

                  {/* Right Preview Image */}
                  <div className="relative h-64 lg:h-full min-h-[300px]">
                    <motion.div
                      className="absolute inset-0 overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <img
                        src={product.previewImage}
                        alt={`${product.title} preview`}
                        className="w-full h-full object-cover"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 via-transparent to-transparent" />

                      {/* Hover Effect */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredCard === product.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-blue-600/10 flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{
                            scale: hoveredCard === product.id ? 1 : 0.8,
                          }}
                          transition={{ duration: 0.3 }}
                          className="bg-white/20 backdrop-blur-sm rounded-full p-4"
                        >
                          <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No products available
              </h3>
              <p className="text-gray-500">
                Check back soon for new mini products
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
