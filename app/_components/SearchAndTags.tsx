// components/SearchAndTags.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const allTags = [
  "Gmail",
  "Airtable",
  "Calendly",
  "HubSpot",
  "Notion",
  "Stripe",
  "Webhook",
  "PDF Generator",
  "ChatGPT",
  "Google Sheets",
  "Slack",
  "Discord",
  "Twitter",
  "OpenAI",
  "CRM",
];

interface SearchAndTagsProps {
  onSearch: (text: string) => void;
  onTagClick: (tag: string) => void;
  activeTag: string | null;
  searchText: string;
  onResetFilters: () => void;
}

export default function SearchAndTags({
  onSearch,
  onTagClick,
  activeTag,
  searchText,
  onResetFilters,
}: SearchAndTagsProps) {
  const [visibleTags, setVisibleTags] = useState<string[]>([]);

  useEffect(() => {
    const rotateTags = () => {
      const shuffled = allTags.sort(() => 0.5 - Math.random());
      setVisibleTags(shuffled.slice(0, 5));
    };

    rotateTags();
    const interval = setInterval(rotateTags, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search automations..."
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchText && (
            <button
              onClick={() => onSearch("")}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* <div className="mt-6 flex flex-wrap gap-2 items-center">
          <AnimatePresence>
            {visibleTags.map((tag, idx) => (
              <motion.button
                key={tag}
                onClick={() => onTagClick(tag)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: idx * 0.1 }}
                className={`px-4 py-1 ${
                  activeTag === tag
                    ? "bg-blue-600"
                    : "bg-gray-700 hover:bg-blue-600"
                } text-white rounded-full text-sm transition-colors duration-200`}
              >
                #{tag}
              </motion.button>
            ))}
          </AnimatePresence>
          {(activeTag || searchText) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={onResetFilters}
              className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm transition-colors duration-200"
            >
              Clear All Filters
            </motion.button>
          )}
        </div> */}
      </div>
    </div>
  );
}
