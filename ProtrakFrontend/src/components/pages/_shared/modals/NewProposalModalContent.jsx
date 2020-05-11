import { Separator } from '~/components/primitive';
import { FormModalContent, ProjectOptionsBox } from '~/components/pages/_shared';

const NewProposalModalContent = () => {
  return (
    <FormModalContent titleIcon="folder-blue" titleText="New proposal type">
      <div className="flex flex-wrap justify-around">
        <div className="proposal-box">
          <ProjectOptionsBox
            title="Proposal to client"
            description="You can create a proposal for a client"
            icon="folder-client"
            onClickHandler={() => {
              alert('Selected Proposal to Client');
            }}
          />
        </div>
        <Separator responsive={[1, 1]} />
        <div className="proposal-box">
          <ProjectOptionsBox
            title="Proposal to supplier"
            description="You can create a proposal for a supplier"
            icon="folder-suppliers"
            onClickHandler={() => {
              alert('Selected Proposal to Supplier');
            }}
          />
        </div>
      </div>

      <style jsx>
        {`
          .proposal-box {
            width: 272px;
          }
        `}
      </style>
    </FormModalContent>
  );
};

export default NewProposalModalContent;
