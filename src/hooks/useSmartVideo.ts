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
    let hasLoaded = false;

    let playTimeout: number | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasLoaded) {
              hasLoaded = true;
              video.preload = 'metadata';
              video.load();
            }
            
            // Wait 2.5 seconds before playing to show the poster frame
            playTimeout = window.setTimeout(() => {
              // Only play if it's still intersecting (hasn't been cleared)
              video.play().catch(() => {
                // Autoplay error suppression (e.g. low power mode)
              });
            }, 2500);
            
          } else {
            // Cancel the scheduled play if they scroll past before 2.5s
            if (playTimeout !== undefined) {
              window.clearTimeout(playTimeout);
            }
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
