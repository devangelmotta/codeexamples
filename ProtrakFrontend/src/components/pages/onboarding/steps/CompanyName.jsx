import { Fragment, useState, useCallback, useRef } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';

import { Input, Separator } from '~/components/primitive';
import { Loader } from '~/components/pages/_shared';
import { getBase64 } from '~/utils/utils';
import { USER_ID } from '~/utils/constants';
import { MUTATION_CREATE_COMPANY } from '~/graphql/mutations/company';

import Stepper from '../components/Stepper';
import { useOnboardingContext } from '../context';
import { companyNameFormValidation } from '../formConfig';

const CompanyName = () => {
  const { updateCreateCompanyForm, steps, setCurrentStep } = useOnboardingContext();
  const { current: logoFileInitialState } = useRef({
    base64Logo: null,
    file: null,
    name: '',
    size: 0,
  });
  const [logoFile, setLogoFile] = useState(logoFileInitialState);
  const [createCompany, { loading }] = useMutation(MUTATION_CREATE_COMPANY);

  const handleSubmitClick = useCallback(
    async values => {
      try {
        const logo = logoFile.base64Logo;
        const logoName = logoFile.name || null;
        const {
          data: { createOneCompany: companyCreated },
        } = await createCompany({
          variables: {
            name: values.name,
            status: 'PENDING',
            userId: USER_ID,
            logo,
            logoName,
          },
        });

        updateCreateCompanyForm({
          ...values,
          ...companyCreated,
        });
        setCurrentStep(steps.COMPANY_ADDRESS);
      } catch (e) {
        alert('Error'); // TODO: handleError
        console.trace(e);
      }
    },
    [logoFile],
  );

  const uploadFile = useCallback(event => {
    const file = event.target.files[0];
    const img = new Image();

    img.src = URL.createObjectURL(file);
    img.onload = e => {
      const { width, height } = e.path[0];
      if (width <= 250 && height <= 250) {
        getBase64(file, result => {
          setLogoFile({
            file: URL.createObjectURL(file),
            name: file.name,
            size: Math.round(file.size / 1000),
            base64Logo: result,
          });
        });
      } else {
        alert('This image exceeds the dimensions limit'); // TODO: handleError
      }
    };
  }, []);

  return (
    <Fragment>
      <Loader isLoading={loading} />
      <Stepper.Title>What&apos; the name of your company?</Stepper.Title>
      <Formik
        validate={companyNameFormValidation}
        initialValues={{
          name: '',
        }}
        onSubmit={handleSubmitClick}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isValid,
          touched,
          values,
          setFieldValue,
        }) => {
          return (
            <form
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <Input
                htmlAttrs={{
                  placeholder: 'P. ej., Constuc S.A. o GVN 123',
                  name: 'name',
                  type: 'text',
                }}
                value={values.name}
                error={touched.name ? errors.name : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              {/*
              <Select
                name="region"
                options={selectOptions}
                value={values.type}
                placeholder="Type of company"
                icon="company-dark"
                onChange={element => setValue(element.target.value)}
              />
              */}
              <Separator size={3} />

              {logoFile.base64Logo ? (
                <div className="w-full flex flex-wrap">
                  <div className="logo flex items-center justify-center relative mx-auto md:mx-0">
                    <img
                      src={logoFile.file}
                      alt="Company Logo"
                      className="logo__img-uploaded mx-auto"
                    />
                    <img
                      src="/static/images/icons/trash-red.svg"
                      className="logo__delete-icon h-6 w-6"
                      alt="Delete icon"
                      onClick={() => {
                        setLogoFile(logoFileInitialState);
                      }}
                    />
                  </div>
                  <Separator responsive={[2, 1]} />
                  <div className="w-full md:w-auto md:flex-1 text-gray-pt-200 text-sm flex justify-center flex-col items-center md:items-start">
                    <span>{logoFile.name}</span>
                    <span>Size: {logoFile.size} KB</span>
                  </div>
                </div>
              ) : (
                <div
                  className="flex justify-center border-dashed border-gray-pt-100 border-2 cursor-pointer p-4"
                  onClick={() => document.getElementById('companyLogo').click()}
                >
                  <div className="text-center text-gray-pt-200">
                    <p className="text-2xl text-gray-pt-100 mb-2">
                      Drag and drop your logo
                    </p>
                    <p>
                      or <strong className="text-blue-pt-100">browse</strong> to choose a
                      file
                    </p>
                    <p>
                      Upload logo in JPEG, JPG, PNG, 250 pixels width x 250 pixels height.
                    </p>
                  </div>
                  <div className="hidden">
                    <Input
                      htmlAttrs={{
                        id: 'companyLogo',
                        name: 'companyLogo',
                        type: 'file',
                        accept: '.JPEG,.JPG,.PNG',
                      }}
                      value=""
                      onChange={e => uploadFile(e, setFieldValue)}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
              )}

              <Stepper.Footer
                disableNextButton={!isValid}
                onNextButtonClick={handleSubmit}
                currentStep={2}
                showNextButton
              />
            </form>
          );
        }}
      </Formik>

      <style jsx>
        {`
          .logo {
            border-radius: 5px;
            height: 250px;
            max-width: 100%;
            overflow: hidden;
            width: 250px;
          }

          .logo__img-uploaded {
            border-radius: 5px;
            overflow: hidden;
            object-fit: contain;
            min-height: 100px;
            max-height: 250px;
            max-width: 250px;
          }

          .logo__delete-icon {
            background-color: #eee;
            border-radius: 100%;
            cursor: pointer;
            padding: 0px;
            position: absolute;
            right: 5px;
            top: 5px;
          }
        `}
      </style>
    </Fragment>
  );
};

export default CompanyName;
