import React from 'react';
import Slider from 'react-slick';

// Importar estilos de slick-carousel
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// Importar sobrescritura de estilos
import "../../styles/slick-overrides.css";

interface Partner {
  name: string;
  img: string;
}

interface PartnerCarouselProps {
  partners: Partner[];
}

const PartnerCarousel: React.FC<PartnerCarouselProps> = ({ partners }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {partners.map((partner) => (
        <div key={partner.name} className="px-4">
          <img src={partner.img} alt={partner.name} className="h-16 mx-auto object-contain" />
        </div>
      ))}
    </Slider>
  );
};

export default PartnerCarousel;
