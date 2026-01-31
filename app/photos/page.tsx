"use client";

import { motion } from "framer-motion";
import { photographs } from "@/constants/photos";
import PhotosFeeds from "@/components/photos-feeds";
import Subtitle from "@/components/subtitle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function PhotosPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <Subtitle size="lg">Photography</Subtitle>
        <p className="text-neutral-400 text-lg">
          My photography collection - capturing moments and memories.
        </p>
      </motion.div>

      <PhotosFeeds
        photographs={photographs}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
        motionDivProps={{
          initial: "hidden",
          animate: "visible",
        }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5"
      />

      {/* <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5"
      >
        {photographs.map((photo) => (
          <Dialog key={photo.id}>
            <DialogTrigger asChild>
              <motion.div
                variants={itemVariants}
                className={cn(
                  "relative overflow-hidden cursor-pointer aspect-square",
                  photo.span === "tall" && "row-span-2 aspect-auto",
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-all duration-300"
                />
              </motion.div>
            </DialogTrigger>
            <DialogContent
              showCloseButton={false}
              className={cn(
                "max-w-3xl max-h-screen p-0 overflow-hidden flex flex-col gap-2",
                "bg-neutral-900 border-muted border-2",
              )}
            >
              <div
                className="relative w-full self-center"
                style={{ aspectRatio: photo.aspectRatio }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <DialogHeader className="p-6 pt-4">
                <DialogTitle className="text-neutral-100">
                  {photo.title}
                </DialogTitle>
                <DialogDescription className="text-neutral-400">
                  {photo.description}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </motion.div> */}
    </div>
  );
}
