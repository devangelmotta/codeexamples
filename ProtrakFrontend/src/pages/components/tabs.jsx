import { Tabs } from '~/components/primitive';

const Page = () => {
  return (
    <div className="p-5">
      <div className="rounded-lg shadow-lg p-3">
        <h1>Tabs</h1>
        <Tabs>
          <div data-label="First Tab">
            <p>Welcome to First tab!</p>
          </div>
          <div data-label="Second Tab">
            <p>Hello word on Second tab!</p>
          </div>
        </Tabs>
      </div>

      <style jsx>
        {`
          h1 {
            color: #333;
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default Page;
