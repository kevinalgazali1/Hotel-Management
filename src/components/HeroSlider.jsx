import React from 'react';
import { useLocation } from 'react-router-dom'; // import useLocation dari react-router-dom
// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';
// import swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
// import required modules
import { EffectFade, Autoplay } from 'swiper';
// images
import img1 from '../assets/img/heroSlider/1.jpg';
import img2 from '../assets/img/heroSlider/2.jpg';
import img3 from '../assets/img/heroSlider/3.jpg';

const slides = [
  {
    title: 'Your Luxury Hotel for Vacation',
    bg: img1,
  },
  {
    title: 'Your Luxury Hotel for Vacation',
    bg: img2,
  },
  {
    title: 'Your Luxury Hotel for Vacation',
    bg: img3,
  },
];

const HeroSlider = ({ scrollToRooms }) => {
  const location = useLocation(); // menggunakan hook useLocation untuk mendapatkan lokasi route saat ini
  let btnText = 'See our rooms'; // default text

  if (location.pathname === '/facilities') {
    btnText = 'See our facilities';
  } else if (location.pathname === '/review') {
    btnText = 'Let\'s review our hotel';
  }

  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={'fade'}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className='heroSlider h-[600px] lg:h-[860px]'
    >
      {slides.map((slide, index) => {
        // destructure slide
        const { title, bg } = slide;
        return (
          <SwiperSlide className='h-full relative flex justify-center items-center' key={index}>
            <div className='z-20 text-white text-center'>
              <div className='uppercase font-tertiary tracking-[6px] mb-5'>
                Just Enjoy and relax
              </div>
              <h1 className='text-[32px] font-primary uppercase tracking-[2px] max-w-[920px] lg:text-[68px] leading-tight mb-6'>
                {title}
              </h1>
              <button className='btn btn-lg btn-primary mx-auto' onClick={scrollToRooms}>
                {btnText}
              </button>
            </div>
            <div className='absolute top-0 w-full h-full'>
              <img className='object-cover h-full w-full' src={bg} alt='' />
            </div>
            {/* overlay */}
            <div className='absolute w-full h-full bg-black/70'></div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
