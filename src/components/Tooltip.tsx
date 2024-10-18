import { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

import me from "../../public/assets/me.jpg";

export const Tooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designations: string[];
    image: string;
    url: string | undefined;
    background: string | undefined;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [randomDesignation, setRandomDesignation] = useState<string | null>(
    null
  );
  const [previousDesignation, setPreviousDesignation] = useState<{
    [key: number]: string | null;
  }>({});
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const handleMouseEnter = (item: { id: number; designations: string[] }) => {
    setHoveredIndex(item.id);

    let newDesignation;
    do {
      const randomIndex = Math.floor(Math.random() * item.designations.length);
      newDesignation = item.designations[randomIndex];
    } while (newDesignation === previousDesignation[item.id]);

    setPreviousDesignation((prev) => ({ ...prev, [item.id]: newDesignation }));
    setRandomDesignation(newDesignation);
  };

  return (
    <>
      {items.map((item) => (
        <div
          className="-mr-4 relative group"
          key={item.name}
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-primary-100 to-transparent h-px " />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-primary-500 to-transparent h-px " />
                <div className="font-bold text-white relative z-30 text-base">
                  {item.name}
                </div>
                <div className="text-white text-xs">{randomDesignation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <a href={item.url} target="_blank">
            <img
              onMouseMove={handleMouseMove}
              height={100}
              width={100}
              src={item.image === "me.png" ? me.src : item.image}
              alt={item.name}
              style={{ backgroundColor: item.background }}
              className="object-cover !m-0 !p-0 object-top rounded-full h-16 w-16 border-2 group-hover:scale-105 group-hover:z-30 border-primary-400 relative transition duration-500"
            />
          </a>
        </div>
      ))}
    </>
  );
};
