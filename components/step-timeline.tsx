"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================
// Types and Interfaces
// ============================================

export interface StepTimelineItem {
  id: string | number;
  title: string;
  subtitle?: string;
  meta?: string;
  period?: string;
  description?: string;
  icon?: ReactNode;
  textClassNames?: (exp: StepTimelineItem) => string;
}

export interface StepTimelineProps {
  items: StepTimelineItem[];
  className?: string;
}

interface StepItemProps {
  item: StepTimelineItem;
  isLatest: boolean;
  isLast: boolean;
}

// ============================================
// Animation Variants
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

// ============================================
// StepNode Component
// ============================================

function StepNode({ isLatest }: { isLatest: boolean }) {
  return (
    <motion.div
      className={cn(
        "relative w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
        isLatest
          ? "border-primary bg-primary/20"
          : "border-muted-foreground/50 bg-muted",
      )}
      whileHover={{ scale: isLatest ? 1.2 : 1 }}
    >
      {/* Inner dot */}
      <div
        className={cn(
          "w-2 h-2 rounded-full",
          isLatest ? "bg-primary" : "bg-muted-foreground/50",
        )}
      />
      {/* Glow effect for latest */}
      {isLatest && (
        <div className="absolute inset-0 rounded-full bg-primary/30 blur-sm -z-10" />
      )}
    </motion.div>
  );
}

// ============================================
// StepConnector Component
// ============================================

function StepConnector({ isLatest }: { isLatest: boolean }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      style={{ originY: 0 }}
      className={cn(
        "w-0 flex-1 min-h-6 border-l-2",
        isLatest ? "border-primary/50" : "border-muted-foreground/30",
      )}
    />
  );
}

// ============================================
// StepItem Component
// ============================================

function StepItem({ item, isLatest, isLast }: StepItemProps) {
  return (
    <motion.div
      variants={stepVariants}
      className={cn("flex items-stretch gap-4", item.textClassNames?.(item))}
    >
      {/* Node Column */}
      <div className="flex flex-col items-center">
        <StepNode isLatest={isLatest} />
        {!isLast && <StepConnector isLatest={isLatest} />}
      </div>

      {/* Content Column */}
      <div className={cn("flex flex-col flex-1 gap-2", !isLast && "pb-12")}>
        {/* Header: Title + Period */}
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <h3
            className={cn(
              "text-lg font-semibold leading-none",
              isLatest ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.title}
          </h3>
          {item.period && (
            <span
              className={cn(
                "text-md shrink-0",
                isLatest ? "text-primary/70" : "text-muted-foreground/70",
              )}
            >
              {item.period}
            </span>
          )}
        </div>

        {/* Subtitle + Meta */}
        {(item.subtitle || item.meta) && (
          <div className="flex items-center gap-2">
            {item.icon && (
              <span
                className={cn(
                  "text-md",
                  isLatest ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.icon}
              </span>
            )}
            {item.subtitle && (
              <span
                className={cn(
                  "font-medium",
                  isLatest ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.subtitle}
              </span>
            )}
            {item.meta && (
              <>
                <span className="text-muted-foreground/75">▪</span>
                <span className="text-muted-foreground text-md">
                  {item.meta}
                </span>
              </>
            )}
          </div>
        )}

        {/* Description */}
        {item.description && (
          <p
            className={cn(
              "text-md",
              item.textClassNames?.(item),
              isLatest ? "text-muted-foreground" : "text-muted-foreground/70",
            )}
          >
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// StepTimeline Component (Main Export)
// ============================================

export function StepTimeline({ items, className }: StepTimelineProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("flex flex-col", className)}
    >
      {items.map((item, index) => (
        <StepItem
          key={item.id}
          item={item}
          isLatest={index === 0}
          isLast={index === items.length - 1}
        />
      ))}
    </motion.div>
  );
}

export default StepTimeline;
