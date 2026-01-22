"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MdOutlineClose, MdOutlineCheck } from "react-icons/md";

// ============================================
// Types and Interfaces
// ============================================

export type StepStatus = "completed" | "failed" | "in-progress" | "pending";

export interface StepTimelineItem {
  id: string | number;
  title: string;
  subtitle?: string;
  meta?: string;
  period?: string;
  description?: string;
  icon?: ReactNode;
  status?: (exp: StepTimelineItem) => StepStatus | undefined;
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
// Status Configuration
// ============================================

const statusConfig = {
  completed: {
    borderColor: "border-muted-foreground",
    iconColor: "text-muted-foreground",
    icon: <MdOutlineCheck />,
  },
  failed: {
    borderColor: "border-muted-foreground",
    iconColor: "text-muted-foreground",
    icon: <MdOutlineClose />,
  },
  "in-progress": {
    borderColor: "border-primary",
    iconColor: "text-primary",
    icon: null, // Will show blinking dot
  },
  pending: {
    borderColor: "border-muted-foreground/50",
    iconColor: "text-muted-foreground/50",
    icon: null, // Will show static dot
  },
};

// ============================================
// Animation Variants
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// ============================================
// StepNode Component
// ============================================

function StepNode({ status = "pending" }: { status?: StepStatus }) {
  const config = statusConfig[status];
  const showIcon = config.icon !== null;
  const isInProgress = status === "in-progress";

  return (
    <div
      className={cn(
        "relative w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
        config.borderColor,
      )}
    >
      {showIcon ? (
        /* Status Icon */
        <span
          className={cn("text-xs font-bold leading-none", config.iconColor)}
        >
          {config.icon}
        </span>
      ) : (
        /* Inner dot with optional blinking */
        <motion.div
          className={cn(
            "w-2.5 h-2.5 rounded-full",
            config.iconColor.replace("text-", "bg-"),
          )}
          animate={
            isInProgress
              ? {
                  opacity: [1, 0, 1],
                }
              : undefined
          }
          transition={
            isInProgress
              ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : undefined
          }
        />
      )}
    </div>
  );
}

// ============================================
// StepConnector Component
// ============================================

function StepConnector({ status = "pending" }: { status?: StepStatus }) {
  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      style={{ originY: 0 }}
      className={cn(
        "w-0 flex-1 min-h-6 border-l-2 border-dashed",
        config.borderColor.replace("border-", "border-") + "/30",
      )}
    />
  );
}

// ============================================
// StepItem Component
// ============================================

function StepItem({ item, isLatest, isLast }: StepItemProps) {
  const status =
    item.status?.(item) || (isLatest ? "in-progress" : "completed");
  const config = statusConfig[status];
  console.log(item, status);

  return (
    <motion.div
      variants={stepVariants}
      className={cn("flex items-stretch gap-4", item.textClassNames?.(item))}
    >
      {/* Node Column */}
      <div className="flex flex-col items-center">
        <StepNode status={status} />
        {!isLast && <StepConnector status={status} />}
      </div>

      {/* Content Column */}
      <div className={cn("flex flex-col flex-1 gap-2", !isLast && "pb-12")}>
        {/* Header: Title + Period */}
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <h3
            className={cn(
              "text-lg font-semibold leading-none",
              status === "completed" || status === "in-progress"
                ? config.iconColor
                : "text-muted-foreground",
            )}
          >
            {item.title}
          </h3>
          {item.period && (
            <span
              className={cn(
                "text-md shrink-0",
                status === "completed" || status === "in-progress"
                  ? config.iconColor + "/70"
                  : "text-muted-foreground/70",
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
                  status === "in-progress"
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.icon}
              </span>
            )}
            {item.subtitle && (
              <span
                className={cn(
                  "font-medium",
                  status === "in-progress"
                    ? "text-foreground"
                    : "text-muted-foreground",
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
              status === "completed" || status === "in-progress"
                ? "text-muted-foreground"
                : "text-muted-foreground/70",
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
  // Reverse the items so the latest is at the bottom
  const reversedItems = [...items].reverse();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("flex flex-col", className)}
    >
      {reversedItems.map((item, index) => (
        <StepItem
          key={item.id}
          item={item}
          isLatest={index === reversedItems.length - 1}
          isLast={index === reversedItems.length - 1}
        />
      ))}
    </motion.div>
  );
}

export default StepTimeline;
