import { memo } from "react";
import { SwiperSlide } from "swiper/react";

const MemoizedSwiperSlide = memo(
  ({ item, onClick }: { item: any; onClick: () => void }) => (
    <SwiperSlide onClick={onClick}>
      <img src={item.image} alt="slide_image" loading="lazy" />
    </SwiperSlide>
  )
);

export default MemoizedSwiperSlide;
