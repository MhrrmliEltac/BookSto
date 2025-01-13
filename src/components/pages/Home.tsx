import SwiperComp from "../swiper/Swiper";
import BookItem from "../home/BookItem";
import FeaturedBooks from "../home/FeaturedBooks";

const Home = () => {
  return (
    <div className="w-[80%] mx-auto pt-28 ">
      <SwiperComp />
      <BookItem />
      <FeaturedBooks />
    </div>
  );
};

export default Home;
