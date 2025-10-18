import React, { useState } from "react";
import "./Image.css";

const ImageMagnifier = ({
  src,
  width = 400,
  height = 400,
  magnifierWidth = 300,
  magnifierHeight = 300,
  zoomLevel = 2,
  focusSize = 60 // size of square focus indicator
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [showFocus, setShowFocus] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);

  const mouseEnter = (e) => {
    const { width, height } = e.currentTarget.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
    setShowFocus(true);
  };

  const mouseLeave = () => {
    setShowMagnifier(false);
    setShowFocus(false);
  };

  const mouseMove = (e) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setXY([x, y]);
  };

  return (
    <div className="image-zoom-wrapper">
      <img
        src={src}
        width={width}
        height={height}
        alt="Zoomable"
        className="main-image"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onMouseMove={mouseMove}
      />

      {/* Small square focus indicator */}
      {showFocus && (
        <div
          className="focus-indicator"
          style={{
            width: `${focusSize}px`,
            height: `${focusSize}px`,
            left: `${x - focusSize / 2}px`,
            top: `${y - focusSize / 2}px`,
          }}
        />
      )}

      {/* Zoom box on the right */}
      {showMagnifier && (
        <div
          className="zoom-box"
          style={{
            width: `${magnifierWidth}px`,
            height: `${magnifierHeight}px`,
            backgroundImage: `url('${src}')`,
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            left: `${width + 20}px`, // fixed right side
            top: `0`,
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;
