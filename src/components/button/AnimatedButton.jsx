import { motion } from "framer-motion";
import PropTypes from "prop-types";

const AnimatedButton = ({ children, ...props }) => {
    const buttonVariants = {
        initial: {
          scale: 1,
          y: 0,
          boxShadow: "0px 7px 20px rgba(0, 0, 0, 0.25)",
        },
        hover: {
          scale: 1.03,
          y: 0,
          boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.3)",
          transition: { duration: 0.15, ease: "easeOut" },
        },
        tap: {
          scale: 0.97,
          y: 4,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
          transition: { duration: 0.1, ease: "easeIn" },
        },
      };
      

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#FF8126]">
      <motion.button
        className="bg-[#FF8126] text-white px-4 py-3 md:py-[18px] rounded-xl shadow-2xl w-full md:w-[110px] lg:w-[110px] flex items-center justify-center"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        style={{
          borderTop: "0px solid rgba(255, 255, 255, 0.3)",
          borderBottom: "5px solid rgba(0, 0, 0, 0.2)",
          position: "relative",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        {...props}
      >
        {children}
      </motion.button>
    </div>
  );
};

// Add PropTypes validation
AnimatedButton.propTypes = {
  children: PropTypes.node.isRequired, // Validates 'children' prop
};

export default AnimatedButton;