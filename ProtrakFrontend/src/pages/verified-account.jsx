import { SimpleLayout } from '~/components/layout';
import { Button } from '~/components/primitive';
import { Routes } from '~/utils/constants';

const ConfirmAccount = () => {
  return (
    <SimpleLayout>
      <div className="text-center py-12">
        <img
          src="/static/images/icons/check.svg"
          alt="Success"
          className="mx-auto h-50 w-50"
        />
        <p className="text-3xl my-6">Verified account</p>
        <Button
          link={{
            href: Routes.SIGN_IN,
          }}
        >
          Go to Sign In page
        </Button>
      </div>
    </SimpleLayout>
  );
};

export default ConfirmAccount;
