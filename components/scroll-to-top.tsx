"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import useSound from "use-sound";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [playWoosh] = useSound("/woosh.wav", {
    volume: 0.5,
  });

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(window.scrollY > 300);

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    playWoosh();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-10 w-10 rounded-full shadow-lg transition-all cursor-pointer"
            title="Scroll to top"
          >
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaArrowUp className="h-6 w-6" />
            </motion.div>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
