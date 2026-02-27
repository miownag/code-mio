"use client";

import Image from "next/image";
import { PhotoMoment } from "@/types/moment";
import { photographs } from "@/constants/photos";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";

interface Props {
  moment: PhotoMoment;
}

export default function MomentPhotoContent({ moment }: Props) {
  const photos = moment.photoIds
    .map((id) => photographs.find((p) => p.id === id))
    .filter(Boolean);

  const gridCols =
    photos.length === 1
      ? "grid-cols-1"
      : photos.length === 2
        ? "grid-cols-2"
        : "grid-cols-2 md:grid-cols-3";

  return (
    <div className="space-y-2">
      {moment.caption && (
        <p className="text-sm text-foreground/90 post-content-font">
          {moment.caption}
        </p>
      )}

      <div className={cn("grid gap-1.5", gridCols)}>
        {photos.map((photo) =>
          photo ? (
            <Dialog key={photo.id}>
              <DialogTrigger asChild>
                <div className="relative aspect-square rounded-lg overflow-hidden cursor-pointer">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 40vw, 200px"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
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
          ) : null,
        )}
      </div>
    </div>
  );
}
