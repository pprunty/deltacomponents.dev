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
  autoplay?: boolean
  spaceBetween?: number
  enableInitialAnimation?: boolean
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
  autoplay = false,
  spaceBetween = 40,
  enableInitialAnimation = true,
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
      initial={enableInitialAnimation ? { opacity: 0, translateY: 20 } : false}
      animate={enableInitialAnimation ? { opacity: 1, translateY: 0 } : false}
      transition={
        enableInitialAnimation
          ? {
              duration: 0.3,
              delay: 0.5,
            }
          : undefined
      }
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
        loop={false}
        allowTouchMove={true}
        touchRatio={1}
        resistance={true}
        resistanceRatio={0.85}
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
        {children &&
          React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              // @ts-expect-error - React element props access
              const slideClass = child.props.className || "rounded-3xl"

              return (
                <SwiperSlide
                  key={index}
                  className={cn(slideClass, "overflow-hidden")}
                >
                  {/* @ts-expect-error - React element props access */}
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

// Legacy API for backward compatibility
interface CardDeckProps {
  images: { src: string; alt: string }[]
  autoplay?: boolean
  showPagination?: boolean
  showNavigation?: boolean
  spaceBetween?: number
  className?: string
  enableInitialAnimation?: boolean
}

export function CardDeck({
  images,
  autoplay = false,
  showPagination = false,
  showNavigation = false,
  spaceBetween = 40,
  className,
  enableInitialAnimation = true,
}: CardDeckProps) {
  return (
    <CardDeckContainer
      autoplay={autoplay}
      showPagination={showPagination}
      showNavigation={showNavigation}
      spaceBetween={spaceBetween}
      className={className}
      enableInitialAnimation={enableInitialAnimation}
    >
      {images &&
        images.map((image, index) => (
          <CardDeckItem key={index} className="rounded-3xl">
            <img
              className="h-full w-full rounded-3xl object-cover"
              src={image.src}
              alt={image.alt}
            />
          </CardDeckItem>
        ))}
    </CardDeckContainer>
  )
}
