import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Swiper as SwiperClass } from "swiper";
import { getBookData } from "../../../utils/firebase";
import SkeletonLoader from "./SkeletonLoader";

function SwiperComp() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [img, setImg] = useState<object[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    const book = await getBookData();
    setImg(book);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const memoizedImg = useMemo(() => img, [img]);

  const handleNextSlide = useCallback(() => {
    swiperRef.current?.slideNext();
  }, [swiperRef]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      modules={[EffectCoverflow]}
      className="swiper_container"
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      breakpoints={{
        270: {
          slidesPerView: 1,
        },
        501: {
          slidesPerView: 2,
        },
        820: {
          slidesPerView: 4,
        },
        1030: {
          slidesPerView: 5,
        },
      }}
    >
      {loading
        ? Array.from({ length: 15 }).map((_, index) => (
            <SwiperSlide key={index}>
              <SkeletonLoader />
            </SwiperSlide>
          ))
        : memoizedImg &&
          memoizedImg.map((item: any) => (
            <SwiperSlide key={item.id} onClick={handleNextSlide}>
              <img
                src={item.image}
                alt="slide_image"
                loading="lazy"
                decoding="async"
              />
            </SwiperSlide>
          ))}
    </Swiper>
  );
}

export default SwiperComp;
