"use client";

import React, { useState, useEffect } from "react";
import { FaSpinner, FaCheckCircle, FaBolt } from "react-icons/fa";

const confettiColors = ["#52c41a", "#111a20", "#f5c542", "#41bbc7", "#7ed321"];

interface ConfettiItem {
  left: number;
  delay: number;
  background: string;
  size: number;
  drift: number;
  id: number;
}

const generateConfettiItems = (count = 30): ConfettiItem[] => {
  return Array.from({ length: count }).map((_, index) => ({
    left: Math.floor(Math.random() * 100),
    delay: Math.random() * 0.5,
    background:
      confettiColors[Math.floor(Math.random() * confettiColors.length)],
    size: Math.floor(Math.random() * 6) + 8,
    drift: Math.floor(Math.random() * 30) - 15,
    id: index,
  }));
};

const LoadingAnimation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [confettiItems, setConfettiItems] = useState<ConfettiItem[]>([]);

  useEffect(() => {
    const normalDuration = 1800;
    const finishBlinkDuration = 100;
    const intervalTime = 20;
    const targetProgress = 35;
    const increment = targetProgress / (normalDuration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= targetProgress) {
          clearInterval(interval);
          return targetProgress;
        }
        return next;
      });
    }, intervalTime);

    const timerNormal = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setConfettiItems(generateConfettiItems());
      }, finishBlinkDuration);
    }, normalDuration);

    return () => {
      clearTimeout(timerNormal);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className='
    relative 
    flex 
    flex-col 
    items-center 
    justify-center 
    bg-white
    shadow-sm
    p-6 
    rounded-lg
    border 
    border-[#dde4da]
    overflow-hidden 
    animate-fadeIn
    w-[calc(100%-2rem)]
    max-w-[calc(100%-2rem)]
    h-80
    m-0
  '
    >
      <style>{`
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(-50px) translateX(calc(var(--drift) * -1)) rotate(0deg); }
          100% { opacity: 0; transform: translateY(200px) translateX(var(--drift)) rotate(720deg); }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className='absolute inset-0 bg-[#f4f8f1] opacity-80'></div>

      {isLoading ? (
        <div className='relative flex flex-col items-center space-y-4 w-full'>
          <FaSpinner size={64} className='text-[#42b719] animate-spin' />
          <div className='text-center space-y-1'>
            <h2 className='text-xl font-semibold text-[#142027] animate-pulse flex items-center justify-center gap-2'>
              <FaBolt className='text-yellow-400' />
              Fast private conversion
            </h2>
            <p className='text-sm text-[#62707a]'>
              Your image stays local while Quick Convert works.
            </p>
          </div>

          <div className='w-full h-3 rounded-full bg-[#dfe7dc] overflow-hidden'>
            <div
              className='h-full bg-[#42b719] transition-all duration-200'
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className='relative flex flex-col items-center space-y-4 animate-[fadeInScale_0.6s_ease-out]'>
          <FaCheckCircle size={70} className='text-green-500 animate-bounce' />
          <h2 className='text-2xl font-bold text-[#2f8f14]'>
            Conversion Completed!
          </h2>
          <p className='text-[#62707a] text-center'>
            That&apos;s how fast Plzwork keeps conversion moving.
          </p>
        </div>
      )}

      {!isLoading &&
        confettiItems.map((item) => (
          <div
            key={item.id}
            className='absolute top-0'
            style={{
              left: `${item.left}%`,
              width: `${item.size}px`,
              height: `${item.size}px`,
              background: item.background,
              borderRadius: "50%",
              animation: `confettiFall 1.8s cubic-bezier(0.25, 1, 0.5, 1) ${item.delay}s forwards`,
              ["--drift" as string]: `${item.drift}px`,
            }}
          />
        ))}
    </div>
  );
};

export default LoadingAnimation;
