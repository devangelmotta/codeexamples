import { useState, useCallback } from 'react';
import { ToggleSwitch } from '~/components/primitive';

const Page = () => {
  const [checked, setChecked] = useState(false);

  const onToggleChange = useCallback(() => {
    setChecked(currentValue => !currentValue);
  }, []);

  return (
    <div className="p-5">
      <div className="rounded-lg shadow-lg p-3">
        <h1>Toggle Switch</h1>

        <h2>Default</h2>
        <div className="flex flex-row items-center">
          <ToggleSwitch checked={checked} name="toggle-1" onChange={onToggleChange} />
          <span className="ml-2">{checked ? 'Enabled' : 'Disabled'}</span>
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
        `}
      </style>
    </div>
  );
};

export default Page;
