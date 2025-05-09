"use client"

import * as React from "react"
import { Minus, SpeakerHigh, SpeakerX } from "@phosphor-icons/react"
import { CornersOut } from "@phosphor-icons/react"
import { Rnd } from "react-rnd"

import { cn } from "@/lib/utils"

interface RetroVideoPlayerProps {
  title?: string
  src: string
  defaultWidth?: number
  defaultHeight?: number
  minWidth?: number
  minHeight?: number
  className?: string
  videoClassName?: string
  headerClassName?: string
  contentClassName?: string
  defaultOpen?: boolean
  onClose?: () => void
  showControls?: boolean
  autoPlay?: boolean
  muted?: boolean
}

export function RetroVideoPlayer({
  title = "Parallel Cam",
  src,
  defaultWidth = 350,
  defaultHeight = 500,
  minWidth = 250,
  minHeight = 350,
  className,
  videoClassName,
  headerClassName,
  contentClassName,
  defaultOpen = true,
  onClose,
  showControls = false,
  autoPlay = true,
  muted: initialMuted,
}: RetroVideoPlayerProps) {
  // Set default muted state based on if explicit value was provided
  const muted = initialMuted !== undefined ? initialMuted : false;
  
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(autoPlay)
  const [isMuted, setIsMuted] = React.useState(muted)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const togglePlayPause = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation(); // Prevent event bubbling
    }
    
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      // Try to play with audio
      const playPromise = videoRef.current.play();
      
      // Handle autoplay restrictions
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented - try again with muted
          if (error.name === "NotAllowedError") {
            videoRef.current!.muted = true;
            setIsMuted(true);
            videoRef.current!.play().catch(e => console.error("Failed to play even with muted", e));
          }
        });
      }
      
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const toggleMute = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Prevent triggering play/pause
    
    if (!videoRef.current) return;
    
    const newMutedState = !videoRef.current.muted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  const toggleFullscreen = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Prevent triggering play/pause
    
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Ensure proper unmounting
  React.useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
    };
  }, []);
  
  // Handle autoplay with sound (try unmute after user interaction)
  React.useEffect(() => {
    if (autoPlay && !muted && videoRef.current) {
      const handleUserInteraction = () => {
        if (videoRef.current && videoRef.current.muted) {
          // Try to unmute after user interaction
          videoRef.current.muted = false;
          setIsMuted(false);
        }
        
        // Remove listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      };
      
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);
      
      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      };
    }
  }, [autoPlay, muted]);
  
  // Update playing state when video state changes
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  // Monitor fullscreen changes
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: defaultWidth,
        height: defaultHeight,
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      className={cn(
        "overflow-hidden border border-primary bg-background z-[9999]",
        isDragging ? "shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]" : "",
        "transition-shadow duration-200",
        className,
      )}
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      disableDragging={isFullscreen}
      enableResizing={!isFullscreen}
    >
      <div ref={containerRef} className="flex h-full w-full flex-col">
        <div
          className={cn(
            "flex h-6 items-center justify-between border-b border-primary bg-muted/40 px-1 cursor-grab",
            "hover:bg-muted transition-colors duration-200",
            headerClassName,
          )}
        >
          <div className="flex-1"></div>
          <div 
            className="text-[13px] font-semibold text-foreground text-center"
          >
            {title}
          </div>
          <div className="flex items-center space-x-1.5 flex-1 justify-end">
            {/* Sound toggle button */}
            <button 
              className={cn(
                "border border-primary p-[3px] transition-colors duration-150 touch-manipulation cursor-pointer",
                "text-muted-foreground",
              )}
              onClick={toggleMute}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => {
                e.preventDefault();
                toggleMute(e);
              }}
              style={{ borderRadius: 0, borderWidth: '0.5px' }}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
                <div className="w-2 h-2 flex items-center justify-center">
                {isMuted ? <SpeakerX weight="fill" className="h-2 w-2" /> : <SpeakerHigh weight="fill" className="h-2 w-2" />}
              </div>
            </button>
            
            {/* Close button - visible on both mobile and desktop */}
            {onClose && (
              <button 
                className={cn(
                  "border border-primary p-[3px] transition-colors duration-150 touch-manipulation cursor-pointer",
                  "text-muted-foreground",
                )}
                onClick={handleClose}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleClose();
                }}
                style={{ borderRadius: 0, borderWidth: '0.5px' }}
                aria-label="Close"
              >
                <div className="w-2 h-2 flex items-center justify-center">
                  <Minus weight="bold" className="h-2 w-2" />
                </div>
              </button>
            )}
          </div>
        </div>

        <div className={cn("flex-1 relative cursor-default", contentClassName)}>
          <div 
            className="relative h-full w-full touch-manipulation"
            onClick={!showControls ? togglePlayPause : undefined}
            onTouchEnd={!showControls ? (e) => {
              e.preventDefault();
              togglePlayPause();
            } : undefined}
          >
            <video
              ref={videoRef}
              src={src}
              className={cn(
                "h-full w-full object-cover",
                videoClassName,
              )}
              controls={showControls}
              autoPlay={autoPlay}
              muted={isMuted}
              playsInline
              loop
            />
            
            {/* Fullscreen overlay button - always visible */}
            <button
              className="absolute bottom-3 right-3 p-1.5 transition-all duration-200 touch-manipulation opacity-100 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen(e);
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFullscreen(e);
              }}
              aria-label="Fullscreen"
            >
              <CornersOut weight="bold" className="h-6 w-6 text-white drop-shadow-sm" />
            </button>
          </div>
        </div>
      </div>
    </Rnd>
  )
}
