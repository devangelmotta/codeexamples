import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { Input, Dropdown, Button, Separator, Modal } from '~/components/primitive';
import { FormModalContent } from '~/components/pages/_shared';
import { getBase64 } from '~/utils/utils';
import { weeksBetween } from '~/utils/dates';

import ActivityBox from '../components/ActivityBox';
import publicationFormValidation from '../formConfig';

const Activity = ({ activities, project }) => {
  const [privacyOptionSelectedIndex, setPrivacyOptionSelectedIndex] = useState(0);
  const formRef = useRef();
  const { current: privacyOptions } = useRef([
    {
      value: 'public',
      label: 'Public',
      icon: <img src="/static/images/icons/word-dark.svg" alt="Word icon" />,
    },
    {
      value: 'team',
      label: 'My team',
      icon: <img src="/static/images/icons/team-dark.svg" alt="Team icon" />,
    },
    {
      value: 'private',
      label: 'Only Me',
      icon: <img src="/static/images/icons/lock.svg" alt="Lock icon" />,
    },
  ]);

  const handleSubmitClick = useCallback((values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      resetForm();
      setSubmitting(false);
      setPrivacyOptionSelectedIndex(0);
      formRef.current.setFieldValue('images', []);
    }, 1000);
  }, []);

  const uploadFile = useCallback(event => {
    const file = event.target.files[0];
    const imageValues = formRef.current.values.images;

    if (imageValues.some(item => item.name === file.name)) {
      alert('Repeated Image'); // TODO: Replace with future toast component
    } else {
      getBase64(file, result => {
        imageValues.push({
          file: URL.createObjectURL(file),
          name: file.name,
          base64: result,
        });
        formRef.current.setFieldValue('images', imageValues);
      });
    }
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          description: '',
          privacy: 'public',
          pinned: false,
          images: [],
        }}
        onSubmit={handleSubmitClick}
        validate={publicationFormValidation}
        innerRef={formRef}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid,
          touched,
          values,
          setFieldValue,
        }) => {
          return (
            <form onSubmit={handleSubmit} className="bg-gray-pt-400 p-4 rounded mb-8">
              <div className="block md:flex flex-row items-center">
                <div className="input__publish-bar w-full md:w-auto md:flex-1">
                  <Input
                    htmlAttrs={{
                      placeholder: 'Update...',
                      type: 'text',
                      name: 'description',
                    }}
                    value={values.description}
                    error={touched.description ? errors.description : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="w-full md:w-auto flex items-center justify-between md:justify-center my-4 md:my-0 p-0 md:px-6">
                  <Dropdown
                    variant="pt-dropdown--light"
                    options={privacyOptions}
                    CustomButton={
                      <div className="pt-dropdown__menu__option flex items-center border border-gray-pt-200 rounded-lg px-3 py-1">
                        {privacyOptions[privacyOptionSelectedIndex].icon}
                        <span className="text-gray-pt-200 font-semibold ml-3 mr-6 text-sm">
                          {privacyOptions[privacyOptionSelectedIndex].label}
                        </span>
                        <img
                          src="/static/images/icons/arrow-head-dark.svg"
                          alt="Arrow down icon"
                        />
                      </div>
                    }
                    onOptionClickHandler={selectedOption => {
                      setPrivacyOptionSelectedIndex(
                        privacyOptions.findIndex(item => item.value === selectedOption),
                      );
                      setFieldValue('privacy', selectedOption);
                    }}
                  />
                  <div className="hidden md:block h-6 border-l border-gray-pt-100 w-2 ml-4 mr-2" />
                  <div className="flex flex-row">
                    <img
                      src={`/static/images/icons/pin-circle-${
                        values.pinned ? 'black' : 'gray'
                      }.svg`}
                      alt="Pin Circle icon"
                      className="cursor-pointer mr-4 h-6 w-6"
                      onClick={() => {
                        setFieldValue('pinned', !values.pinned);
                      }}
                    />
                    <img
                      src="/static/images/icons/camera-gray.svg"
                      alt="Camera icon"
                      className="cursor-pointer h-6 w-6"
                      onClick={() => document.getElementById('images').click()}
                    />
                  </div>
                </div>
                <div className="hidden">
                  <Input
                    htmlAttrs={{
                      id: 'images',
                      name: 'images',
                      type: 'file',
                      accept: '.JPEG,.JPG,.PNG',
                    }}
                    value=""
                    onChange={uploadFile}
                    onBlur={handleBlur}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto"
                  size="sm"
                  isLoading={isSubmitting}
                  disabled={!isValid}
                >
                  Publish
                </Button>
              </div>

              {values.images.length > 0 && (
                <div className="w-full flex flex-wrap justify-around md:justify-start">
                  {values.images.map((image, index) => (
                    <div
                      key={`publish-images-${index}`}
                      className="publish-image w-1/3 md:w-2/12 flex flex-wrap items-center justify-center relative mx-2 mt-4"
                    >
                      <img
                        src={image.file}
                        alt="Thumbnail"
                        className="publish-image__element block"
                      />
                      <img
                        src="/static/images/icons/trash-red.svg"
                        className="publish-image__delete-icon h-6 w-6"
                        alt="Delete icon"
                        onClick={() => {
                          setFieldValue(
                            'images',
                            values.images.filter(item => item.name !== image.name),
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </form>
          );
        }}
      </Formik>

      <ActivityFeed activities={activities} project={project} />

      <style jsx>{`
        .input__publish-bar :global(.pt-input) {
          border-bottom: 0;
          border-radius: 5px;
          border: 1px solid var(--gray-pt-100);
          padding: 10px 15px;
        }

        .input__publish-bar :global(.pt-input--error) {
          border: 1px solid var(--red-pt-100);
        }

        .publish-image__element {
          border-radius: 5px;
          max-height: 135px;
          max-width: 135px;
          min-height: 100px;
          object-fit: contain;
          overflow: hidden;
        }

        .publish-image__delete-icon {
          background-color: #eee;
          border-radius: 100%;
          cursor: pointer;
          padding: 0px;
          position: absolute;
          right: 5px;
          top: 5px;
        }
      `}</style>
    </div>
  );
};

Activity.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      activity: PropTypes.string,
      author: PropTypes.shape({
        avatarUrl: PropTypes.string,
        name: PropTypes.string,
        role: PropTypes.string,
      }),
      pinned: PropTypes.bool,
      needToConfirm: PropTypes.bool,
      numberOfLikes: PropTypes.number,
      numberOfComments: PropTypes.number,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          author: PropTypes.shape({
            avatarUrl: PropTypes.string,
            name: PropTypes.string,
            role: PropTypes.string,
          }),
          message: PropTypes.string,
          numberOfLikes: PropTypes.number,
          date: PropTypes.number,
          dateUnit: PropTypes.string,
        }),
      ),
      date: PropTypes.number,
      dateUnit: PropTypes.string,
      message: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      isPrivate: PropTypes.bool,
      beforeDate: PropTypes.string,
      afterDate: PropTypes.string,
      beforeBudget: PropTypes.number,
      afterBudget: PropTypes.number,
    }),
  ).isRequired,
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    budgetUpdatedDate: PropTypes.number.isRequired,
    totalPaid: PropTypes.number.isRequired,
    pendingPayment: PropTypes.number.isRequired,
    budgetChanged: PropTypes.number.isRequired,
    createdDate: PropTypes.string.isRequired,
    daysLeft: PropTypes.number.isRequired,
    percentageProgress: PropTypes.number.isRequired,
    projectStatus: PropTypes.string.isRequired,
    details: PropTypes.object.isRequired,
  }).isRequired,
};

