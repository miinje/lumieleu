import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import S from './ProductList.module.css';
import pb from '@/api/pocketbase';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

import {
  Mousewheel,
  FreeMode,
  Pagination,
  Navigation,
  Scrollbar,
  Keyboard,
} from 'swiper/modules';

function ProductList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getHomeList = async () => {
      try {
        const ProductListData = await pb.collection('products').getFullList();
        setProductList(ProductListData);
      } catch (error) {
        throw new Error('Error fetching product list');
      }
    };
    getHomeList();
  }, []);

  const handleSlideChange = (swiper) => {
    const { activeIndex } = swiper;

    if (activeIndex >= 7 && activeIndex < swiper.slides.length - 2) {
      swiper.slideTo(swiper.slides.length - 1);
    } else if (activeIndex === 9) {
      swiper.slideTo(6);
    }
  };

  return (
    <Swiper
      slidesPerView="auto"
      // spaceBetween={40}
      mousewheel={true}
      navigation={true}
      freeMode={true}
      keyboard={true}
      pagination={{
        type: 'progressbar',
      }}
      scrollbar={{
        hide: true,
      }}
      modules={[
        Scrollbar,
        Mousewheel,
        Pagination,
        Navigation,
        FreeMode,
        Keyboard,
      ]}
      className={`${S.swiper}`}
      // centeredSlides={1}
      onSlideChange={handleSlideChange}
    >
      <SwiperSlide className={`${S.swiperSlide}`}>
        <p className=" w-[700px] -left-[250px] top-[250px] -rotate-90 relative  h-[200px] text-[40px] ">
          Lorem Ipsum is simply dummy text of the printing and tyunce with
          righteous indignation and dislike men who are so beguiled and
        </p>
      </SwiperSlide>

      {productList?.map((products, index) => (
        <SwiperSlide key={products.id} className={S.swiperSlide}>
          <ProductItem products={products} index={index} />
        </SwiperSlide>
      ))}

      <SwiperSlide className={`${S.swiperSlide}`}>
        <span className="block   font-serif text-[80px] text-center">
          LUMIÉRE <br />
          DE LAUBE
        </span>
      </SwiperSlide>
      {/* <div className={`${S.swiper-button-prev}`}></div>
      <div className={`${S.swiper-button-prev}`}></div> */}
    </Swiper>
  );
}

export default ProductList;
