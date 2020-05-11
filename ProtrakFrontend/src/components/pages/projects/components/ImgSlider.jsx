import { useState } from 'react';
import PropTypes from 'prop-types';
import ItemsCarousel from 'react-items-carousel';
import { useMediaQuery } from 'react-responsive';

const ImgSlider = ({ images }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const isDesktop = useMediaQuery({ query: '(min-device-width: 1024px)' });

  return null;

  // eslint-disable-next-line
  return (
    <div className="root mx-auto w-full">
      <ItemsCarousel
        infiniteLoop={false}
        gutter={8}
        activePosition="center"
        chevronWidth={36}
        disableSwipe={false}
        alwaysShowChevrons={false}
        numberOfCards={3}
        slidesToScroll={1}
        showSlither={false}
        firstAndLastGutter={false}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={value => setActiveItemIndex(value)}
        rightChevron={
          <div className="bg-white p-2 rounded-full shadow">
            <img src="/static/images/icons/arrow-right-dark.svg" alt="Right icon" />
          </div>
        }
        leftChevron={
          <div className="bg-white p-2 rounded-full shadow">
            <img src="/static/images/icons/arrow-left-dark.svg" alt="Left icon" />
          </div>
        }
      >
        {images.map((item, index) => (
          <div
            key={index}
            style={{
              // height: isDesktop ? 115 : 97,
              // background: `url(${item})`,
              width: 200,
              height: 200,
              border: '1px solid red',
            }}
            className="rounded"
          >
            <img
              src={item}
              alt=""
              style={{ maxWidth: '100%', height: isDesktop ? 115 : 97 }}
            />
          </div>
        ))}
      </ItemsCarousel>

      <style jsx>{`
        .root {
          max-width: 300px;
        }

        /* Small devices [sm] */
        @media (min-width: 640px) {
          .root {
            max-width: 400px;
          }
        }

        /* Medium devices [md] */
        @media (min-width: 768px) {
          .root {
            max-width: 500px;
          }
        }

        /* Large [lg] */
        @media (min-width: 1024px) {
          .root {
            max-width: 400px;
          }
        }

        /* Extra Large [xl] */
        @media (min-width: 1280px) {
          .root {
            max-width: 500px;
          }
        }
      `}</style>
    </div>
  );
};

ImgSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

ImgSlider.defaultProps = {
  images: [],
};

export default ImgSlider;