// --- Components ---

const ActivityFeed = ({ activities, project }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const today = new Date();
  const startDate = new Date(project.details.startDate);
  const endDate = new Date(project.details.endDate);
  const percentage = (((today - startDate) / (endDate - startDate)) * 100).toFixed(2);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-8/12 lg:pr-2 mb-10">
        {activities.map(item => {
          return (
            <ActivityBox
              key={item.id}
              activity={item.activity}
              author={item.author}
              pinned={item.pinned}
              needToConfirm={item.needToConfirm}
              message={item.message}
              numberOfLikes={item.numberOfLikes}
              numberOfComments={item.numberOfComments}
              comments={item.comments}
              date={item.date}
              dateUnit={item.dateUnit}
              isPrivate={item.isPrivate}
              beforeDate={item.beforeDate}
              afterDate={item.afterDate}
              beforeBudget={item.beforeBudget}
              afterBudget={item.afterBudget}
              images={item.images}
            />
          );
        })}
        <Separator color="gray" sizeTop={4} />
        <div className="text-center text-gray-pt-200 mt-5">
          <p className="font-bold mb-2">Proposal created</p>
          <p className="text-sm">{project.createdDate}</p>
        </div>
      </div>
      <div className="w-full lg:w-4/12">
        <div className="timeline rounded-md bg-gray-pt-400 p-3">
          <div className="text-center">
            <p className="text-6xl text-gray-pt-300 leading-none mb-2">
              <strong>{weeksBetween(startDate, new Date())}</strong> Weeks
            </p>
            <p className="text-xl">Available time</p>
          </div>
          <Separator color="gray" size={3} />

          <div className="flex items-center">
            <div className="timeline__dot w-3 h-3 bg-green-pt-100 mr-2" />
            <p>
              <strong className="mr-1">Start Date:</strong>
              {project.details.startDate}
            </p>
          </div>
          <Separator size={1} />
          <div className="flex items-center">
            <div className="timeline__dot w-3 h-3 bg-red-pt-100 mr-2" />
            <p>
              <strong className="mr-1">Deadline:</strong>
              {project.details.endDate}
            </p>
          </div>
          <Separator color="gray" size={3} />

          <p className="text-xs font-bold mb-10">Timeline</p>
          <div className="relative flex items-center mb-6">
            <div className="timeline__dot w-3 h-3 bg-green-pt-100 absolute left-0 z-10" />
            <div className="timeline__dot timeline__dot--curent-date w-3 h-3 bg-blue-pt-100 absolute left-0 z-10" />
            <div className="timeline__line--remaining-time absolute z-0" />
            <div className="timeline__dot w-3 h-3 bg-red-pt-100 absolute right-0 z-10" />
            <div className="timeline__line--past-time absolute z-0" />
          </div>
          <div className="text-center sm:text-right">
            <Button
              onClick={() => {
                setIsModalVisible(true);
              }}
              className="w-full max-w-xs"
              size="sm"
            >
              Edit Timeline
            </Button>
          </div>
        </div>

        <Modal
          visible={isModalVisible}
          onCloseHandler={setIsModalVisible}
          showCloseButton
        >
          <h3 className="font-bold">Select New Date</h3>
          <Separator size={2} />

          {/* TODO: Replace with future DatePicker component */}
          <div className="h-24 border flex items-center justify-center">Datepicker</div>
          <Separator size={3} />

          <h3 className="font-bold">Details</h3>
          <Separator size={1} />

          <p className="text-justify text-gray-pt-200 border-b-2 border-gray-pt-100 pb-6">
            {project.details.info}
          </p>

          <FormModalContent.Footer
            isLoading={false}
            isValid={false}
            mainActionText="Update"
            onMainActionHandler={() => {
              setIsModalVisible(false);
            }}
            onCancelHandler={() => {
              setIsModalVisible(false);
            }}
          />
        </Modal>
      </div>

      <style jsx>{`
        .timeline__dot {
          border-radius: 50%;
        }
      `}</style>

      <style jsx>
        {`
          .timeline__dot--curent-date {
            left: ${percentage}%;
          }

          .timeline__line--past-time {
            border-top: 3px solid var(--gray-pt-100);
            right: 0;
            width: ${100 - percentage}%;
          }

          .timeline__line--remaining-time {
            border-top: 3px solid var(--blue-pt-100);
            left: 5px;
            width: ${percentage}%;
          }
        `}
      </style>
    </div>
  );
};

