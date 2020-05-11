import Link from 'next/link';

const Page = () => {
  return (
    <div className="p-5">
      <div className="rounded-lg shadow-lg p-3">
        <div>
          <Link href="/components/button">
            <a>Button</a>
          </Link>
          <Link href="/components/checkbox">
            <a>Checkbox</a>
          </Link>
          <Link href="/components/dropdown">
            <a>Dropdown</a>
          </Link>
          <Link href="/components/input">
            <a>Input</a>
          </Link>
          <Link href="/components/label">
            <a>Label</a>
          </Link>
          <Link href="/components/modal">
            <a>Modal</a>
          </Link>
          <Link href="/components/select">
            <a>Select</a>
          </Link>
          <Link href="/components/switch">
            <a>Switch</a>
          </Link>
          <Link href="/components/tabs">
            <a>Tabs</a>
          </Link>
        </div>
        <hr className="my-5" />
        <div>
          <Link href="/components/colors">
            <a>Colors Guide</a>
          </Link>
        </div>
      </div>

      <style jsx>
        {`
          :global(a) {
            display: inline-block;
            margin: 5px;
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
};

export default Page;
