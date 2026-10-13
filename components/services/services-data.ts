// Shared data for the /services page. Prices mirror canonical/pricing-framework.md.
// DRAFT: per-tier times tagged {{UNVALIDATED}} need operator confirmation. Proof images wired from public/services/.

export type VehicleClass = "sedan" | "suv5" | "suv7" | "oversized";

export const VEHICLE_CLASSES: { id: VehicleClass; label: string; example: string }[] = [
  { id: "sedan", label: "Sedan / Coupe", example: "Camry, Civic, most cars" },
  { id: "suv5", label: "5-Seat SUV / Truck", example: "RAV4, F-150, midsize" },
  { id: "suv7", label: "7-Seat SUV / Van", example: "Tahoe, Pilot, minivan" },
  { id: "oversized", label: "Oversized", example: "Dually, Sprinter, quoted" },
];

export type PriceSet = { sedan: number; suv5: number; suv7: number };
export type TimeSet = { sedan: string; suv5: string; suv7: string };

export interface Service {
  slug: string;
  name: string;
  description: string;
  prices: PriceSet;
  timeEstimate: TimeSet; // reacts to selected vehicle size, like price
  mostPopular?: boolean;
  features: string[];
  excludedFeatures?: string[];
  upgrade?: { text: string; price: number }; // optional upsell note rendered on the card
  image?: string; // undefined = render a labeled placeholder (operator swaps)
  imagePosition?: string; // object-position for the card photo. "center 70%" shows lower in the frame, "center 30%" higher. Default center.
}

export const SERVICES: Service[] = [
  {
    slug: "exterior-refresh",
    name: "Exterior Refresh",
    description:
      "When your car just needs the outside cleaned up, this is the one. A two-step exterior wash finished with a spray wax for shine, plus your wheels, tires, and door jambs. Recommended every 2 to 4 weeks to stay ahead of the grime.",
    prices: { sedan: 80, suv5: 100, suv7: 120 },
    timeEstimate: { sedan: "30-45m", suv5: "45m-1h", suv7: "1h+" },
    features: [
      "Hand wash & dry",
      "Wheels, tires, & wheel wells cleaned",
      "Tire dressing",
      "Trim dressing",
      "Spray wax (shine)",
      "Door jambs cleaned",
      "Windows cleaned",
    ],
    excludedFeatures: ["Interior cleaning", "Decontamination (iron removal + clay bar)"],
    upgrade: { text: "Upgrade the wax to a 3-month ceramic sealant", price: 30 },
    image: "/services/exterior-refresh-bakersfield.webp",
    imagePosition: "center 40%",
  },
  {
    slug: "signature-detail",
    name: "Signature Detail",
    description:
      "Our entry-level detail, and where most people start. You get a two-step exterior wash finished with a ceramic sealant that beads off water and keeps your paint slick and glossy for up to 3 months, plus a full interior blowout and vacuum with every panel, compartment, and console cleaned.",
    prices: { sedan: 150, suv5: 180, suv7: 210 },
    timeEstimate: { sedan: "1h", suv5: "1h-1.5h", suv7: "1.5h+" },
    mostPopular: true,
    features: [
      "Hand wash & dry",
      "Wheels, tires, & wheel wells cleaned",
      "Tire dressing",
      "Trim dressing",
      "3-month ceramic sealant",
      "Full interior blowout & vacuum",
      "All interior panels, compartments, and console cleaned",
      "Door jambs cleaned",
      "Windows cleaned",
    ],
    excludedFeatures: [
      "Decontamination (iron removal + clay bar)",
      "Shampoo & extraction",
      "Interior UV dressing",
    ],
    image: "/services/signature-detail-bakersfield.webp",
  },
  {
    slug: "clay-n-seal",
    name: "Clay n Seal",
    description:
      "If your paint feels rough, this service is for you! An iron and clay decontamination pulls bonded iron and road grime off the paint and leaves it smooth to the touch. Then a ceramic sealant is applied for a slick, high-gloss surface that lasts 6+ months.",
    prices: { sedan: 150, suv5: 180, suv7: 210 },
    timeEstimate: { sedan: "1h", suv5: "1.5h", suv7: "1.5h+" },
    features: [
      "Hand wash & dry",
      "Wheels, tires, & wheel wells deep cleaned",
      "Water spot removal (unless etched)",
      "Iron decontamination (removes bonded metallic contamination)",
      "Tar, tree sap, & road grime decontamination",
      "Clay bar treatment (paint smooth to the touch)",
      "6-month ceramic sealant",
      "Trim dressing",
      "Tire dressing",
      "Door jambs cleaned",
      "Windows cleaned",
    ],
    excludedFeatures: ["Interior cleaning", "Paint correction"],
    image: "/services/clay-n-seal-bakersfield.webp",
  },
  {
    slug: "interior-detail",
    name: "Interior Detail",
    description:
      "If your interior has taken a beating from kids, pets, or daily life, this brings it back. Your seats and carpets get shampooed and extracted, every panel deep cleaned, and all surfaces UV protected, so the inside feels normal again.",
    prices: { sedan: 200, suv5: 230, suv7: 260 },
    timeEstimate: { sedan: "2h", suv5: "2.5h", suv7: "3h+" },
    features: [
      "Full interior blowout & vacuum",
      "All interior panels, compartments, and console cleaned",
      "Carpet & seat shampoo with extraction",
      "UV interior protectant",
      "Interior windows cleaned",
      "Door jambs cleaned",
    ],
    excludedFeatures: ["Exterior wash"],
    image: "/services/interior-detail-bakersfield.webp",
    imagePosition: "center 30%",
  },
  {
    slug: "full-detail",
    name: "Full Detail",
    description:
      "When your car hasn't been detailed in a while and needs attention everywhere, this is the complete reset, inside and out. A two-step exterior wash sealed with a 3-month ceramic sealant that keeps your paint slick and glossy, plus a deep interior clean with carpets and seats shampooed and extracted.",
    prices: { sedan: 350, suv5: 380, suv7: 410 },
    timeEstimate: { sedan: "3h", suv5: "4h", suv7: "5h+" },
    features: [
      "Hand wash & dry",
      "Wheels, tires, & wheel wells deep cleaned",
      "Tire dressing",
      "Trim dressing",
      "3-month ceramic sealant",
      "Full interior blowout & vacuum",
      "All interior panels, compartments, and console cleaned",
      "Carpet & seat shampoo with extraction",
      "UV interior protectant",
      "Windows (interior & exterior)",
      "Door jambs cleaned",
    ],
    excludedFeatures: ["Decontamination (iron removal + clay bar)"],
    image: "/services/full-detail-bakersfield.webp",
  },
];

