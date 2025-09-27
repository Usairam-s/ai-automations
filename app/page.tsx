"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useState, useEffect } from "react";

// Add this type for form data
type FormData = {
  name: string;
  email: string;
  message: string;
};

// Add this validation function
const validateForm = (data: FormData) => {
  const errors: { [key: string]: string } = {};

  if (!data.name.trim()) {
    errors.name = "Hey there, don't be shy! Tell me your name 😊";
  }

  if (!data.email.trim()) {
    errors.email = "Oops! Forgot your email? I promise not to spam you 📧";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Hmm, that email looks a bit suspicious 🤔";
  }

  if (!data.message.trim()) {
    errors.message =
      "Don't leave me hanging! What's your awesome project about? ✨";
  } else if (data.message.trim().length < 10) {
    errors.message = "C'mon, tell me a bit more! I'm all ears 👂";
  }

  return errors;
};

// Types
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

// Your actual Make.com automation data
const makeAutomations: AutomationType[] = [
  {
    id: "automation-1",
    title: "Clean Up Resumes to One Standard Format in Seconds",
    tags: ["Gmail", "Airtable", "Email"],
    images: [
      {
        id: "img-1",
        url: "https://res.cloudinary.com/dmx22dkwy/image/upload/v1754349048/pdf_parser_mc1twt.png",
        alt: "Gmail Airtable Integration Preview",
      },
    ],
    description:
      "Upload a messy PDF resume and get a clean, editable Google Doc formatted using AI – delivered via email in seconds.",
    details: {
      input: [
        "Resume file (PDF)",
        "Recipient email address",
        "Optional: Custom formatting preferences",
      ],
      process: [
        "User uploads resume and provides email",
        "Automation extracts content from PDF",
        "Google Gemini AI applies standard formatting",
        "Clean, editable resume is created in Google Docs",
        "Final document is emailed to the user",
      ],
      output: [
        "Professionally formatted Google Doc resume",
        "Email delivered to specified address",
        "Optional backup link generated",
      ],
      benefits: [
        "Save hours on manual formatting",
        "Ensure all resumes follow a clean, consistent template",
        "Fully editable and customizable output",
        "Ideal for recruiters, hiring managers, and VAs",
      ],
    },
  },
  {
    id: "automation-2",
    title: "Generate Prospect Intel Before Sales Call",
    tags: ["LinkedIn", "OpenAI", "Website Scraper"],
    images: [
      {
        id: "img-1",
        url: "https://res.cloudinary.com/dmx22dkwy/image/upload/v1754349562/sales_rep_awodkb.png",
        alt: "LinkedIn and Website Scraper Automation",
      },
    ],
    description:
      "Drop in a LinkedIn + website URL and get an AI-generated briefing with company + prospect insights before your sales call.",
    details: {
      input: ["Prospect's LinkedIn URL", "Company website URL"],
      process: [
        "Scrape LinkedIn profile for summary",
        "Scrape company site for context",
        "AI analyzes both for relevant insights",
        "Generates a short briefing with key talking points",
      ],
      output: [
        "Prospect summary",
        "Company overview",
        "AI-curated pitch angle for the call",
      ],
      benefits: [
        "Skip manual research",
        "Be fully prepared before the call",
        "Custom pitch ideas in seconds",
      ],
    },
  },
  {
    id: "automation-3",
    title: "Smart Appointment Slot Checker Using ChatGPT",
    tags: ["Google Calendar", "ChatGPT", "Voice Agent"],
    images: [
      {
        id: "img-3",
        url: "https://res.cloudinary.com/dmx22dkwy/image/upload/v1754385460/check_f5wlv8.png",
        alt: "Google Calendar Slot Availability Checker Automation",
      },
    ],
    description:
      "Input a date & time and instantly check if the appointment slot is available. Designed for AI Appointment setter voice agents to respond naturally to booking requests.",
    details: {
      input: ["User-provided date & time"],
      process: [
        "Check if the date is a Sunday — if so, return a friendly no-booking message",
        "If not Sunday, query Google Calendar for booked slots",
        "Use ChatGPT to find and format available time slots",
        "Respond in natural language with available booking times",
      ],
      output: [
        "Message indicating unavailability on Sundays (if applicable)",
        "List of available time slots in friendly tone",
      ],
      benefits: [
        "Fully automated calendar availability check",
        "Human-like responses via ChatGPT",
        "Works seamlessly with voice agents",
        "Saves time for booking assistants and teams",
      ],
    },
  },
  {
    id: "automation-4",
    title: "Auto-Reschedule Calendar Events via Voice Agent",
    tags: ["Calendar", "CRM", "Voice Agent", "Google Sheets"],
    images: [
      {
        id: "img-1",
        url: "https://res.cloudinary.com/dmx22dkwy/image/upload/v1754386030/res_xqctg4.png",
        alt: "Automated Calendar Rescheduling",
      },
    ],
    description:
      "User speaks new appointment time to the voice agent, and the system handles full rescheduling: updates calendar, deletes old event, and syncs CRM or Google Sheets instantly.",
    details: {
      input: ["New date & time", "Old date & time"],
      process: [
        "Create a new event using the new date & time",
        "Search for the old event using previous date & time",
        "If found, delete the old event",
        "Update CRM or Google Sheets with new appointment details",
      ],
      output: [
        "Updated calendar event",
        "Old event removed",
        "Synced CRM or database entry",
      ],
      benefits: [
        "Fully hands-free rescheduling",
        "Voice-driven calendar automation",
        "No manual double entry in CRM or sheets",
      ],
    },
  },
  {
    id: "automation-5",
    title: "Auto-Cancel Appointments via Voice Agent",
    tags: ["Calendar", "CRM", "Voice Agent", "Google Calendar"],
    images: [
      {
        id: "img-1",
        url: "https://res.cloudinary.com/dmx22dkwy/image/upload/v1754386430/cancel_yfnwps.png",
        alt: "Automated Appointment Cancellation",
      },
    ],
    description:
      "User tells the voice agent a date & time, automation verifies it with CRM, deletes the event from Google Calendar, updates CRM, and confirms cancellation.",
    details: {
      input: ["Date & time of appointment (via voice)"],
      process: [
        "Capture date & time from user via voice agent",
        "Verify appointment exists in CRM/database",
        "Search & delete event from Google Calendar",
        "Update CRM to reflect cancellation",
        "Respond to user with confirmation or error",
      ],
      output: [
        "Event removed from Google Calendar",
        "CRM marked as cancelled",
        "User notified of success/failure",
      ],
      benefits: [
        "Hands-free appointment cancellation",
        "CRM and calendar always in sync",
        "Reduces no-shows and admin effort",
      ],
    },
  },
  {
    id: "automation-6",
    title: "Remove Background from Images with AI Totally Free",
    tags: ["Custom Code", "Make.com", "AI"],
    images: [
      {
        id: "img-1",
        url: "https://res.cloudinary.com/dmx22dkwy/image/upload/v1754527766/Screenshot_2025-08-07_054112_pitmpj.png",
        alt: "AI Background Remover Screenshot",
      },
    ],
    description:
      "Enter an image URL, and the AI will automatically remove the background and return a transparent version of the image — all for free.",
    details: {
      input: ["Image URL"],
      process: [
        "User submits an image URL",
        "Automation processes the image to remove its background",
        "Final image with transparent background is returned",
      ],
      output: ["Transparent-background image"],
      benefits: [
        "Completely free to use",
        "No software installation required",
        "Perfect for selfies, headshots, product photos, and more",
      ],
    },
  },
];

