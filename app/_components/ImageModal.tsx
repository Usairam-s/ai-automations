"use client";

import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ImageModalProps {
  imageUrl: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({
  imageUrl,
  alt,
  isOpen,
  onClose,
}: ImageModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-7xl mx-auto"
          >
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 bg-white rounded-full p-1 text-black hover:bg-gray-200 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <img
              src={imageUrl}
              alt={alt}
              className="max-h-[90vh] object-contain rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
