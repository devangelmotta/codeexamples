import { Fragment, useCallback } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import dayjs from 'dayjs';

import { Input, Separator } from '~/components/primitive';
import { Loader } from '~/components/pages/_shared';
import { defaultDateToInput, dateWithoutTime } from '~/utils/dates';
import { MUTATION_CREATE_PROJECT } from '~/graphql/mutations/project';

import Stepper from '../components/Stepper';
import { useOnboardingContext } from '../context';
import { projectFormValidation } from '../formConfig';

const CreateProject = () => {
  const {
    updateCreateProjectForm,
    steps,
    setCurrentStep,
    formData,
  } = useOnboardingContext();

  const [createProject, { loading }] = useMutation(MUTATION_CREATE_PROJECT);

  const handleSubmitClick = useCallback(async values => {
    try {
      const {
        data: { createOneProject: projectCreated },
      } = await createProject({
        variables: {
          name: values.name,
          companyId: formData.company.id,
          amount: values.budget,
          projectBudgetStatus: 'PENDING',
          projectTimelineStatus:
            new Date(values.startDate) > dateWithoutTime() ? 'IN_PROGRESS' : 'APPROVED',
          startDate: new Date(values.startDate),
          endDate: new Date(values.endDate),
          notes: values.notes,
        },
      });

      updateCreateProjectForm({
        ...values,
        ...projectCreated,
      });
      setCurrentStep(steps.CREATE_CLIENT);
    } catch (e) {
      alert('Error'); // TODO: handleError
      console.trace(e);
    }
  }, []);

  return (
    <Fragment>
      <Loader isLoading={loading} />
      <Stepper.Title icon="project-dark">Create a Project</Stepper.Title>
      <Formik
        validate={projectFormValidation}
        initialValues={{
          name: '',
          budget: '',
          startDate: defaultDateToInput(),
          endDate: defaultDateToInput(dayjs().add(1, 'day')),
          notes: '',
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
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Input
                htmlAttrs={{
                  placeholder: 'Enter the project address or name',
                  name: 'name',
                  type: 'text',
                }}
                value={values.name}
                error={touched.name ? errors.name : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={3} />

              <Input
                icon={<img src="/static/images/icons/money-dark.svg" alt="money icon" />}
                htmlAttrs={{
                  placeholder: 'Project Budget',
                  name: 'budget',
                  type: 'number',
                }}
                value={values.budget}
                label="Project Budget"
                error={touched.budget ? errors.budget : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={3} />

              <div className="flex flex-wrap">
                <div className="w-full md:flex-1">
                  <Input
                    icon={
                      <img
                        src="/static/images/icons/calendar-dark.svg"
                        alt="Calendar icon"
                      />
                    }
                    label="Start Date"
                    htmlAttrs={{ type: 'date', name: 'startDate' }}
                    value={values.startDate}
                    error={touched.startDate ? errors.startDate : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showErrorMessage
                  />
                </div>
                <Separator responsive={[1, 3]} />
                <div className="w-full md:flex-1">
                  <Input
                    icon={
                      <img
                        src="/static/images/icons/calendar-dark.svg"
                        alt="Calendar icon"
                      />
                    }
                    label="End Date"
                    htmlAttrs={{ type: 'date', name: 'endDate' }}
                    value={values.endDate}
                    error={touched.endDate ? errors.endDate : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showErrorMessage
                  />
                </div>
              </div>
              <Separator size={3} />

              <Input
                variant="pt-input--textarea"
                htmlAttrs={{
                  placeholder: 'Notes',
                  name: 'notes',
                  type: 'text',
                }}
                value={values.notes}
                error={touched.notes ? errors.notes : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />

              <Stepper.Footer
                currentStep={1}
                totalSteps={2}
                disableNextButton={!isValid}
                onNextButtonClick={handleSubmit}
                showNextButton
              />
            </form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default CreateProject;