// Sample n8n automations (you can replace with your actual data)
const n8nAutomations: AutomationType[] = [
  {
    id: "automation-1",
    title: "RAG Customer Support Agent",
    tags: ["n8n", "Pinecone", "Gmail", "ChatGPT"],
    images: [
      {
        id: "n8n-1",
        url: "https://res.cloudinary.com/dmx22dkwy/image/upload/v1758993060/n1_xswnh2.png",
        alt: "n8n workflow preview",
      },
      {
        id: "n8n-2",
        url: "https://res.cloudinary.com/dmx22dkwy/image/upload/v1758993072/n2_hfrntp.png",
        alt: "n8n workflow preview",
      },
    ],
    description:
      "AI-powered customer support agent that retrieves answers from your knowledge base to respond to customer emails automatically.",
    details: {
      input: ["Your Customer Query Through Gmail"],
      process: [
        "Calssify the query to see If its Customer Support related",
        "Pass Query to Agent that uses Pinecone and ChatGPT",
        "Get anwser from your Business knowledge base",
      ],

      output: [
        "Automate response to any query with exact bussiness information back to the customer through Gmail",
      ],
      benefits: [
        "No Manaul Replies",
        "Save Time",
        "Increase Customer Satisfaction",
        "24/7 Support",
      ],
    },
  },
  // Add more n8n automations here
  {
    id: "automation-2",
    title: "Invoice Processing and Data Extraction",
    tags: ["n8n", "Google Gemini AI", "Google Sheets", "Google Drive"],
    images: [
      {
        id: "n8n-1",
        url: "https://res.cloudinary.com/dmx22dkwy/image/upload/v1758994000/n2_bvmm2z.png",
        alt: "n8n workflow preview",
      },
    ],
    description:
      "Automate the extraction of key data from invoices and store it in a structured format for easy access and make your customer database for future use.",
    details: {
      input: ["Invoice PDF"],
      process: [
        "Upload Invoice PDF to Google Drive",
        "Extract key data from invoice using Google Gemini AI",
        "Store extracted data in Google Sheets",
      ],

      output: ["Structured invoice data in Google Sheets"],
      benefits: [
        "No Manual Data Entry",
        "Save Time",
        "Increase Accuracy",
        "Easy Access to Invoice Data",
      ],
    },
  },
  {
    id: "automation-3",
    title: "Reserach Based LInkedIn Post Generator",
    tags: ["n8n", "Tavily API", "Google Sheets", "Google Gemini AI"],
    images: [
      {
        id: "n8n-1",
        url: "https://res.cloudinary.com/dmx22dkwy/image/upload/v1758994453/n1_mzch7w.png",
        alt: "n8n workflow preview",
      },
    ],
    description:
      "Generate engaging LinkedIn posts based on trending topics and research data from Web using Tvalily API to boost your professional presence.",
    details: {
      input: ["Post Topic"],
      process: [
        "Use Tavily API to fetch relevant articles and data from the web",
        "Get top 3 search results from Tavily API",
        "Analyze the content using Google Gemini AI",
        "Generate a well-structured LinkedIn post",
      ],

      output: ["Generated LinkedIn Post"],
      benefits: [
        "No Manual Writing",
        "Save Time",
        "Increase Engagement",
        "Boost Professional Presence",
      ],
    },
  },
];