ActivityFeed.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      activity: PropTypes.string,
      author: PropTypes.shape({
        avatarUrl: PropTypes.string,
        name: PropTypes.string,
        role: PropTypes.string,
      }),
      pinned: PropTypes.bool,
      needToConfirm: PropTypes.bool,
      numberOfLikes: PropTypes.number,
      numberOfComments: PropTypes.number,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          author: PropTypes.shape({
            avatarUrl: PropTypes.string,
            name: PropTypes.string,
            role: PropTypes.string,
          }),
          message: PropTypes.string,
          numberOfLikes: PropTypes.number,
          date: PropTypes.number,
          dateUnit: PropTypes.string,
        }),
      ),
      date: PropTypes.number,
      dateUnit: PropTypes.string,
      message: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      isPrivate: PropTypes.bool,
      beforeDate: PropTypes.string,
      afterDate: PropTypes.string,
      beforeBudget: PropTypes.number,
      afterBudget: PropTypes.number,
    }),
  ),
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    budgetUpdatedDate: PropTypes.number.isRequired,
    totalPaid: PropTypes.number.isRequired,
    pendingPayment: PropTypes.number.isRequired,
    budgetChanged: PropTypes.number.isRequired,
    createdDate: PropTypes.string.isRequired,
    daysLeft: PropTypes.number.isRequired,
    percentageProgress: PropTypes.number.isRequired,
    projectStatus: PropTypes.string.isRequired,
    details: PropTypes.object.isRequired,
  }).isRequired,
};

ActivityFeed.defaultProps = {
  activities: [],
};

export default Activity;
