import { useCallback, useState, useRef } from 'react';

import { ToggleSwitch, Separator, Button } from '~/components/primitive';
import { Footer } from '~/components/layout';

const Pricing = () => {
  const [isPayMonthlyChecked, setIsPayMonthlyChecked] = useState(false);
  const { current: items } = useRef([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const onToggleChange = useCallback(() => {
    setIsPayMonthlyChecked(currentValue => !currentValue);
  }, []);

  return (
    <main className="root h-full overflow-auto">
      <section className="flex flex-col px-4 py-8 justify-center items-center">
        <section className="content md:p-12">
          <h1 className="text-gray-pt-300 text-6xl text-center font-bold mb-3">
            Pricing
          </h1>
          <h2 className="text-gray-pt-300 text-lg text-center font-bold">
            Upgrade to premium
          </h2>

          <div className="mt-12 mb-4">
            <div>
              <span className="text-left font-bold pr-2">Pay yearly</span>
              <ToggleSwitch
                name="periodicity-toggle"
                checked={isPayMonthlyChecked}
                onChange={onToggleChange}
              />
              <span className="text-right font-bold pl-2">Pay monthly</span>
            </div>
            <p className="text-xs pt-1 h-6">
              {isPayMonthlyChecked === false ? 'Save 20%' : ''}
            </p>
          </div>

          <div className="md:flex">
            <div className="content__plan overflow-hidden z-10 p-6 rounded-lg shadow-lg text-left bg-white justify-center items-start">
              {isPayMonthlyChecked === false && (
                <div className="content__plan__label py-1 transform rotate-45 w-48 shadow-lg text-xs text-center">
                  Save 20%
                </div>
              )}

              <h3 className="text-gray-pt-300 text-2xl font-bold mt-6">Plan</h3>
              <div>
                <span className="text-gray-pt-300 text-5xl text-left font-bold">
                  ${isPayMonthlyChecked ? 22 : 17}
                </span>
                <span className="text-gray-pt-300 text-1xl font-bold">
                  {isPayMonthlyChecked ? '/Month' : '/Year'}
                </span>
              </div>
              <Separator color="gray" size={1} width={2} />

              <ul className="py-3">
                {items.map(item => {
                  return (
                    <li
                      key={`item${item}`}
                      className="text-gray-pt-300 py-2 flex flex-row items-center"
                    >
                      <img
                        className="h-5 pr-2"
                        src="/static/images/icons/checkmark-circle-2-outline.svg"
                        alt="Checkmark icon"
                      />
                      <span>Item {item}</span>
                    </li>
                  );
                })}
              </ul>

              <Button size="sm" className="w-full">
                Subscribe Now
              </Button>
            </div>

            <div className="p-12 my-6 md:my-12 rounded-lg shadow-lg text-center bg-white justify-center w-auto max-w-full">
              <div className="flex">
                <img
                  className="h-16 w-16 rounded-full"
                  src="https://aitcbd.weebly.com/uploads/1/2/4/1/124127059/published/bitmap3-3x_6.png?1548790510"
                  alt="Profile"
                />
                <div className="ml-4 flex flex-col justify-center flex-1">
                  <p className="text-left font-bold">- Donald McGee</p>
                  <p className="ml-2 text-left text-sm italic">Company Co.</p>
                </div>
              </div>
              <p className="text-gray-pt-300 my-6 text-left text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
              <iframe
                title="Building"
                className="rounded-md w-full h-64"
                src="https://www.youtube-nocookie.com/embed/_A7_tfvt0UY?modestbranding=0&showinfo=0&controls=0&rel=0"
                frameBorder="1"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        </section>
      </section>
      <Footer />

      <style jsx>{`
        .root {
          background: var(--yellow-gradient);
        }

        .content {
          max-width: 100%;
          width: 859px;
        }

        .content__plan {
          flex-shrink: 0;
          position: relative;
          width: 100%;
        }

        .content__plan__label {
          background-color: var(--yellow-pt-200);
          margin-right: -75px;
          position: absolute;
          right: 20px;
          top: 30px;
        }

        /* Medium devices [md] */
        @media (min-width: 768px) {
          .content__plan {
            width: 275px;
          }
        }
      `}</style>
    </main>
  );
};

export default Pricing;
