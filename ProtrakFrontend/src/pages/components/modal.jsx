import { useCallback } from 'react';
import { Button, Modal, Separator } from '~/components/primitive';
import {
  ConfirmationAlertModalContent,
  NewSupplierModalContent,
} from '~/components/pages/_shared';
import { useSwitchOptions } from '~/hooks';

const Page = () => {
  const { options, selectedOption, setSelectedOption } = useSwitchOptions([
    'hide-modals',
    'default-modal',
    'confirmation-modal',
    'new-supplier-modal',
  ]);

  const onCloseModalHandler = useCallback(() => {
    setSelectedOption(options.HIDE_MODALS);
  }, []);

  return (
    <div className="p-5">
      <div className="rounded-lg shadow-lg p-3">
        <h1>Modal</h1>

        <Button
          variant="pt-button--dark-blue"
          onClick={() => {
            setSelectedOption(options.DEFAULT_MODAL);
          }}
        >
          Open modal
        </Button>
        <Modal
          visible={selectedOption === options.DEFAULT_MODAL}
          onCloseHandler={onCloseModalHandler}
          showCloseButton
        >
          <p className="p-8">This is a modal!</p>
        </Modal>

        <Separator size={4} />

        <Button
          onClick={() => {
            setSelectedOption(options.CONFIRMATION_MODAL);
          }}
        >
          Confirmation Modal
        </Button>
        <Modal
          visible={selectedOption === options.CONFIRMATION_MODAL}
          onCloseHandler={onCloseModalHandler}
          showCloseButton
        >
          <ConfirmationAlertModalContent
            isLoading={false}
            mainActionText="Yes, delete it."
            onMainActionHandler={e => {
              alert(e.currentTarget.innerText);
            }}
            onCancelHandler={onCloseModalHandler}
          />
        </Modal>

        <Separator size={4} />

        <Button
          onClick={() => {
            setSelectedOption(options.NEW_SUPPLIER_MODAL);
          }}
        >
          New supplier
        </Button>
        <Modal
          visible={selectedOption === options.NEW_SUPPLIER_MODAL}
          onCloseHandler={onCloseModalHandler}
          showCloseButton
        >
          <NewSupplierModalContent onCloseHandler={onCloseModalHandler} />
        </Modal>
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
