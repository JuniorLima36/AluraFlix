import Slider from 'react-slick';
import PropTypes from 'prop-types';
import CustomNextArrow from './Custom/CustomNextArrow';
import CustomPrevArrow from './Custom/CustomPrevArrow';
import './Slider.module.css';

export default function SliderComponent({ children, categoria }) {
  const sliderSettings = {
    initialSlide: 0,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    speed: 500,
    focusOnSelect: false,
    nextArrow: <CustomNextArrow color={categoria.color} />,
    prevArrow: <CustomPrevArrow color={categoria.color} />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return <Slider {...sliderSettings}>{children}</Slider>;
}

SliderComponent.propTypes = {
  children: PropTypes.node.isRequired,
  categoria: PropTypes.shape({
    color: PropTypes.string.isRequired,
  }).isRequired,
};
