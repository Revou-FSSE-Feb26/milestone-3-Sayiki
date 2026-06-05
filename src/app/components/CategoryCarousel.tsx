"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper modules (added Pagination!)
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles (added pagination styles!)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/dist/client/link";

export default function CategoryCarousel() {
  const categories = [
    {
      title: "Gaming Essentials",
      image: "/assets/keyboard.webp",
    },
    {
      title: "Pro Photography",
      image: "/assets/camera.png",
    },
    {
      title: "Audiophile Picks",
      image: "/assets/headphone.png",
    },
    {
      title: "Smart Tech",
      image: "/assets/ip17pm.png",
    },
    {
      title: "Precision Mice",
      image: "/assets/pro-x2-superstrike-top-angle-lifestyle-gallery-2.webp",
    },
    {
      title: "Fast Storage",
      image: "/assets/ssd.webp",
    },
  ];
  return (
    <section className="px-6 sm:px-10 lg:px-16 mt-6">
      <div className="category-swiper">
        <button
          type="button"
          aria-label="Previous"
          className="swiper-button-prev category-arrow"
        />
        <button
          type="button"
          aria-label="Next"
          className="swiper-button-next category-arrow"
        />

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={16}
          grabCursor={false}
          allowTouchMove={false}
          watchOverflow={true}
          loop={true}
          autoplay={{ delay: 2600, disableOnInteraction: false }}
          pagination={{
            el: ".category-swiper .swiper-pagination",
            clickable: true,
          }}
          navigation={{
            nextEl: ".category-swiper .swiper-button-next",
            prevEl: ".category-swiper .swiper-button-prev",
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 1,
              spaceBetween: 24,
            },
          }}
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.title}>
              <Link href="/browse">
                <div className="bg-[#e8e7e4] p-6 h-44 rounded-2xl flex items-center justify-between overflow-hidden relative select-none">
                  <div className="w-1/2 z-10">
                    <h3 className="text-xl md:text-2xl font-bold text-stone-900 leading-tight tracking-tight">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="w-1/2 h-full relative flex items-center justify-end">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="object-contain max-h-[110%] w-auto transform scale-110"
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination" />
      </div>
    </section>
  );
}
