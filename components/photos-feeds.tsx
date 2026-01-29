import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { motion, MotionProps, Variants } from "framer-motion";
import { DialogHeader } from "./ui/dialog";
import Image from "next/image";
import { Photograph } from "@/constants/photos";
import { FC } from "react";

interface IProps {
  photographs: Photograph[];
  containerVariants?: Variants;
  itemVariants?: Variants;
  className?: string;
  motionDivProps?: MotionProps;
}

const PhotosFeeds: FC<IProps> = ({
  photographs,
  containerVariants,
  itemVariants,
  className,
  motionDivProps,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      className={cn("grid grid-cols-3 md:grid-cols-4 gap-0.5", className)}
      {...motionDivProps}
    >
      {photographs?.map((photo) => (
        <Dialog key={photo.id}>
          <DialogTrigger asChild>
            <motion.div
              variants={itemVariants}
              className={cn(
                "relative overflow-hidden cursor-pointer aspect-square",
                photo.span === "tall" && "row-span-2 aspect-auto",
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-all duration-300 hover:scale-105"
              />
            </motion.div>
          </DialogTrigger>
          <DialogContent
            showCloseButton={false}
            className={cn(
              "max-w-3xl max-h-screen p-0 overflow-hidden flex flex-col gap-2",
              "bg-card border-muted border-2",
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
              <DialogTitle className="text-foreground">
                {photo.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {photo.description}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </motion.div>
  );
};

export default PhotosFeeds;
