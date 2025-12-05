"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const resImg = [
  { id: 0, name: "0", src: "/images/brutal.webp" },
  { id: 1, name: "1", src: "/images/base.webp" },
  { id: 2, name: "2", src: "/images/claude.webp" },
  { id: 3, name: "3", src: "/images/retro.webp" },
  { id: 4, name: "4", src: "/images/grove.webp" },
  { id: 5, name: "5", src: "/images/clay.webp" },
];

export default function ResumeCarousel() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className='w-full max-w-lg'
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {resImg.map((image) => (
          <CarouselItem key={image.id}>
            <motion.div
              className='p-1'
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={image.src}
                alt={image.name}
                width='540'
                height='650'
                className='pointer-events-none flex h-fit w-full object-cover shadow-lg'
              />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// const resImg = [
//   { id: 0, name: "0", src: "/images/brutal.webp" },
//   { id: 1, name: "1", src: "/images/base.webp" },
//   { id: 2, name: "2", src: "/images/claude.webp" },
//   { id: 3, name: "3", src: "/images/retro.webp" },
//   { id: 4, name: "4", src: "/images/grove.webp" },
//   { id: 5, name: "5", src: "/images/clay.webp" },
// ];

// export default function ResumeCarousel() {
//   const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

//   return (
//     <Carousel
//       plugins={[plugin.current]}
//       className='w-full max-w-lg'
//       onMouseEnter={plugin.current.stop}
//       onMouseLeave={plugin.current.reset}
//     >
//       <CarouselContent>
//         {resImg.map((image) => (
//           <CarouselItem key={image.id}>
//             <div className='p-1'>
//               <Image
//                 src={image.src}
//                 alt={image.name}
//                 width='540'
//                 height='650'
//                 className='pointer-events-none flex h-fit w-full object-cover'
//               />
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }
