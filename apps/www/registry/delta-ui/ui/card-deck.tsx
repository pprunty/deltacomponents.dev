"use client"

import React from "react"
import { motion } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css/effect-cards"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css"

import { cn } from "@/lib/utils"

interface CardDeckProps {
  images: { src: string; alt: string }[]
  className?: string
  showPagination?: boolean
  showNavigation?: boolean
  loop?: boolean
  infinite?: boolean
  autoplay?: boolean
  spaceBetween?: number
}

export function CardDeck({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  infinite = true,
  autoplay = false,
  spaceBetween = 40,
}: CardDeckProps) {
  const css = `
  .card-deck {
    padding-bottom: 50px !important;
  }
  `

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-3xl", className)}
    >
      <style>{css}</style>

      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 1000,
                disableOnInteraction: false,
              }
            : false
        }
        effect="cards"
        grabCursor={true}
        loop={infinite}
        allowTouchMove={true}
        touchRatio={1}
        resistance={true}
        resistanceRatio={infinite ? 0 : 0.85}
        pagination={
          showPagination
            ? {
                clickable: true,
              }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        className="card-deck h-[380px] w-[260px]"
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="rounded-3xl">
            <img
              className="h-full w-full object-cover"
              src={image.src}
              alt={image.alt}
            />
          </SwiperSlide>
        ))}
        {showNavigation && (
          <div>
            <div className="swiper-button-next after:hidden">
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </div>
            <div className="swiper-button-prev after:hidden">
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </Swiper>
    </motion.div>
  )
}