// Mouse follower component
// Update MouseFollower component with smoother spring config
const MouseFollower = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smoother spring configuration
  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      <div className="w-full h-full bg-white rounded-full opacity-50 blur-[1px]" />
    </motion.div>
  );
};

// Animated background particles
const BackgroundParticles = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Image Modal Component
const ImageModal = ({
  imageUrl,
  alt,
  isOpen,
  onClose,
}: {
  imageUrl: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, rotateY: -90 }}
          animate={{ scale: 1, rotateY: 0 }}
          exit={{ scale: 0.8, rotateY: 90 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-7xl mx-auto"
        >
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-110"
          >
            ✕
          </button>
          <img
            src={imageUrl}
            alt={alt}
            className="max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Automation Showcase Component
const AutomationShowcase = ({
  automations,
}: {
  automations: AutomationType[];
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
      {/* Enhanced Sidebar with fixed height */}
      <aside className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 h-[85vh] overflow-hidden border border-gray-700/50 shadow-2xl">
        <div className="h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-600/50">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            />
            <h3 className="text-lg font-semibold text-white">Quick Access</h3>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-transparent">
            {automations.length > 0 ? (
              <ul className="space-y-3">
                {automations.map((auto, index) => (
                  <motion.li
                    key={auto.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <button
                      onClick={() => {
                        const el = document.getElementById(auto.id);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group-hover:border-blue-400/50 border border-transparent"
                    >
                      <div className="flex items-center gap-3">
                        <motion.span
                          className="text-blue-400 text-lg leading-none"
                          whileHover={{ scale: 1.2, rotate: 90 }}
                        >
                          ⚡
                        </motion.span>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-2">
                          {auto.title}
                        </span>
                      </div>
                    </button>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-400 text-sm flex items-center gap-2 p-4 rounded-lg bg-gray-800/30"
              >
                <span className="text-gray-500">•</span>
                No automations found
              </motion.p>
            )}
          </div>
        </div>
      </aside>

      {/* Enhanced Main Cards with fixed height */}
      <main className="h-[85vh] overflow-hidden">
        <div className="h-full overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
          {automations.length > 0 ? (
            <motion.div layout className="space-y-8 pb-8">
              {automations.map((auto, index) => (
                <motion.div
                  layout
                  key={auto.id}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -50, rotateX: 15 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  id={auto.id}
                  className="group relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-blue-500/25"
                >
                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-purple-400/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />

                  <div className="flex justify-between items-start mb-6">
                    <motion.h3
                      className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {auto.title}
                    </motion.h3>
                    <motion.button
                      onClick={() => toggleExpand(auto.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 rounded-full transition-all duration-300 border border-blue-400/30 hover:border-blue-400/60"
                    >
                      <span className="text-sm text-gray-300">
                        {expandedId === auto.id
                          ? "Hide details"
                          : "Show details"}
                      </span>
                      <motion.span
                        className="text-gray-400"
                        animate={{ rotate: expandedId === auto.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ↓
                      </motion.span>
                    </motion.button>
                  </div>

                  {/* Enhanced Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {auto.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-xs rounded-full border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 cursor-pointer"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Enhanced Images */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {auto.images.map((image, imgIndex) => (
                      <motion.button
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + imgIndex * 0.1 }}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        onClick={() => setSelectedImage(image)}
                        className="relative aspect-video overflow-hidden rounded-lg hover:ring-2 hover:ring-blue-500 transition-all duration-300 bg-gradient-to-br from-gray-700/50 to-gray-800/50 group/img"
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-all duration-300 group-hover/img:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                            Click to expand
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <motion.p
                    className="text-gray-300 mb-6 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {auto.description}
                  </motion.p>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedId === auto.id ? "auto" : 0,
                      opacity: expandedId === auto.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-8 pt-6 border-t border-gray-600/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{
                            x: 0,
                            opacity: expandedId === auto.id ? 1 : 0,
                          }}
                          transition={{ delay: 0.1 }}
                          className="bg-gradient-to-br from-blue-500/10 to-transparent p-6 rounded-xl border border-blue-400/20"
                        >
                          <h4 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                            <span>📥</span> Input Required
                          </h4>
                          <ul className="space-y-3">
                            {auto.details.input.map((item, idx) => (
                              <motion.li
                                key={idx}
                                className="flex items-start gap-3"
                                initial={{ x: -10, opacity: 0 }}
                                animate={{
                                  x: 0,
                                  opacity: expandedId === auto.id ? 1 : 0,
                                }}
                                transition={{ delay: 0.2 + idx * 0.05 }}
                              >
                                <span className="text-blue-400 mt-1">▸</span>
                                <span className="text-gray-300">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>

                        {/* Process Section */}
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{
                            x: 0,
                            opacity: expandedId === auto.id ? 1 : 0,
                          }}
                          transition={{ delay: 0.15 }}
                          className="bg-gradient-to-br from-purple-500/10 to-transparent p-6 rounded-xl border border-purple-400/20"
                        >
                          <h4 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
                            <span>⚙️</span> How It Works
                          </h4>
                          <ul className="space-y-3">
                            {auto.details.process.map((item, idx) => (
                              <motion.li
                                key={idx}
                                className="flex items-start gap-3"
                                initial={{ x: 10, opacity: 0 }}
                                animate={{
                                  x: 0,
                                  opacity: expandedId === auto.id ? 1 : 0,
                                }}
                                transition={{ delay: 0.25 + idx * 0.05 }}
                              >
                                <span className="text-purple-400 mt-1">▸</span>
                                <span className="text-gray-300">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>

                        {/* Output Section */}
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{
                            x: 0,
                            opacity: expandedId === auto.id ? 1 : 0,
                          }}
                          transition={{ delay: 0.2 }}
                          className="bg-gradient-to-br from-green-500/10 to-transparent p-6 rounded-xl border border-green-400/20"
                        >
                          <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                            <span>📤</span> Output & Results
                          </h4>
                          <ul className="space-y-3">
                            {auto.details.output.map((item, idx) => (
                              <motion.li
                                key={idx}
                                className="flex items-start gap-3"
                                initial={{ x: -10, opacity: 0 }}
                                animate={{
                                  x: 0,
                                  opacity: expandedId === auto.id ? 1 : 0,
                                }}
                                transition={{ delay: 0.3 + idx * 0.05 }}
                              >
                                <span className="text-green-400 mt-1">▸</span>
                                <span className="text-gray-300">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>

                        {/* Benefits Section */}
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{
                            x: 0,
                            opacity: expandedId === auto.id ? 1 : 0,
                          }}
                          transition={{ delay: 0.25 }}
                          className="bg-gradient-to-br from-orange-500/10 to-transparent p-6 rounded-xl border border-orange-400/20"
                        >
                          <h4 className="text-lg font-semibold text-orange-400 mb-4 flex items-center gap-2">
                            <span>✨</span> Benefits
                          </h4>
                          <ul className="space-y-3">
                            {auto.details.benefits.map((item, idx) => (
                              <motion.li
                                key={idx}
                                className="flex items-start gap-3"
                                initial={{ x: 10, opacity: 0 }}
                                animate={{
                                  x: 0,
                                  opacity: expandedId === auto.id ? 1 : 0,
                                }}
                                transition={{ delay: 0.35 + idx * 0.05 }}
                              >
                                <span className="text-orange-400 mt-1">▸</span>
                                <span className="text-gray-300">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4 opacity-50"
              />
              <h3 className="text-2xl font-semibold text-gray-400 mb-2">
                No automations found
              </h3>
              <p className="text-gray-500">
                Try switching to a different platform
              </p>
            </motion.div>
          )}

          <ImageModal
            imageUrl={selectedImage?.url || ""}
            alt={selectedImage?.alt || ""}
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        </div>
      </main>
    </div>
  );
};

// Main Portfolio Component
export default function AutomationPortfolio() {
  // Add this state near your other state declarations at the top of the component
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [activePlatform, setActivePlatform] = useState<"n8n" | "make">("n8n");
  const [searchText, setSearchText] = useState("");

  const currentAutomations =
    activePlatform === "n8n" ? n8nAutomations : makeAutomations;

  const filteredAutomations = currentAutomations.filter(
    (auto) =>
      auto.title.toLowerCase().includes(searchText.toLowerCase()) ||
      auto.description.toLowerCase().includes(searchText.toLowerCase()) ||
      auto.tags.some((tag) =>
        tag.toLowerCase().includes(searchText.toLowerCase())
      )
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Background */}
      <BackgroundParticles />
      <MouseFollower />

      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black -z-10" />
      <motion.div
        className="fixed inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5 -z-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full bg-black/70 backdrop-blur-lg z-40 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent cursor-pointer"
            >
              AutomationPro
            </motion.h1>

            {/* Centered Navigation */}
            <div className="flex gap-8">
              {["Home", "Automations", "About", "Contact"].map(
                (item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() =>
                      scrollToSection(
                        item.toLowerCase() === "home"
                          ? "hero"
                          : item.toLowerCase()
                      )
                    }
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="relative hover:text-blue-400 transition-colors duration-300 group"
                  >
                    {item}
                    <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                  </motion.button>
                )
              )}
            </div>

            {/* Email with Copy Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={() => {
                  navigator.clipboard.writeText("your@email.com");
                  // You could add a toast notification here
                }}
                className="px-4 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-full border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 group flex items-center gap-2"
              >
                <span className="text-gray-300 group-hover:text-white">
                  useramaiapro@email.com
                </span>
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  className="text-blue-400"
                >
                  📋
                </motion.span>
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section
        id="hero"
        className="h-screen flex flex-col items-center justify-center text-center px-4 pt-16 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 relative"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent inline-block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              AI Automation
            </motion.span>
            <br />
            <motion.span
              className="text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Specialist
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Transforming businesses with powerful n8n and Make.com workflows.
            Specialized in AI-powered automation solutions that scale.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              onClick={() => scrollToSection("automations")}
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full font-semibold shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">View My Work</span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-gray-600 hover:border-blue-400 text-white rounded-full font-semibold transition-all duration-300 hover:bg-blue-400/10"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                rotate: [0, 360],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  i % 3 === 0
                    ? "bg-blue-400/30"
                    : i % 3 === 1
                    ? "bg-purple-400/30"
                    : "bg-cyan-400/30"
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-blue-400 rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Enhanced Platform Selection & Search */}
      <section id="automations" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2
              className="text-5xl font-bold mb-4"
              whileInView={{ scale: [0.9, 1] }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Featured Automations
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Explore my automation solutions across different platforms
            </motion.p>
          </motion.div>

          {/* Enhanced Platform Tabs */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gray-800/80 backdrop-blur-sm p-1 rounded-2xl flex gap-1 border border-gray-700/50 shadow-2xl">
              <motion.button
                onClick={() => setActivePlatform("n8n")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${
                  activePlatform === "n8n"
                    ? "text-white shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {activePlatform === "n8n" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">n8n Workflows</span>
              </motion.button>
              <motion.button
                onClick={() => setActivePlatform("make")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${
                  activePlatform === "make"
                    ? "text-white shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {activePlatform === "make" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">Make.com Scenarios</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Enhanced Search */}
          <motion.div
            className="max-w-md mx-auto mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search automations..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-gray-800/80 backdrop-blur-sm text-white border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-12"
              />
              <motion.div
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                🔍
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Automation Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <AutomationShowcase automations={filteredAutomations} />
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-br from-gray-900/50 to-black relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-5xl font-bold mb-8"
                whileInView={{ scale: [0.9, 1] }}
              >
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  About Me
                </span>
              </motion.h2>
              <motion.p
                className="text-lg text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                I'm a passionate automation specialist with expertise in n8n and
                Make.com platforms. With a strong software development
                background, I help businesses streamline operations through
                intelligent workflow automation, AI integration, and building
                seamless user-friendly solutions.
              </motion.p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { number: "50+", label: "Projects Completed", color: "blue" },
                  {
                    number: "80%",
                    label: "Avg Efficiency Gain",
                    color: "purple",
                  },
                  {
                    number: "24/7",
                    label: "Automation Uptime",
                    color: "green",
                  },
                  {
                    number: "100%",
                    label: "Client Satisfaction",
                    color: "orange",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-${stat.color}-400/50 transition-all duration-300 shadow-lg`}
                  >
                    <motion.h4
                      className={`text-${stat.color}-400 font-bold text-2xl mb-2`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    >
                      {stat.number}
                    </motion.h4>
                    <p className="text-sm text-gray-300">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  { label: "n8n Expert", color: "blue" },
                  { label: "Make.com Pro", color: "purple" },
                  { label: "AI Integration", color: "green" },
                  { label: "Workflow Design", color: "orange" },
                ].map((skill, index) => (
                  <motion.span
                    key={skill.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`px-4 py-2 bg-${skill.color}-500/20 text-${skill.color}-400 rounded-full text-sm border border-${skill.color}-400/30 hover:border-${skill.color}-400/60 transition-all duration-300 cursor-pointer`}
                  >
                    {skill.label}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              whileHover={{ rotateY: 5, scale: 1.02 }}
              className="w-full h-96 rounded-2xl relative overflow-hidden border border-gray-700/50 shadow-2xl"
            >
              {/* Full section background image */}
              <img
                src="/hq.png" // Replace with your photo path
                alt="Your Name"
                className="w-full h-full object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-semibold mb-2">Usairam Saleem</h3>
                <p className="text-gray-200">AI Automation Specialist</p>
              </div>

              {/* Keep the animated particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 5,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-5xl font-bold mb-6"
              whileInView={{ scale: [0.9, 1] }}
            >
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Ready to automate your business processes? Let's discuss your
              project and transform your workflows.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                {
                  icon: "📧",
                  title: "Email",
                  value: "useramaiapro@email.com",
                  color: "blue",
                },
                {
                  icon: "📞",
                  title: "WhatsApp",
                  value: "+92 310 3417877",
                  color: "purple",
                },
                // {
                //   icon: "🌍",
                //   title: "Location",
                //   value: "Remote",
                //   color: "green",
                // },
                {
                  icon: "⏰",
                  title: "Response Time",
                  value: "Within 24 hours",
                  color: "orange",
                },
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className={`flex items-center gap-6 p-6 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-${contact.color}-400/50 transition-all duration-300 shadow-lg group`}
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br from-${contact.color}-400/20 to-${contact.color}-500/20 rounded-2xl flex items-center justify-center text-2xl border border-${contact.color}-400/30 group-hover:border-${contact.color}-400/60 transition-all duration-300`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {contact.icon}
                  </motion.div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">
                      {contact.title}
                    </h4>
                    <p className="text-gray-300">{contact.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);

                const data = {
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  message: formData.get("message") as string,
                };

                const errors = validateForm(data);
                setFormErrors(errors);

                if (Object.keys(errors).length === 0) {
                  setFormStatus("loading");

                  try {
                    const response = await fetch(
                      "https://api.web3forms.com/submit",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          access_key: "2d903d5e-b1b5-4e5b-a237-34d2979419db",
                          ...data,
                          subject: `New Contact from ${data.name}`,
                        }),
                      }
                    );

                    if (response.ok) {
                      setFormStatus("success");
                      form.reset();
                      setTimeout(() => setFormStatus("idle"), 3000);
                    } else {
                      throw new Error("Failed to submit");
                    }
                  } catch (error) {
                    setFormStatus("error");
                    setTimeout(() => setFormStatus("idle"), 3000);
                  }
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  whileFocus={{ scale: 1.02, borderColor: "rgb(59, 130, 246)" }}
                  className={`w-full px-6 py-4 rounded-2xl bg-gray-800/80 backdrop-blur-sm text-white border ${
                    formErrors.name ? "border-red-500" : "border-gray-600/50"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                />
                {formErrors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 mt-2 ml-2 text-sm"
                  >
                    {formErrors.name}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  whileFocus={{ scale: 1.02, borderColor: "rgb(59, 130, 246)" }}
                  className={`w-full px-6 py-4 rounded-2xl bg-gray-800/80 backdrop-blur-sm text-white border ${
                    formErrors.email ? "border-red-500" : "border-gray-600/50"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                />
                {formErrors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 mt-2 ml-2 text-sm"
                  >
                    {formErrors.email}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={6}
                  whileFocus={{ scale: 1.02, borderColor: "rgb(59, 130, 246)" }}
                  className={`w-full px-6 py-4 rounded-2xl bg-gray-800/80 backdrop-blur-sm text-white border ${
                    formErrors.message ? "border-red-500" : "border-gray-600/50"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
                />
                {formErrors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 mt-2 ml-2 text-sm"
                  >
                    {formErrors.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
                disabled={formStatus === "loading"}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg relative overflow-hidden group disabled:opacity-70"
              >
                <span className="relative z-10">
                  {formStatus === "loading"
                    ? "Sending..."
                    : formStatus === "success"
                    ? "Message Sent! 🎉"
                    : formStatus === "error"
                    ? "Failed to Send 😢"
                    : "Send Message"}
                </span>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      {/* <footer className="py-12 border-t border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 to-purple-900/5" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-gray-400 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              © 2024 AutomationPro. All rights reserved. Built with passion for
              automation.
            </motion.p>
            <motion.div
              className="flex justify-center gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {["LinkedIn", "Twitter", "GitHub", "Email"].map(
                (social, index) => (
                  <motion.button
                    key={social}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="w-10 h-10 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                  >
                    {social[0]}
                  </motion.button>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </footer> */}
    </div>
  );
}
