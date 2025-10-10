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

interface CardDeckContainerProps {
  children: React.ReactNode
  className?: string
  showPagination?: boolean
  showNavigation?: boolean
  infinite?: boolean
  autoplay?: boolean
  spaceBetween?: number
}

interface CardDeckItemProps {
  children: React.ReactNode
  className?: string
}

// New modular API components
export function CardDeckContainer({
  children,
  className,
  showPagination = false,
  showNavigation = false,
  infinite = true,
  autoplay = false,
  spaceBetween = 40,
}: CardDeckContainerProps) {
  const css = `
  .card-deck {
    padding: 20px 0 50px 0 !important;
  }
  .card-deck .swiper-slide {
    overflow: visible !important;
  }
  .card-deck .swiper-slide-shadow-cards {
    border-radius: 1.5rem !important;
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
      className={cn("relative w-full max-w-3xl overflow-visible", className)}
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
        className="card-deck h-[360px] w-[240px] sm:h-[420px] sm:w-[280px]"
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const slideClass = child.props.className || "rounded-3xl"

            return (
              <SwiperSlide
                key={index}
                className={cn(slideClass, "overflow-hidden")}
              >
                {child.props.children}
              </SwiperSlide>
            )
          }
          return null
        })}
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

export function CardDeckItem({ children, className }: CardDeckItemProps) {
  // This component passes its children and className to CardDeckContainer for rendering
  return <>{children}</>
}
