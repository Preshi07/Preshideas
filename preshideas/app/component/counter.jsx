import React, { useState, useEffect, useRef } from 'react';

function Counter({ start = 0, end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const easeOutExpo = (x) =>
      x === 1 ? 1 : 1 - Math.pow(2, -10 * x);

    const animate = (time) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = easeOutExpo(progress);

      const currentCount = Math.floor(start + eased * (end - start));
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, start, end, duration]);

  return (
    <span ref={ref}>
      {isVisible ? `${count}${suffix}` : ''}
    </span>
  );
}


export default Counter;