import { useState } from 'react';

const useSwitchOptions = (options, selectedOptionIndex = 0) => {
  const [data, setData] = useState(
    options.reduce(
      (acum, curr, index) => {
        const value = curr
          .toUpperCase()
          .replace(/ /g, '_')
          .replace(/-/g, '_');

        if (index === selectedOptionIndex) {
          // eslint-disable-next-line no-param-reassign
          acum.selectedOption = value;
        }

        // eslint-disable-next-line no-param-reassign
        acum.options[value] = value;

        return acum;
      },
      { selectedOption: undefined, options: {} },
    ),
  );

  const setSelectedOption = key => {
    setData({ ...data, selectedOption: key });
  };

  return { ...data, setSelectedOption };
};

export default useSwitchOptions;
