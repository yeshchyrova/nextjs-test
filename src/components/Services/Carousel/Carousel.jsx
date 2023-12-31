"use client";
import PropTypes from "prop-types";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import Nav from "./Nav";
import SubText from "./SubText";
import Options from "./Options";
import Description from "./Description";
import SlidesBlock from "./SlidesBlock";
import images from "./images";

const Carousel = ({ options, setActiveIndex, activeIndex }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    function selectHandler() {
      const index = emblaApi?.selectedScrollSnap();
      setActiveIndex(index || 0);
    }

    emblaApi?.on("select", selectHandler);

    return () => {
      emblaApi?.off("select", selectHandler);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const length = images.length;

  return (
    <>
      <Nav itemsLength={length} selectedIndex={activeIndex} />
      <div className="embla mb-[12px]">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            <SlidesBlock />
          </div>
        </div>
      </div>
      <div className="tablet:absolute tablet:top-[117px] tablet:w-[221px] tablet:flex tablet:flex-col tablet:h-[370px] tablet:right-[28px] desktop:top-[137px] desktop:left-[648px] desktop:w-[605px] desktop:h-[434px]">
        <SubText selectedIndex={activeIndex} />
        <Options
          selectedIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          scrollTo={scrollTo}
        />
        <Description selectedIndex={activeIndex} />
      </div>
    </>
  );
};

Carousel.propTypes = {
  options: PropTypes.shape({
    loop: PropTypes.bool,
  }),
  setActiveIndex: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

export default Carousel;
