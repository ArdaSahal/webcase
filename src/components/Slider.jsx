import React, { useEffect, useState } from "react";
import { FaCheck, FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import "./Slider.css";

const Slider = ({ images, onBackgroundChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  useEffect(() => {
    if (images.length > 0) {
      onBackgroundChange(images[currentIndex]);

      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.slice(0, itemsPerView).length;
        setCurrentIndex(nextIndex);
        onBackgroundChange(images[nextIndex]);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [currentIndex, images, onBackgroundChange]);

  const handleButtonClick = (index) => {
    setCurrentIndex(index);
    onBackgroundChange(images[index]);
  };

  return (
    <div className="slider-container">
      {images.length > 0 && (
        <div className="slider-buttons">
          <button className="btn-watch">
            <FaPlay className="icon play-icon" /> Watch Now
          </button>
          <button className="btn-check">
            <span>
              <FaCheck className="icon" />
            </span>
          </button>
          <button className="btn-info">
            <IoIosInformationCircleOutline className="icon-inverse" />
          </button>
        </div>
      )}
      <div className="slider-div">
        {images.slice(0, itemsPerView).map((image, index) => (
          <button
            key={index}
            className={`slider-image ${index === currentIndex ? "active" : ""}`}
            style={{
              backgroundImage: `url(${image})`,
              filter: `${index === currentIndex ? "" : "brightness(50%)"}`,
            }}
            onClick={() => handleButtonClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
