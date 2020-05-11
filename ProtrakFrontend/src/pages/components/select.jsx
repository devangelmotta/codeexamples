import { useState, useRef } from 'react';
import { Select, Separator } from '~/components/primitive';

const Page = () => {
  const [value, setValue] = useState('');
  const { current: selectOptions } = useRef([
    {
      value: '1',
      label: 'Option 1',
    },
    {
      value: '2',
      label: 'Option 2',
    },
    {
      value: '3',
      label: 'Option 3',
    },
  ]);

  return (
    <div className="p-5">
      <div className="rounded-lg shadow-lg p-3">
        <h1>Select</h1>

        <h2>Default</h2>
        <Select
          name="region"
          options={selectOptions}
          value={value}
          onChange={element => setValue(element.target.value)}
        />
        <Separator size={4} />

        <h2>With placeholder</h2>
        <Select
          name="region"
          placeholder="Placeholder test..."
          options={selectOptions}
          value={value}
          onChange={element => setValue(element.target.value)}
        />
        <Separator size={4} />

        <h2>With icon</h2>
        <Select
          name="region"
          options={selectOptions}
          value={value}
          placeholder="Default option"
          icon="user"
          onChange={element => setValue(element.target.value)}
        />
        <Separator size={4} />

        <h2>With error</h2>
        <Select
          name="region"
          options={selectOptions}
          value={value}
          error="Error"
          placeholder="Select With Error"
          onChange={element => setValue(element.target.value)}
        />
        <Separator size={4} />

        <h2>With error and icon</h2>
        <Select
          name="region"
          options={selectOptions}
          value={value}
          error="Error"
          placeholder="Select With Error"
          icon="/static/images/icons/user.svg"
          onChange={element => setValue(element.target.value)}
        />
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
        `}
      </style>
    </div>
  );
};

export default Page;
