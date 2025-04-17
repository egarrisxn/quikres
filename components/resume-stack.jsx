"use client";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { useDrag } from "@use-gesture/react";

const resumeImages = [
  {
    id: 0,
    name: "0",
    src: "/images/1.png",
  },
  {
    id: 1,
    name: "1",
    src: "/images/2.png",
  },
  {
    id: 2,
    name: "2",
    src: "/images/3.png",
  },
  { id: 3, name: "3", src: "/images/4.png" },
  {
    id: 4,
    name: "4",
    src: "/images/5.png",
  },
];

export function ResumeStack() {
  const [stack, setStack] = useState(resumeImages);
  const [isSwiping, setIsSwiping] = useState(false);
  const autoSwipeTimeout = useRef(null);

  const handleSwipeComplete = useCallback(
    (direction) => {
      if (isSwiping) return;
      setIsSwiping(true);
      if (direction === "left") {
        setStack((prevStack) => [...prevStack.slice(1), prevStack[0]]);
      }
      setTimeout(() => setIsSwiping(false), 300);
    },
    [isSwiping]
  );

  const bind = useDrag(
    ({ down, movement: [mx], velocity, cancel }) => {
      if (!down && (velocity > 0.1 || Math.abs(mx) > 10) && !isSwiping) {
        const direction = mx < 0 ? "left" : "right";
        cancel();
        handleSwipeComplete(direction);
      }
    },
    { axis: "x" }
  );

  useEffect(() => {
    autoSwipeTimeout.current = setInterval(() => {
      handleSwipeComplete("left");
    }, 5000);

    return () => clearInterval(autoSwipeTimeout.current);
  }, [handleSwipeComplete]);

  return (
    <div className='relative h-96 w-72 sm:h-[30rem] sm:w-96 lg:w-[26rem]'>
      {stack.map((card, index) => {
        const isTopCard = index === 0;
        const scaleFactor = 1 - index * 0.04;
        const spreadFactor = index * 8;
        const rotationAngle = index * 4;

        return (
          <motion.div
            key={card.id}
            className='rounded-base xs:min-h-96 xs:min-w-[19rem] xs:max-w-[26rem] absolute flex size-fit max-w-[17rem] min-w-48 flex-col justify-between border bg-white p-1.5 shadow-xl sm:min-h-[30rem] sm:min-w-96 lg:min-w-[26rem]'
            style={{
              zIndex: stack.length - index,
            }}
            animate={{
              scale: scaleFactor,
              x: spreadFactor,
              rotate: rotationAngle,
              y: index * 8,
            }}
            drag={isTopCard ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            {...(isTopCard ? bind() : {})}
          >
            <Image
              src={card.src}
              alt={card.name}
              width='415'
              height='550'
              className='rounded-base pointer-events-none flex h-fit w-full object-cover'
            />
          </motion.div>
        );
      })}
    </div>
  );
}
