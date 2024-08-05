import { useState, useEffect } from "react";

const useImageSize = (numImages = 5, buttonWidth = 80, imageGap = 2) => {
  const [imageSize, setImageSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const calculateImageSize = () => {
      const width = window.innerWidth;

      // Calculer la largeur disponible pour les images
      const totalGap = numImages * imageGap;
      const availableWidth = width - 2 * buttonWidth - totalGap;

      // Calculer la largeur d'une image
      const imageWidth = availableWidth / numImages;

      // Calculer la hauteur d'une image pour respecter le ratio 16/9
      const imageHeight = (imageWidth * 9) / 16;

      setImageSize({
        width: imageWidth,
        height: imageHeight,
      });
    };

    window.addEventListener("resize", calculateImageSize);
    calculateImageSize();

    return () => window.removeEventListener("resize", calculateImageSize);
  }, [numImages, buttonWidth, imageGap]);

  return imageSize;
};

export default useImageSize;
