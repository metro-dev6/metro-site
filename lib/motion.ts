export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

// Scroll-triggered fade-up for section headers and standalone blocks.
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: EASE_OUT },
};

// Scroll-triggered stagger container for card grids. Pair with staggerItem on children.
export const staggerContainer = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-80px" },
  variants: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

// Mount-time (not scroll-triggered) fade-up for above-the-fold content, e.g. Hero.
export const fadeUpMount = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE_OUT },
};

export const staggerContainerMount = {
  initial: "hidden",
  animate: "show",
  variants: {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  },
};
