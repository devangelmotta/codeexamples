import { Separator } from '~/components/primitive';

const ColorsGuide = () => {
  const colors = [
    {
      name: 'gray',
      variants: [
        { key: 100, value: '#C5CDD4' },
        { key: 200, value: '#747D85' },
        { key: 300, value: '#293136' },
        { key: 400, value: '#f5f5f5' },
        { key: 500, value: '#818181' },
        { key: 600, value: '#e2e2e2' },
        { key: 700, value: '#bcbcbc' },
      ],
    },
    {
      name: 'yellow',
      variants: [
        { key: 100, value: '#F3A73B' },
        { key: 200, value: '#FFC13B' },
        { key: 300, value: '#FCE4A1' },
        { key: 400, value: '#ffe497' },
      ],
    },
    {
      name: 'blue',
      variants: [
        { key: 100, value: '#223066' },
        { key: 200, value: '#2453a5' },
        { key: 300, value: '#a1cafc' },
      ],
    },
    {
      name: 'green',
      variants: [
        { key: 100, value: '#3DCA36' },
        { key: 200, value: '#28432E' },
      ],
    },
    {
      name: 'red',
      variants: [{ key: 100, value: '#F5515F' }],
    },
  ];

  return (
    <div className="p-5">
      <div className="rounded-lg shadow-lg p-3">
        <h1>Colors</h1>
        <Separator size={4} />

        <div>
          <h3 className="text-center text-2xl font-bold">How to use it?</h3>
          <Separator size={4} />

          <div className="flex flex-wrap flex-row">
            <div className="w-full md:w-1/2 p-5">
              <h3 className="text-2xl text-center font-semibold">
                With Tailwind classes
              </h3>
              <Separator size={4} />
              <p>
                Control the color of an element adding the{' '}
                <code>.[attribute]-[color]</code>
                class.
              </p>
              <Separator size={2} />

              <h3 className="font-semibold">For Example:</h3>
              <Separator size={2} />

              <p>
                <code>.text-gray-pt-100</code> Where <code>text</code>
                is the attribute and <code>gray-pt-100</code>
                is the color.
              </p>
              <Separator size={2} />

              <p>
                <code>.border-yellow-pt-100</code> Where <code>border</code>
                is the attribute and <code>yellow-pt-100</code>
                is the color.
              </p>
              <Separator size={2} />

              <p>
                <code>.bg-green-pt-100</code> Where <code>bg</code>
                is the attribute and <code>green-pt-100</code>
                is the color.
              </p>
              <Separator size={2} />
            </div>

            <div className="w-full md:w-1/2 border-t border-gray-pt-100 md:border-l md:border-t-0 p-5">
              <h3 className="text-2xl text-center font-semibold">With Styled-jsx</h3>
              <Separator size={4} />
              <p>
                You can add the <code>var(--[color])</code> in any attribute that allows
                color params on your CSS classes.
              </p>
              <Separator size={2} />

              <h3 className="font-semibold">For Example:</h3>
              <Separator size={2} />

              <div className="ml-3">
                <p>
                  <code>
                    {'.pt-label--dark-yellow {'}
                    <br />
                    <span className="ml-8">background-color: var(--yellow-pt-200);</span>
                    <br />
                    <span className="ml-8">border: var(--blue-pt-100);</span>
                    <br />
                    {'}'}
                  </code>
                </p>
                <Separator size={1} />
                <p>
                  Where <code>yellow-pt-200</code> and <code>blue-pt-100</code> are the
                  colors.
                </p>
              </div>
              <Separator size={4} />
              <div className="ml-3">
                <p>
                  <code>
                    {'.pt-select--error {'}
                    <br />
                    <span className="ml-8">
                      border-bottom: 3px solid var(--red-pt-100);
                    </span>
                    <br />
                    <span className="ml-8">color: var(--red-pt-100);</span>
                    <br />
                    {'}'}
                  </code>
                </p>
                <Separator size={1} />
                <p>
                  Where <code>red-pt-100</code>
                  is the color.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator size={8} color="gray" />

        <div className="pb-6">
          <h2 className="text-center">Color list</h2>
          <Separator size={4} />

          <div className="flex flex-row flex-wrap">
            {colors.map(color => {
              return (
                <div
                  className={`w-full sm:w-1/${colors.length} my-5 sm:my-0 px-2`}
                  key={color.name}
                >
                  <h2 className="font-semibold text-center sm:text-left">{color.name}</h2>

                  {color.variants.map(variant => {
                    return (
                      <div
                        className="flex items-center mt-5 justify-center sm:justify-start"
                        key={`${color.name}-${variant.key}`}
                      >
                        <div
                          className={`h-12 w-12 rounded-lg shadow-inner bg-${color.name}-pt-${variant.key}`}
                        />
                        <div
                          className={`ml-2 text-${color.name}-pt-${variant.key} text-sm leading-none pl-1`}
                        >
                          <div className="font-semibold">{`${color.name}-pt-${variant.key}`}</div>
                          <div className="mt-1 opacity-75">{variant.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>
        {`
          h1 {
            color: #333;
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 20px;
          }

          h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 10px;
          }

          code {
            background-color: #eee;
            border-radius: 3px;
            font-family: courier, monospace;
            padding: 0 3px;
          }
        `}
      </style>
    </div>
  );
};

export default ColorsGuide;
