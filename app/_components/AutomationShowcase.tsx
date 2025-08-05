// components/AutomationShowcase.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ImageModal from "./ImageModal";

type ImageType = {
  id: string;
  url: string;
  alt: string;
};

type AutomationType = {
  id: string;
  title: string;
  tags: string[];
  images: ImageType[];
  description: string;
  details: {
    input: string[];
    process: string[];
    output: string[];
    benefits: string[];
  };
};

interface Props {
  automations: AutomationType[];
}

export default function AutomationShowcase({ automations }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
      {/* Sidebar */}
      <aside className="bg-gray-900 rounded-lg p-4 max-h-[80vh] overflow-y-auto space-y-4 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">
          Quick Access
        </h3>
        {automations.length > 0 ? (
          <ul className="space-y-3">
            {automations.map((auto) => (
              <li key={auto.id} className="flex items-center gap-2">
                <span className="text-blue-400 text-lg leading-none">•</span>
                <button
                  onClick={() => {
                    const el = document.getElementById(auto.id);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-left text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  {auto.title}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-sm flex items-center gap-2"
          >
            <span className="text-gray-500">•</span>
            No automations found
          </motion.p>
        )}
      </aside>

      {/* Main Cards */}
      <main className="space-y-10">
        {automations.length > 0 ? (
          <motion.div layout className="space-y-10">
            {automations.map((auto) => (
              <motion.div
                layout
                key={auto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                id={auto.id}
                className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{auto.title}</h3>
                  <button
                    onClick={() => toggleExpand(auto.id)}
                    className="flex items-center gap-2 px-3 py-1 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <span className="text-sm text-gray-400">
                      {expandedId === auto.id ? "Hide details" : "Show details"}
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                        expandedId === auto.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Updated images section */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  {auto.images.map((image) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(image)}
                      className="relative aspect-video overflow-hidden rounded-lg hover:ring-2 hover:ring-blue-500 transition-all"
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                <p className="text-gray-300 mb-4">{auto.description}</p>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedId === auto.id ? "auto" : 0,
                    opacity: expandedId === auto.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6 pt-4 border-t border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Input Section */}
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">
                          Input Required
                        </h4>
                        <ul className="space-y-2">
                          {auto.details.input.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Process Section */}
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">
                          How It Works
                        </h4>
                        <ul className="space-y-2">
                          {auto.details.process.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Output Section */}
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">
                          Output & Results
                        </h4>
                        <ul className="space-y-2">
                          {auto.details.output.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits Section */}
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">
                          Benefits
                        </h4>
                        <ul className="space-y-2">
                          {auto.details.benefits.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No matching automations found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}

        {/* Image Modal */}
        <ImageModal
          imageUrl={selectedImage?.url || ""}
          alt={selectedImage?.alt || ""}
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </main>
    </div>
  );
}
