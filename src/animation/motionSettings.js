export const containerVariants = {
  hidden: {
    x: '100vw',
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      mass: 0.3,
      damping: 8,
    },
    exit: {
      x: '-100vw',
      transition: {
        ease: 'easeInOut',
      },
    },
  },
};

export const oppositeVariants = {
  hidden: {
    x: '-100vw',
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      mass: 0.3,
      damping: 8,
    },
  },
};
