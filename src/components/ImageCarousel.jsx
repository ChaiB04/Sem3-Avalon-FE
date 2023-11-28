import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../pages/HomePage.module.css'; // Adjust the path accordingly

function ImageCarousel({ images }){
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.info_pictures}>
      <Slider {...settings}>
        {images.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;

