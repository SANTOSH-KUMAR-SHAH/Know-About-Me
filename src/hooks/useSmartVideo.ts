import { useEffect, useRef } from 'react';

/**
 * Custom hook for smart viewport-based video playback.
 * Automatically plays video when scrolled into view and pauses it when off-screen.
 * Eliminates lag caused by multiple videos decoding simultaneously in the background.
 */
export const useSmartVideo = <T extends HTMLVideoElement>() => {
  const videoRef = useRef<T>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force pause initially to prevent background decoding
    video.pause();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay error suppression (e.g. low power mode)
            });
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '50px 0px 50px 0px',
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return videoRef;
};
