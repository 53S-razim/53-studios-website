import { Variants } from "framer-motion";

// ============================================
// Animation Variants for 53 Studios
// ============================================

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const scaleInUp: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// Stagger container variants
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// Stagger item variants
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// Slide animations (for overlays, menus)
export const slideUp: Variants = {
  hidden: { y: "100%" },
  visible: { 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: { 
    y: "100%",
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const slideDown: Variants = {
  hidden: { y: "-100%" },
  visible: { 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: { 
    y: "-100%",
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const slideLeft: Variants = {
  hidden: { x: "100%" },
  visible: { 
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: { 
    x: "100%",
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export const slideRight: Variants = {
  hidden: { x: "-100%" },
  visible: { 
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: { 
    x: "-100%",
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// Preloader animations
export const preloaderSlideUp: Variants = {
  hidden: { y: 0 },
  visible: { y: 0 },
  exit: { 
    y: "-100%",
    transition: { 
      duration: 0.8, 
      ease: [0.76, 0, 0.24, 1],
      delay: 0.2
    }
  }
};

export const preloaderLogoReveal: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.3
    }
  },
  exit: { 
    opacity: 0,
    scale: 1.1,
    transition: { duration: 0.3 }
  }
};

export const preloaderTextReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.8
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const preloaderProgressBar: Variants = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1,
    transition: { 
      duration: 2,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.5
    }
  }
};

// Split text animation helpers
export const splitTextContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1
    }
  }
};

export const splitTextChar: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    rotateX: -90
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
};

export const splitTextWord: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
};

export const splitTextLine: Variants = {
  hidden: { 
    opacity: 0, 
    y: "100%"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.76, 0, 0.24, 1] 
    }
  }
};

// Decorative line animations
export const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
};

export const lineGrowVertical: Variants = {
  hidden: { scaleY: 0 },
  visible: { 
    scaleY: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
};

// Counter animation (for stats)
export const counterReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
};

// Image reveal animations
export const imageReveal: Variants = {
  hidden: { 
    opacity: 0,
    scale: 1.1
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
};

export const imageMaskReveal: Variants = {
  hidden: { 
    clipPath: "inset(100% 0 0 0)"
  },
  visible: { 
    clipPath: "inset(0% 0 0 0)",
    transition: { 
      duration: 1, 
      ease: [0.76, 0, 0.24, 1] 
    }
  }
};

// Hover animations
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
};

export const hoverLift = {
  y: -8,
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
};

// Tap animations
export const tapScale = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// Utility: Create custom stagger container
export function createStaggerContainer(staggerDelay = 0.1, initialDelay = 0.1): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay
      }
    }
  };
}

// Utility: Create custom fade in with delay
export function createFadeInUp(delay = 0, duration = 0.6): Variants {
  return {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] 
      }
    }
  };
}

// Viewport trigger settings for scroll animations
export const viewportOnce = { once: true, amount: 0.3 };
export const viewportRepeat = { once: false, amount: 0.3 };
export const viewportEager = { once: true, amount: 0.1 };
