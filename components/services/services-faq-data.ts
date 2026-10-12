// FAQ for /services. Feeds both the rendered FAQ (reuses components/sections/FAQ.tsx, light theme)
// and the FAQPage JSON-LD in app/services/page.tsx. Answer-first, Metro voice, accurate to current scope.

export interface ServiceFaqItem {
  q: string;
  a: string;
}

export const SERVICES_FAQS: ServiceFaqItem[] = [
  {
    q: "What is clay bar treatment?",
    a: "A clay bar pulls bonded contamination out of the clear coat that soap and water leave behind. After it, the paint feels glass-smooth instead of gritty. It's included in Clay n Seal, the only package with decontamination.",
  },
  {
    q: "How long does the ceramic sealant last?",
    a: "Signature Detail and Full Detail include a 3-month ceramic sealant. Clay n Seal includes a 6-month ceramic sealant, since the decontamination lets it bond longer. Exterior Refresh is finished with a spray wax for shine, which you can upgrade to the 3-month ceramic sealant for $30. Water beads off and the paint stays cleaner between washes.",
  },
  {
    q: "How long does a detail take?",
    a: "Exterior Refresh runs 30 to 45 minutes. A Signature Detail is about an hour. A Full Detail runs 4 to 6 plus hours. We confirm a time when we book.",
  },
  {
    q: "Do you come to me?",
    a: "Yes. We're fully mobile. We bring the water, power, and equipment to your driveway, lot, or office. You don't go anywhere.",
  },
  {
    q: "How is the final price set?",
    a: "The price you see is the starting price for your vehicle size. We confirm the final number at the walk-around before we touch the car. Nothing changes without your sign-off.",
  },
];
