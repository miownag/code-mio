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

// 8x8 neutral gray placeholder shared by all dialog images
const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABJ0lEQVR4nMXTN3bDUAxEUWxIYs5JJMVMSt7/ZuxuzrjDIYpfvPqiGMjj4f1yz6ePPC9Avh+iIIhQGMb/iqIExXGKkiRDaZojcX4Ag3dQBrVolhVIGLyDMqhF87xEwuAdlEEtWhQVcn8Ag3dQBrVoWdZIrCtmUItWVYPEumIGtWhdt0isK2ZQizZNh9wfYF0xg1q0bV9IrCtmUIt2XY/EumIGtejrNSD3B1jfiEEt2vcjEuuKGdSiw/BGYl0xg1p0HCck1hUzqEXf7xm5P8C6Yga16DQtSKwrZlCLzvOKxLpiBrXosmzI/QHWN2JQi67rjsS6Yga16LYdSKwrZlCL7vuJxLpiBrXocVzI/QHWFTOoRc/zg8S6Yga16HV9kVhXzKAW/Xx+0B/vW+Bb0fWmXgAAAABJRU5ErkJggg==";

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
                "relative overflow-hidden cursor-pointer aspect-square select-none",
                photo.span === "tall" && "row-span-2 aspect-auto",
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-all duration-300 hover:scale-105"
                loading="eager"
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
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
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
