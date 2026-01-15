"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { LuMenu, LuX } from "react-icons/lu";
import useSound from "use-sound";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Posts", href: "/posts" },
  { name: "Projects", href: "/projects" },
  { name: "Photos", href: "/photos" },
  { name: "Likes", href: "/likes" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playHoverSound] = useSound("/click.wav", {
    volume: 0.6,
  });
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY > 50 && isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isExpanded &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleClick = (href: string) => {
    if (isActive(href) || (isActive("/posts") && href === "/posts")) {
      return;
    }
    setHoverItem(null);
    playHoverSound();
    router.push(href);
    if (isScrolled) {
      setIsExpanded(false);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      className={cn(
        "top-0 right-0 z-50 p-4",
        isScrolled ? "fixed" : "absolute"
      )}
    >
      <AnimatePresence mode="wait">
        {!isScrolled ? (
          // Top state: Full navigation bar
          <motion.div
            key="full-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-4 bg-transparent px-2 py-2"
          >
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                onMouseEnter={() => setHoverItem(item.name)}
                onMouseLeave={() => setHoverItem(null)}
                onClick={() => handleClick(item.href)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors overflow-hidden rounded-t-xl",
                  {
                    "cursor-pointer": !isActive(item.href),
                    "cursor-default": isActive(item.href),
                  }
                )}
                whileHover={{ scale: isActive(item.href) ? 1 : 1.05 }}
                whileTap={{ scale: isActive(item.href) ? 1 : 0.95 }}
              >
                {hoverItem === item.name && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={cn("absolute inset-0", {
                      "bg-linear-to-b from-primary to-transparent": !isActive(
                        item.href
                      ),
                    })}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span
                  className={cn("relative z-10 pixel-font text-2xl", {
                    "text-primary": isActive(item.href),
                  })}
                >
                  {item.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Scrolled state: Compact toggle button + expandable menu
          <motion.div
            key="compact-nav"
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative"
          >
            {/* Toggle Button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full",
                "bg-card/90 backdrop-blur-md border-2 border-border shadow-lg",
                "hover:border-primary/75 transition-colors"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LuX className="w-5 h-5 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LuMenu className="w-5 h-5 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Expanded Menu */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-14 right-0 flex flex-col gap-1 bg-card/90 backdrop-blur-md border border-border rounded-2xl p-2 shadow-xl min-w-[160px]"
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      onMouseEnter={() => setHoverItem(item.name)}
                      onMouseLeave={() => setHoverItem(null)}
                      onClick={() => handleClick(item.href)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "relative px-4 py-2.5 text-xl font-medium transition-colors rounded-lg pixel-font",
                        "hover:text-primary",
                        {
                          "text-primary": isActive(item.href),
                          "hover:bg-primary/10": !isActive(item.href),
                          "cursor-pointer": !isActive(item.href),
                          "cursor-default": isActive(item.href),
                        }
                      )}
                      whileHover={{ scale: isActive(item.href) ? 1 : 1.02 }}
                      whileTap={{ scale: isActive(item.href) ? 1 : 0.98 }}
                    >
                      {item.name}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
