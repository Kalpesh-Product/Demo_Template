import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ColumnsPhotoAlbum, MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import "react-photo-album/columns.css";
import { useKeenSlider } from "keen-slider/react";
import MuiModal from "../components/Modal";
import TransparentModal from "../components/TransparentModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ImageGallery = () => {
  const location = useLocation();
  const { images = [], companyName, selectedImageId } = location.state || {};
  const imageRefs = useRef({});
  const [imageLoadStatus, setImageLoadStatus] = useState({});

  const [photos, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged: (s) => setCurrentIndex(s.track.details.rel),
  });

  useEffect(() => {
    const loadImageDimensions = async () => {
      const promises = images.map(
        (img) =>
          new Promise((resolve) => {
            const image = new Image();
            image.src = img.url;
            image.onload = () => {
              resolve({
                src: img.url,
                width: image.naturalWidth,
                height: image.naturalHeight,
                key: img._id,
              });
            };
            image.onerror = () => {
              resolve({
                src: img.url,
                width: 4,
                height: 3,
                key: img._id,
              });
            };
          })
      );

      const loadedPhotos = await Promise.all(promises);
      setPhotos(loadedPhotos);
    };

    loadImageDimensions();
  }, [images]);

  useEffect(() => {
    if (selectedImageId && imageRefs.current[selectedImageId]) {
      imageRefs.current[selectedImageId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [photos, selectedImageId]);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);

    // Wait for the modal and slider to render
    setTimeout(() => {
      instanceRef.current?.moveToIdx(index);
    }, 0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrev = () => {
    instanceRef.current?.prev();
  };

  const goToNext = () => {
    instanceRef.current?.next();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4">
      <div>
        <h1 className="text-title font-semibold text-secondary-dark">
          {companyName || "Unknown"} Gallery
        </h1>
      </div>
      <ColumnsPhotoAlbum
        photos={photos}
        spacing={8}
        columns={(containerWidth) => {
          if (containerWidth < 640) return 1;
          if (containerWidth < 1024) return 2;
          return 2;
        }}
        renderPhoto={({ photo, wrapperStyle, imageProps }) => {
          const isLoaded = imageLoadStatus[photo.key];

          return (
            <div
              style={wrapperStyle}
              key={photo.key}
              ref={(el) => {
                if (el) imageRefs.current[photo.key] = el;
              }}
              className="relative"
            >
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
              )}
              <img
                {...imageProps}
                onLoad={() =>
                  setImageLoadStatus((prev) => ({ ...prev, [photo.key]: true }))
                }
                className={`rounded-md cursor-pointer transition ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                alt="gallery"
              />
            </div>
          );
        }}
        onClick={({ index }) => openModal(index)} // Optional: if you keep the modal feature
      />

      <TransparentModal
        open={isModalOpen}
        onClose={closeModal}
        title=""
        headerBackground="black"
      >
        <div className="flex items-center justify-between w-full">
          <button
            onClick={goToPrev}
            className="text-white hidden  border-white border-2 bg-black hover:bg-gray-600 w-12 h-12 p-0 lg:flex items-center justify-center rounded-full"
          >
            <IoIosArrowBack />
          </button>
          <div ref={sliderRef} className="keen-slider w-full">
            {photos.map((photo, idx) => (
              <div
                key={photo.key}
                className="keen-slider__slide flex justify-center items-center"
              >
                <img
                  src={photo.src}
                  alt={`Image ${idx + 1}`}
                  className="w-full h-[90vh] object-contain rounded-md"
                />
              </div>
            ))}
          </div>
          <button
            onClick={goToNext}
            className="text-white hidden  border-white border-2 bg-black hover:bg-gray-600 w-12 h-12 p-2 lg:flex items-center justify-center rounded-full"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </TransparentModal>
    </div>
  );
};

export default ImageGallery;
