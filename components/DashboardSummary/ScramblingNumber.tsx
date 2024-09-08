'use client'
import React, { useState, useEffect, useRef } from 'react';

interface ScramblingNumberProps {
  duration?: number; // Animation duration in milliseconds
}

const ScramblingNumber: React.FC<ScramblingNumberProps> = ({ duration = 1500 }) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const startTimeRef = useRef<number | undefined>(undefined);
  const lastUpdateTimeRef = useRef<number>(0);

  const updateInterval = 20; // Hard-coded delay between updates

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (startTimeRef.current === undefined) startTimeRef.current = timestamp;
      const elapsedTime = timestamp - (startTimeRef.current || 0);

      if (elapsedTime < duration) {
        if (timestamp - lastUpdateTimeRef.current >= updateInterval) {
          const randomValue = Math.floor(Math.random() * 1000); // Adjust the range as needed
          setDisplayValue(randomValue);
          lastUpdateTimeRef.current = timestamp;
        }
        requestAnimationFrame(animate);
      }
    };

    const animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [duration]);

  return <>{displayValue}</>;
};

export default ScramblingNumber;
