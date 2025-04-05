import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";

const slides = [
  {
    image: "/Venecia-1-scaled.jpg",
    title: "Venecia, Antioquia",
    message: "Donde el café nace entre montañas que inspiran.",
  },
  {
    image: "/Venecia-slider2.jpg",
    title: "Café de Venecia",
    message: "Cultivado con amor y tradición.",
  },
  {
    image: "/Puerto-Berrio-1-scaled.jpg",
    title: "Puerto Berrío, Antioquia",
    message: "Donde el río Magdalena se convierte en vida.",
  },
  {
    image: "/Puerto-Berrio-2.jpg",
    title: "Pescado de Puerto Berrío",
    message: "Directo del río a tu mesa.",
  },
  {
    image : "/Puerto-Berrio-cacao2-1.jpg",
    title: "Frutas de Puerto Berrío",
    message: "Sabores tropicales que te harán vibrar.",
  },
  {
    image : "El-Retiro-1.jpg",
    title: "El Retiro, Antioquia",
    message: "Donde la naturaleza y la cultura se encuentran.",
  },
  {
    image : "El-Retiro-2.jpg",
    title: "Tomate de Arbol de El Retiro",
    message: "Frutas frescas y deliciosas.",
  }

];

// Definición rápida de flechas directamente en el archivo
const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}>
    🡺	
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}>
    🡸
  </div>
);


const LandingSection = () => {
  // Configuración del slider 
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="landing">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="overlay">
                <h2>{slide.title}</h2>
                <p>{slide.message}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default LandingSection;
