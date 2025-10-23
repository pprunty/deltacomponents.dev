"use client";

import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/registry/delta-ui/ui/carousel";

const Skiper54 = () => {
  const images = [
    {
      src: "https://patrickprunty.com/projects/delta.png",
      alt: "Delta Components",
      title: "Delta Components",
    },
    {
      src: "https://patrickprunty.com/projects/mammoth.webp",
      alt: "Clay Studio",
      title: "Clay Studio",
    },
    {
      src: "https://patrickprunty.com/projects/nothing.png",
      alt: "Nothing",
      title: "Nothing",
    },
    {
      src: "https://patrickprunty.com/projects/runsoft2.png",
      alt: "Run Soft",
      title: "Run Soft",
    },
    {
      src: "https://patrickprunty.com/projects/pixel-projects.webp",
      alt: "Pixel Projects",
      title: "Pixel Projects",
    },
    {
      src: "https://patrickprunty.com/projects/monthy-2.png",
      alt: "Monthy AI",
      title: "Monthy AI",
    },
    {
      src: "https://patrickprunty.com/projects/furrycircuits.png",
      alt: "Furry Circuits Newsletter",
      title: "Furry Circuits Newsletter",
    },
  ];
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Carousel_006
        images={images}
        className="w-full"
        loop={true}
        showNavigation={true}
        showPagination={true}
        showControlsToggle={true}
      />
    </div>
  );
};

interface Carousel_006Props {
  images: { src: string; alt: string; title: string }[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
  showControlsToggle?: boolean;
}

const Carousel_006 = ({
  images,
  className,
  autoplay = false,
  loop = true,
  showNavigation = true,
  showPagination = true,
  showControlsToggle = false,
}: Carousel_006Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className={cn("w-full", className)}
      opts={{
        loop,
        slidesToScroll: 1,
      }}
      plugins={
        autoplay
          ? [
              Autoplay({
                delay: 2000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]
          : []
      }
    >
      <CarouselContent className="flex h-[500px] w-full">
        {images.map((img, index) => (
          <CarouselItem
            key={index}
            className="relative flex h-[81.5%] w-full basis-[73%] items-center justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[25%] xl:basis-[21%]"
          >
            <motion.div
              initial={false}
              animate={{
                clipPath:
                  current !== index
                    ? "inset(15% 0 15% 0 round 2rem)"
                    : "inset(0 0 0 0 round 2rem)",
              }}
              className="h-full w-full overflow-hidden rounded-3xl"
            >
              <div className="relative h-full w-full border">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full scale-105 object-cover"
                />
              </div>
            </motion.div>
            <AnimatePresence mode="wait">
              {current === index && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-2 flex h-[14%] w-full translate-y-full items-center justify-center p-2 text-center font-medium tracking-tight text-black/20"
                >
                  {img.title}
                </motion.div>
              )}
            </AnimatePresence>
          </CarouselItem>
        ))}
      </CarouselContent>

      {showNavigation && controlsVisible && (
        <div className="absolute bottom-4 right-0 flex w-full items-center justify-between gap-2 px-4">
          <button
            aria-label="Previous slide"
            onClick={() => api?.scrollPrev()}
            className="rounded-full bg-black/10 p-2"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => api?.scrollNext()}
            className="rounded-full bg-black/10 p-2"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      )}

      {showPagination && controlsVisible && (
        <div className="flex w-full items-center justify-center mt-4">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: images.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 w-2 cursor-pointer rounded-full transition-all",
                  current === index ? "bg-black" : "bg-[#D9D9D9]",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {showControlsToggle && (
        <button
          onClick={() => setControlsVisible(!controlsVisible)}
          className="absolute top-4 right-4 rounded-full bg-black/10 p-2 backdrop-blur-sm transition-all hover:bg-black/20"
          aria-label={controlsVisible ? "Hide controls" : "Show controls"}
        >
          {controlsVisible ? (
            <EyeOff className="h-4 w-4 text-white" />
          ) : (
            <Eye className="h-4 w-4 text-white" />
          )}
        </button>
      )}
    </Carousel>
  );
};

export function PerspectiveCarousel() {
  return <Skiper54 />;
}

export { Skiper54 };

/**
 * Skiper 54 Carousel_006 — React + Framer Motion
 * Built with shadcn/ui And Embla Carousel - Read docs to learn more https://ui.shadcn.com/docs/components/carousel https://embla-carousel.com/
 *
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */