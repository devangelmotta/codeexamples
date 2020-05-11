import { useState } from 'react';
import { Checkbox, Separator } from '~/components/primitive';

const Page = () => {
  const [checkBoxValue, setCheckBoxValue] = useState(false);

  const onCheckboxesChange = () => {
    setCheckBoxValue(!checkBoxValue);
  };

  return (
    <div className="p-5">
      <div className="rounded-lg shadow-lg p-3">
        <h1>Checkbox</h1>

        <h2>Without text default</h2>
        <Checkbox
          name="remember-me-1"
          checked={checkBoxValue}
          onChange={onCheckboxesChange}
        />
        <Separator size={4} />

        <h2>Without text gray</h2>
        <Checkbox
          name="remember-me-2"
          checked={checkBoxValue}
          variant="pt-checkbox--gray"
          onChange={onCheckboxesChange}
        />
        <Separator size={4} />

        <h2>With text default</h2>
        <Checkbox
          name="remember-me-3"
          text="Remember me"
          checked={checkBoxValue}
          onChange={onCheckboxesChange}
        />
        <Separator size={4} />

        <h2>With text gray</h2>
        <Checkbox
          name="remember-me-4"
          text="Remember me"
          checked={checkBoxValue}
          variant="pt-checkbox--gray"
          onChange={onCheckboxesChange}
        />
        <Separator size={4} />

        <h2>With text error</h2>
        <Checkbox
          name="remember-me-5"
          text="Remember me"
          checked={checkBoxValue}
          onChange={onCheckboxesChange}
          error
        />
        <Separator size={4} />

        <h2>Without text error</h2>
        <Checkbox
          name="remember-me-6"
          checked={checkBoxValue}
          onChange={onCheckboxesChange}
          error
        />

        <h2>Custom text</h2>
        <Checkbox
          name="remember-me-6"
          checked={checkBoxValue}
          text={
            <span className="text-blue-200">
              Custom <strong>text</strong>
            </span>
          }
          onChange={onCheckboxesChange}
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
