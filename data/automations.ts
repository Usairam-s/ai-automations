const automations = [
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
      input: ["Prospect’s LinkedIn URL", "Company website URL"],
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
];

export default automations;
