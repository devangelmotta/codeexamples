import { useRef } from 'react';
import { Separator, Dropdown } from '~/components/primitive';

const Page = () => {
  const { current: dropdownDarkOptions } = useRef([
    {
      value: '1',
      label: 'Option 1',
      icon: <img src="/static/images/icons/project-white.svg" alt="Project icon" />,
      description: 'Descripcion test',
    },
    {
      value: '2',
      label: 'Option 2',
      icon: <img src="/static/images/icons/project-white.svg" alt="Project icon" />,
      description: 'Descripcion test',
    },
    {
      value: '3',
      label: 'Option 3',
      icon: <img src="/static/images/icons/user-white.svg" alt="Lock icon" />,
      description: 'Descripcion test',
    },
  ]);

  const { current: dropdownLightOptions } = useRef([
    {
      value: '1',
      label: 'Option 1',
      icon: <img src="/static/images/icons/user.svg" alt="User icon" />,
      description: 'Descripcion test',
    },
    {
      value: '2',
      label: 'Option 2',
    },
    {
      value: '3',
      label: 'Option 3',
      icon: <img src="/static/images/icons/user.svg" alt="User icon" />,
    },
  ]);

  return (
    <div className="p-5">
      <div className="rounded-lg shadow-lg p-3">
        <h1>Dropdown</h1>
        <Separator size={2} />

        <h2>Dark</h2>
        <Dropdown
          variant="pt-dropdown--dark"
          options={dropdownDarkOptions}
          placeholder="Dark Menu"
          onOptionClickHandler={selectedOption =>
            alert(`Option with value ${selectedOption} clicked!`)
          }
        />
        <Separator size={4} />

        <h2>Light</h2>
        <Dropdown
          variant="pt-dropdown--light"
          options={dropdownLightOptions}
          placeholder="Light Menu"
          onOptionClickHandler={selectedOption =>
            alert(`Option with value ${selectedOption} clicked!`)
          }
        />
        <Separator size={4} />

        <h2>With custom button</h2>
        <Dropdown
          variant="pt-dropdown--light"
          options={dropdownLightOptions}
          placeholder="Light Menu"
          CustomButton={<img src="/static/images/icons/email.svg" alt="Email icon" />}
          onOptionClickHandler={selectedOption =>
            alert(`Option with value ${selectedOption} clicked!`)
          }
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