export interface MaintenancePlan {
  name: string;
  prices: PriceSet;
  mostCommon?: boolean;
  note: string;
}

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    name: "Every 2 Weeks",
    prices: { sedan: 90, suv5: 120, suv7: 150 },
    note: "Light touch-up. The car hasn't had time to get dirty.",
  },
  {
    name: "Monthly",
    prices: { sedan: 110, suv5: 140, suv7: 170 },
    mostCommon: true,
    note: "A few weeks of dust and daily driving, brought back to clean.",
  },
  {
    name: "Every 2 Months",
    prices: { sedan: 150, suv5: 180, suv7: 210 },
    note: "Two months of buildup, so each visit does a little more.",
  },
  {
    name: "Quarterly",
    prices: { sedan: 190, suv5: 220, suv7: 250 },
    note: "Three months of buildup. The deepest visit of the four.",
  },
];

export interface AddOn {
  name: string;
  price: number;
  blurb: string;
}

export const ADDONS: AddOn[] = [
  {
    name: "Headlight Restoration",
    price: 100,
    blurb:
      "For yellowed, oxidized headlights and failing clear coat. Sealed with Cerakote and backed by a 1-year warranty.",
  },
  {
    name: "Trim Restoration",
    price: 100,
    blurb:
      "For faded black plastic trim. Restored with Solution Finish, good for around 8 months before a touch-up.",
  },
  {
    name: "Water Spot Removal",
    price: 50,
    blurb: "For heavy water spotting from sprinklers and hard water. Removes what a normal wash can't.",
  },
  {
    name: "Pet Hair & Sand Removal",
    price: 50,
    blurb: "For pet hair and sand worked into the carpet and seats. We pull what a vacuum leaves.",
  },
  {
    name: "Engine Bay Detail",
    price: 50,
    blurb: "For a grimy engine bay. Degreased and dressed so it looks factory-clean.",
  },
];
