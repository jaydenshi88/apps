"use client";

import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";

const StickyScroll = ({
  content,
}: {
  content: {
    title: string;
    description: string;
    image: string; // Add an image field
  }[];
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    cardsBreakpoints.forEach((breakpoint, index) => {
      if (latest > breakpoint - 0.2 && latest <= breakpoint) {
        setActiveCard(() => index);
      }
    });
  });

  return (
    <motion.div
      className="relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md p-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg mt-10 max-w-sm text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      {/* Replace the previous motion.div with this one to display images */}
      <motion.img
        animate={{
          opacity: [0, 1],
          transition: { duration: 0.5 },
        }}
        src={content[activeCard]?.image} // Use the image URL from the active card
        className="sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block"
      />
    </motion.div>
  );
};

export default function Page() {
  const content = [
    {
      title: "First Card",
      description: "This is the first card description",
      image: "https://via.placeholder.com/150", // Add an image URL
    },
    {
      title: "Second Card",
      description: "This is the second card description",
      image: "https://via.placeholder.com/100", // Add an image URL
    },
    {
      title: "Third Card",
      description: "This is the third card description",
      image: "https://via.placeholder.com/150", // Add an image URL
    },
    {
      title: "Third Card",
      description: "This is the third card description",
      image: "https://via.placeholder.com/150", // Add an image URL
    },
  ];

  return (
    <div className="flex h-screen w-full items-center justify-center ">
      <StickyScroll content={content} />
    </div>
  );
}
