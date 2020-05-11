import { Label, Separator } from '~/components/primitive';

const Page = () => {
  return (
    <div className="p-5">
      <div className="rounded-lg shadow-lg p-3">
        <h1>Labels</h1>

        <h2>Size sm</h2>
        <Separator size={4} />

        <Label
          variant="pt-label--blue"
          size="sm"
          onClick={() => {
            alert('ADMIN');
          }}
        >
          ADMIN
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--light-yellow" size="sm">
          OWNER
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--light-green" size="sm">
          TEAM
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--dark-green" size="sm">
          PAID
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--dark-yellow" size="sm">
          PENDING
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--red" size="sm">
          UNPAID
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--gray" size="sm">
          Earring by supplier
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--dark-blue" size="sm">
          Proposed approved
        </Label>
        <Separator size={4} />

        <h2>Size md</h2>
        <Separator size={4} />

        <Label variant="pt-label--blue" size="md">
          ADMIN
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--light-yellow" size="md">
          OWNER
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--light-green" size="md">
          TEAM
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--dark-green" size="md">
          PAID
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--dark-yellow" size="md">
          PENDING
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--red" size="md">
          UNPAID
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--gray" size="md">
          Earring by supplier
        </Label>
        <Separator size={4} />

        <Label variant="pt-label--dark-blue" size="md">
          Proposed approved
        </Label>
        <Separator size={4} />

        <h2>With Icon</h2>
        <Separator size={4} />

        <Label
          variant="pt-label--dark-blue"
          size="md"
          icon={<img src="/static/images/icons/download-white.svg" alt="Download icon" />}
        >
          Proposed approved
        </Label>
        <Separator size={4} />

        <Label
          variant="pt-label--gray"
          size="md"
          icon={<img src="/static/images/icons/download-white.svg" alt="Download icon" />}
        >
          Earring by supplier
        </Label>
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
