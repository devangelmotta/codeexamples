import { useRef } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { Modal, Select, Input, Separator, Button } from '~/components/primitive';

import teamFormValidation from '../formConfig';

const AddMemberModal = ({ visible, toggleModalHandler }) => {
  const { current: roleOptions } = useRef([
    {
      label: 'Owner',
      value: 'owner',
      data: { description: 'Control the whole company' },
    },
    {
      label: 'Admin',
      value: 'admin',
      data: { description: 'Access to create projects' },
    },
    {
      label: 'Team member',
      value: 'member',
      data: { description: 'Access to manage projects' },
    },
  ]);

  return (
    <Modal visible={visible} onCloseHandler={toggleModalHandler}>
      <Formik
        validate={teamFormValidation}
        initialValues={{
          fullname: '',
          email: '',
          roleType: '',
        }}
        onSubmit={values => console.log(values)}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
          setFieldValue,
          isSubmitting,
          isValid,
        }) => {
          return (
            <form className="form-container py-12 sm:py-6" onSubmit={handleSubmit}>
              <Input
                icon={<img src="/static/images/icons/user-dark.svg" alt="User icon" />}
                htmlAttrs={{
                  placeholder: 'Full Name',
                  name: 'fullname',
                  type: 'text',
                }}
                value={values.fullname}
                error={touched.fullname ? errors.fullname : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={3} />

              <Input
                icon={<img src="/static/images/icons/mail-dark.svg" alt="Email icon" />}
                htmlAttrs={{
                  placeholder: 'Email',
                  name: 'email',
                  type: 'email',
                }}
                value={values.email}
                error={touched.email ? errors.email : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={3} />

              <Select
                variant="pt-select--custom"
                options={roleOptions}
                placeholder="Select Role"
                name="roleType"
                icon="team-dark"
                value={values.roleType}
                error={touched.roleType ? errors.roleType : ''}
                CustomOption={CustomOptionRoleTypeDropdown}
                orientation="up"
                onChange={value => {
                  setFieldValue('roleType', value);
                }}
                showErrorMessage
              />
              <Separator size={3} />

              <Button
                size="md"
                className="w-full"
                isLoading={isSubmitting}
                isValid={isValid}
                onClick={handleSubmit}
              >
                Send invite
              </Button>

              <style jsx>
                {`
                  .form-container {
                    width: auto;
                  }

                  /* No mobile */
                  @media only screen and (min-width: 640px) {
                    .form-container {
                      width: 500px;
                    }
                  }
                `}
              </style>
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
};

AddMemberModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleModalHandler: PropTypes.func.isRequired,
};

// --- Components ---

const CustomOptionRoleTypeDropdown = ({ label, data, onClick }) => {
  return (
    <div
      className="item flex flex-row items-center flex-wrap py-3 px-6"
      onClick={onClick}
    >
      <p className="w-full sm:w-auto text-left font-thin">{label}</p>
      <p className="hidden sm:block sm:flex-1 font-thin text-right text-xs">
        {data.description}
      </p>

      <style jsx>{`
        .item {
          background-color: var(--gray-pt-400);
          color: var(--gray-pt-200);
          cursor: pointer;
        }

        .item:hover {
          background-color: var(--gray-pt-100);
        }
      `}</style>
    </div>
  );
};

CustomOptionRoleTypeDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.shape({ description: PropTypes.string.isRequired }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AddMemberModal;
