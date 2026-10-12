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
      "A two-step exterior wash finished with a spray wax for shine, plus wheels, tires, and door jambs. For a maintained car that just needs the outside cleaned.",
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
      "A full exterior wash finished with a ceramic sealant that beads off water and keeps the paint slick and glossy for up to 3 months, plus a full interior clean inside. Recommended every 2 to 4 weeks.",
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
      "When your paint feels rough or looks hazy, this strips it clean. An iron and clay decontamination pulls bonded iron, tar, and road grime off the paint and leaves it smooth to the touch. Then a ceramic sealant goes on for a slick, high-gloss surface that lasts 6+ months.",
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
      "A full reset for an interior worn down by kids, pets, or daily life. Seats and carpets are shampooed and extracted, every panel is deep cleaned, all surfaces are UV protected, and your interior is back to normal.",
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
      "The complete reset, inside and out. A full exterior wash sealed with a 3-month ceramic sealant that beads off water and keeps the paint slick and glossy, plus a deep interior clean with carpets and seats shampooed and extracted. Our pick when a car hasn't been detailed in a while and needs attention everywhere.",
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
  scope: string;
  prices: PriceSet;
  mostCommon?: boolean;
  note: string;
}

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    name: "Monthly",
    scope: "Signature Detail scope",
    prices: { sedan: 110, suv5: 140, suv7: 170 },
    mostCommon: true,
    note: "Light touch-up. The car hasn't had time to get dirty.",
  },
  {
    name: "Every 2 Months",
    scope: "Signature Detail to Full Detail",
    prices: { sedan: 140, suv5: 170, suv7: 200 },
    note: "Trends toward a Full Detail depending on how you drive.",
  },
  {
    name: "Quarterly",
    scope: "Full Detail scope",
    prices: { sedan: 170, suv5: 200, suv7: 230 },
    note: "Full Detail attention given three months of buildup.",
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
