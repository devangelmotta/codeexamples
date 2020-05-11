import { Button, Separator } from '~/components/primitive';

const Page = () => {
  const handleButtonsClick = e => {
    alert(`${e.target.innerText} Clicked!`);
  };

  return (
    <div className="p-5">
      <div className="rounded-lg shadow-lg p-3">
        <h1>Buttons</h1>

        <Button onClick={handleButtonsClick}>default button</Button>
        <Separator size={4} />

        <Button variant="pt-button--green" onClick={handleButtonsClick}>
          green button
        </Button>
        <Separator size={4} />

        <Button variant="pt-button--yellow" onClick={handleButtonsClick}>
          yellow button
        </Button>
        <Separator size={4} />

        <Button variant="pt-button--red" onClick={handleButtonsClick}>
          red button
        </Button>
        <Separator size={4} />

        <Button variant="pt-button--dark-blue" onClick={handleButtonsClick}>
          dark-blue button
        </Button>
        <Separator size={4} />

        <Button variant="pt-button--gray" onClick={handleButtonsClick}>
          gray button
        </Button>
        <Separator size={4} />

        <Button variant="pt-button--gray" onClick={handleButtonsClick} disabled>
          disabled gray button
        </Button>
        <Separator size={4} />

        <Button variant="pt-button--dark-blue" onClick={handleButtonsClick} isLoading>
          dark-blue button loading
        </Button>
        <Separator size={4} />

        <Button
          variant="pt-button--dark-blue"
          icon={<img src="/static/images/icons/download-white.svg" alt="Download icon" />}
          onClick={handleButtonsClick}
        >
          dark-blue button with icon
        </Button>
        <Separator size={4} />

        <Button
          variant="pt-button--dark-blue"
          icon={<img src="/static/images/icons/download-white.svg" alt="Download icon" />}
          onClick={handleButtonsClick}
          isLoading
        >
          dark-blue button with icon and loading
        </Button>
        <Separator size={4} />

        <Button variant="pt-button--dark-blue" size="sm" onClick={handleButtonsClick}>
          sm button
        </Button>
        <Separator size={4} />

        <Button variant="pt-button--dark-blue" size="md" onClick={handleButtonsClick}>
          md button
        </Button>
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
