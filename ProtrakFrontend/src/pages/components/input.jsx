import { useState } from 'react';
import { Input, Separator } from '~/components/primitive';

const Page = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputsChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <div className="p-5">
      <div className="rounded-lg shadow-lg p-3">
        <h1>Inputs</h1>

        <h2>Input normal</h2>
        <Input
          placeholder="I am a placeholder..."
          value={inputValue}
          onChange={handleInputsChange}
        />
        <Separator size={4} />

        <h2>Input with error</h2>
        <Input
          error="Error"
          value={inputValue}
          onChange={handleInputsChange}
          showErrorMessage
        />
        <Separator size={4} />

        <h2>Input with icon</h2>
        <Input
          icon={<img src="/static/images/icons/email.svg" alt="Email icon" />}
          value={inputValue}
          onChange={handleInputsChange}
        />
        <Separator size={4} />

        <h2>Input password</h2>
        <Input
          variant="pt-input--password"
          placeholder="I am a placeholder..."
          value={inputValue}
          onChange={handleInputsChange}
        />
        <Separator size={4} />

        <h2>Input password with error</h2>
        <Input
          variant="pt-input--password"
          error="Error"
          value={inputValue}
          onChange={handleInputsChange}
        />
        <Separator size={4} />

        <h2>Input disabled</h2>
        <Input value={inputValue} onChange={handleInputsChange} disabled />
        <Separator size={4} />

        <h2>Textarea</h2>
        <Input
          variant="pt-input--textarea"
          value={inputValue}
          onChange={handleInputsChange}
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
