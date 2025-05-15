// src/hooks/useScrollPosition.js
// (Content as provided by you - this file is kept as is because it's functional and used by SidebarNavigation)
import { useState, useEffect } from 'react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Throttle function to limit calls
    let throttleTimeout = null;
    const throttleMs = 100; // Update scroll position at most every 100ms

    const updatePosition = () => {
        setScrollPosition(window.pageYOffset);
        throttleTimeout = null; // Reset timeout after execution
    };

    const handleScroll = () => {
        if (throttleTimeout === null) {
            throttleTimeout = setTimeout(updatePosition, throttleMs);
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updatePosition(); // Initial check

    return () => {
        window.removeEventListener('scroll', handleScroll);
        if (throttleTimeout) {
            clearTimeout(throttleTimeout); // Clean up timeout on unmount
        }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return scrollPosition;
};

export default useScrollPosition;