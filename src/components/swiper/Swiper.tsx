import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperClass } from "swiper";
import { getBookData } from "../../../utils/firebase";
import ContentLoader from "react-content-loader";

function SwiperComp() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [img, setImg] = useState<object[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    const book = await getBookData();
    setImg(book);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, []);

  const SkeletonLoader = () => (
    <ContentLoader
      speed={2}
      width={200}
      height={300}
      viewBox="0 0 150 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="10" ry="10" width="200" height="300" />
    </ContentLoader>
  );

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
      slidesPerView={5}
    >
      {loading
        ? Array.from({ length: 15 }).map((_, index) => (
            <SwiperSlide key={index}>
              <SkeletonLoader />
            </SwiperSlide>
          ))
        : img &&
          img.map((item: any) => (
            <SwiperSlide
              key={item.id}
              onClick={() => swiperRef.current && swiperRef.current.slideNext()}
            >
              <img src={item.image} alt="slide_image" />
            </SwiperSlide>
          ))}
    </Swiper>
  );
}

export default SwiperComp;
