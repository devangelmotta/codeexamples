import { useCallback, useState, Fragment } from 'react';
import { Formik } from 'formik';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { Button, Checkbox, Input, Separator, Modal } from '~/components/primitive';
import { SimpleLayout } from '~/components/layout';
import {
  GoogleButton,
  signUpFormValidation,
  signUp,
} from '~/components/pages/authentication';

import { Routes } from '~/utils/constants';
import { useSwitchOptions } from '~/hooks';

const SignUp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    options: pageUIOptions,
    selectedOption: pageUISelectedOption,
    setSelectedOption: setPageUISelectedOption,
  } = useSwitchOptions(['form', 'email confirmation']);
  const {
    options: modalOptions,
    selectedOption: modalSelectedOption,
    setSelectedOption: modalSetSelectedOption,
  } = useSwitchOptions(['terms', 'privacy']);

  const handleSubmitClick = useCallback(async (values, { setSubmitting, resetForm }) => {
    try {
      await signUp(values);
      resetForm();
      setSubmitting(false);
      setPageUISelectedOption(pageUIOptions.EMAIL_CONFIRMATION);
    } catch (e) {
      console.log(e);
      alert('Error'); // TODO: Implement a Toast component
    }
  }, []);

  return (
    <SimpleLayout>
      {pageUISelectedOption === pageUIOptions.FORM && (
        <Fragment>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              repeatPassword: '',
              acceptTerms: false,
            }}
            validate={signUpFormValidation}
            onSubmit={handleSubmitClick}
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
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Input
                    icon={<img src="/static/images/icons/user.svg" alt="User icon" />}
                    htmlAttrs={{
                      placeholder: 'First name',
                      type: 'text',
                      name: 'firstName',
                    }}
                    value={values.firstName}
                    error={touched.firstName ? errors.firstName : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showErrorMessage
                  />
                  <Separator size={3} />

                  <Input
                    icon={<img src="/static/images/icons/user.svg" alt="User icon" />}
                    htmlAttrs={{
                      placeholder: 'Last name',
                      type: 'text',
                      name: 'lastName',
                    }}
                    value={values.lastName}
                    error={touched.lastName ? errors.lastName : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showErrorMessage
                  />
                  <Separator size={3} />

                  <Input
                    icon={<img src="/static/images/icons/email.svg" alt="Email icon" />}
                    htmlAttrs={{ placeholder: 'E-mail', type: 'email', name: 'email' }}
                    value={values.email}
                    error={touched.email ? errors.email : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showErrorMessage
                  />
                  <Separator size={3} />

                  <Input
                    variant="pt-input--password"
                    htmlAttrs={{
                      placeholder: 'Password',
                      type: 'password',
                      name: 'password',
                      autoComplete: 'username',
                    }}
                    value={values.password}
                    error={touched.password ? errors.password : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showErrorMessage
                  />
                  <Separator size={3} />

                  <Input
                    variant="pt-input--password"
                    htmlAttrs={{
                      placeholder: 'Confirm Password',
                      type: 'password',
                      name: 'repeatPassword',
                      autoComplete: 'username',
                    }}
                    value={values.repeatPassword}
                    error={touched.repeatPassword ? errors.repeatPassword : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showErrorMessage
                  />
                  <Separator size={3} />

                  <Checkbox
                    name="acceptTerms"
                    text={
                      <div>
                        <span>Creating an account means you’re okay with our </span>
                        <strong
                          className="font-bold underline"
                          onClick={event => {
                            event.preventDefault();
                            modalSetSelectedOption(modalOptions.TERMS);
                            setIsModalVisible(true);
                          }}
                        >
                          Terms of Service
                        </strong>
                        <span> and </span>
                        <strong
                          className="font-bold underline"
                          onClick={event => {
                            event.preventDefault();
                            modalSetSelectedOption(modalOptions.PRIVACY);
                            setIsModalVisible(true);
                          }}
                        >
                          Privacy Policy
                        </strong>
                      </div>
                    }
                    error={touched.acceptTerms ? !values.acceptTerms : false}
                    variant="pt-checkbox--gray"
                    checked={values.acceptTerms}
                    onChange={handleChange}
                  />
                  <Separator size={3} />

                  <div className="flex flex-wrap flex-row space-between">
                    <div className="w-full md:flex-1">
                      <Button
                        variant="pt-button--yellow"
                        className="w-full"
                        isLoading={isSubmitting}
                        disabled={!isValid}
                        type="submit"
                      >
                        Create account
                      </Button>
                    </div>
                    <Separator responsive={[2, 2]} />
                    <div className="w-full md:flex-1">
                      <GoogleButton
                        className="w-full"
                        disabled={isSubmitting}
                        isSignIn={false}
                        onClick={() => {
                          alert('Sign in with Google!');
                        }}
                      />
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
          <Separator color="gray" size={3} />

          <div className="text-center mt-8">
            <span>Already a member? </span>
            <Link href={Routes.SIGN_IN}>
              <a className="underline text-gray-900 mx-auto font-bold">Sign in</a>
            </Link>
          </div>

          <Modal
            visible={isModalVisible}
            onCloseHandler={setIsModalVisible}
            showCloseButton
          >
            {modalSelectedOption === modalOptions.TERMS && (
              <SignUpModalContent
                title="Terms of service"
                modificationDate="May 22, 2019"
                content={
                  <div>
                    <h3 className="text-gray-pt-300 text-2xl font-medium">a. Title 1</h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec
                    pretium vulputate sapien nec sagittis aliquam malesuada. Magna ac
                    placerat vestibulum lectus mauris ultrices. Sit amet commodo nulla
                    facilisi nullam vehicula ipsum a arcu. Volutpat sed cras ornare arcu
                    dui vivamus arcu felis. In iaculis nunc sed augue lacus viverra.
                    Cursus turpis massa tincidunt dui. Tellus rutrum tellus pellentesque
                    eu tincidunt. Velit ut tortor pretium viverra suspendisse potenti
                    nullam. Faucibus scelerisque eleifend donec pretium. Amet mauris
                    commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Dapibus
                    ultrices in iaculis nunc sed augue lacus viverra vitae. Eros in cursus
                    turpis massa tincidunt dui ut ornare. Purus gravida quis blandit
                    turpis cursus in. Id volutpat lacus laoreet non curabitur gravida.
                    Ullamcorper malesuada proin libero nunc consequat interdum. Enim
                    facilisis gravida neque convallis a cras semper. Eu facilisis sed odio
                    morbi quis commodo odio aenean. Pharetra vel turpis nunc eget lorem
                    dolor sed viverra ipsum. Donec massa sapien faucibus et molestie ac
                    feugiat sed. Nisi scelerisque eu ultrices vitae auctor eu augue ut.
                    Interdum varius sit amet mattis vulputate enim nulla aliquet
                    porttitor. Fermentum posuere urna nec tincidunt praesent semper
                    feugiat nibh sed. Scelerisque mauris pellentesque pulvinar
                    pellentesque habitant morbi tristique senectus et. Leo in vitae turpis
                    massa sed elementum tempus egestas. Aenean euismod elementum nisi
                    quis. Odio euismod lacinia at quis risus sed vulputate odio. Nisi
                    lacus sed viverra tellus in hac habitasse platea dictumst. In
                    fermentum et sollicitudin ac. Elit at imperdiet dui accumsan sit. Duis
                    at consectetur lorem donec massa sapien. Sed pulvinar proin gravida
                    hendrerit lectus a. Fringilla est ullamcorper eget nulla facilisi
                    etiam dignissim. Sed elementum tempus egestas sed sed risus pretium
                    quam vulputate. Et netus et malesuada fames ac turpis egestas. Diam
                    donec adipiscing tristique risus nec feugiat in. Convallis aenean et
                    tortor at risus viverra adipiscing at. Orci eu lobortis elementum nibh
                    tellus. Vitae suscipit tellus mauris a diam maecenas sed. Nunc mi
                    ipsum faucibus vitae. In cursus turpis massa tincidunt dui ut ornare
                    lectus sit. Cursus risus at ultrices mi tempus. Faucibus a
                    pellentesque sit amet porttitor. Massa sed elementum tempus egestas
                    sed sed. Lectus magna fringilla urna porttitor rhoncus. In aliquam sem
                    fringilla ut morbi tincidunt augue. Hac habitasse platea dictumst
                    quisque sagittis. Egestas maecenas pharetra convallis posuere.
                    Porttitor rhoncus dolor purus non. Amet consectetur adipiscing elit
                    pellentesque habitant morbi tristique. Ante in nibh mauris cursus
                    mattis molestie a iaculis at. Quam quisque id diam vel quam elementum
                    pulvinar. Et netus et malesuada fames ac turpis egestas. Semper risus
                    in hendrerit gravida. Ultricies lacus sed turpis tincidunt id aliquet
                    risus feugiat in. Sed nisi lacus sed viverra tellus in. Pretium nibh
                    ipsum consequat nisl vel pretium lectus. Non arcu risus quis varius
                    quam quisque id. Nunc aliquet bibendum enim facilisis gravida neque
                    convallis a cras. In fermentum posuere urna nec tincidunt. Diam donec
                    adipiscing tristique risus nec feugiat in. Felis donec et odio
                    pellentesque diam volutpat. Egestas fringilla phasellus faucibus
                    scelerisque eleifend donec. Porttitor rhoncus dolor purus non enim
                    praesent elementum. Nunc sed id semper risus in hendrerit gravida
                    rutrum. Enim nulla aliquet porttitor lacus luctus accumsan. Placerat
                    duis ultricies lacus sed turpis tincidunt id aliquet. Risus viverra
                    adipiscing at in. Aliquet nec ullamcorper sit amet risus. Pretium nibh
                    ipsum consequat nisl vel pretium. Vitae congue eu consequat ac felis
                    donec et odio pellentesque. Mattis nunc sed blandit libero volutpat
                    sed cras ornare. Tellus in hac habitasse platea dictumst vestibulum.
                  </div>
                }
                pdfLink="/api/auth/terms-and-privacy?file=terms"
              />
            )}
            {modalSelectedOption === modalOptions.PRIVACY && (
              <SignUpModalContent
                title="Privacy"
                modificationDate="May 22, 2019"
                content={
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec
                    pretium vulputate sapien nec sagittis aliquam malesuada. Magna ac
                    placerat vestibulum lectus mauris ultrices. Sit amet commodo nulla
                    facilisi nullam vehicula ipsum a arcu. Volutpat sed cras ornare arcu
                    dui vivamus arcu felis. In iaculis nunc sed augue lacus viverra.
                    Cursus turpis massa tincidunt dui. Tellus rutrum tellus pellentesque
                    eu tincidunt. Velit ut tortor pretium viverra suspendisse potenti
                    nullam. Faucibus scelerisque eleifend donec pretium. Amet mauris
                    commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Dapibus
                    ultrices in iaculis nunc sed augue lacus viverra vitae. Eros in cursus
                    turpis massa tincidunt dui ut ornare. Purus gravida quis blandit
                    turpis cursus in. Id volutpat lacus laoreet non curabitur gravida.
                    Ullamcorper malesuada proin libero nunc consequat interdum. Enim
                    facilisis gravida neque convallis a cras semper. Eu facilisis sed odio
                    morbi quis commodo odio aenean. Pharetra vel turpis nunc eget lorem
                    dolor sed viverra ipsum. Donec massa sapien faucibus et molestie ac
                    feugiat sed. Nisi scelerisque eu ultrices vitae auctor eu augue ut.
                    Interdum varius sit amet mattis vulputate enim nulla aliquet
                    porttitor. Fermentum posuere urna nec tincidunt praesent semper
                    feugiat nibh sed. Scelerisque mauris pellentesque pulvinar
                    pellentesque habitant morbi tristique senectus et. Leo in vitae turpis
                    massa sed elementum tempus egestas. Aenean euismod elementum nisi
                    quis. Odio euismod lacinia at quis risus sed vulputate odio. Nisi
                    lacus sed viverra tellus in hac habitasse platea dictumst. In
                    fermentum et sollicitudin ac. Elit at imperdiet dui accumsan sit. Duis
                    at consectetur lorem donec massa sapien. Sed pulvinar proin gravida
                    hendrerit lectus a. Fringilla est ullamcorper eget nulla facilisi
                    etiam dignissim. Sed elementum tempus egestas sed sed risus pretium
                    quam vulputate. Et netus et malesuada fames ac turpis egestas. Diam
                    donec adipiscing tristique risus nec feugiat in. Convallis aenean et
                    tortor at risus viverra adipiscing at. Orci eu lobortis elementum nibh
                    tellus. Vitae suscipit tellus mauris a diam maecenas sed. Nunc mi
                    ipsum faucibus vitae. In cursus turpis massa tincidunt dui ut ornare
                    lectus sit. Cursus risus at ultrices mi tempus. Faucibus a
                    pellentesque sit amet porttitor. Massa sed elementum tempus egestas
                    sed sed. Lectus magna fringilla urna porttitor rhoncus. In aliquam sem
                    fringilla ut morbi tincidunt augue. Hac habitasse platea dictumst
                    quisque sagittis. Egestas maecenas pharetra convallis posuere.
                    Porttitor rhoncus dolor purus non. Amet consectetur adipiscing elit
                    pellentesque habitant morbi tristique. Ante in nibh mauris cursus
                    mattis molestie a iaculis at. Quam quisque id diam vel quam elementum
                    pulvinar. Et netus et malesuada fames ac turpis egestas. Semper risus
                    in hendrerit gravida. Ultricies lacus sed turpis tincidunt id aliquet
                    risus feugiat in. Sed nisi lacus sed viverra tellus in. Pretium nibh
                    ipsum consequat nisl vel pretium lectus. Non arcu risus quis varius
                    quam quisque id. Nunc aliquet bibendum enim facilisis gravida neque
                    convallis a cras. In fermentum posuere urna nec tincidunt. Diam donec
                    adipiscing tristique risus nec feugiat in. Felis donec et odio
                    pellentesque diam volutpat. Egestas fringilla phasellus faucibus
                    scelerisque eleifend donec. Porttitor rhoncus dolor purus non enim
                    praesent elementum. Nunc sed id semper risus in hendrerit gravida
                    rutrum. Enim nulla aliquet porttitor lacus luctus accumsan. Placerat
                    duis ultricies lacus sed turpis tincidunt id aliquet. Risus viverra
                    adipiscing at in. Aliquet nec ullamcorper sit amet risus. Pretium nibh
                    ipsum consequat nisl vel pretium. Vitae congue eu consequat ac felis
                    donec et odio pellentesque. Mattis nunc sed blandit libero volutpat
                    sed cras ornare. Tellus in hac habitasse platea dictumst vestibulum.
                  </p>
                }
                pdfLink="/api/auth/terms-and-privacy?file=privacy"
              />
            )}
          </Modal>
        </Fragment>
      )}

      {pageUISelectedOption === pageUIOptions.EMAIL_CONFIRMATION && (
        <div className="flex justify-center flex-col py-12">
          <img
            src="/static/images/pages/account-verified/email-illustration.svg"
            alt="Account verified"
            className="mb-10 h-32"
          />
          <p className="text-gray-pt-300 text-2xl sm:text-3xl text-center">
            Check your email to activate your account
          </p>
        </div>
      )}
    </SimpleLayout>
  );
};

// --- Components ---

const SignUpModalContent = ({ title, modificationDate, content, pdfLink }) => {
  return (
    <div className="p-8 md:p-0">
      <h3 className="text-gray-pt-300 text-3xl font-medium font-bold mb-1">{title}</h3>
      <p>Last modification: {modificationDate}</p>
      <Separator size={3} color="gray" />

      <div className="overflow-scroll h-32 sm:h-64">{content}</div>
      <Separator size={3} color="gray" />

      <div className="flex flex-wrap flex-row space-between sm:justify-end">
        <div className="w-full sm:w-1/3">
          <Button
            className="w-full"
            size="sm"
            icon={<img src="/static/images/icons/printer-white.svg" alt="Print icon" />}
            link={{
              href: pdfLink,
              target: '_blank',
              isExternalUrl: true,
            }}
          >
            Print
          </Button>
        </div>
        <Separator responsive={[1, 1, 'sm']} />
        <div className="w-full sm:w-1/3">
          <Button
            className="w-full"
            size="sm"
            icon={
              <img src="/static/images/icons/download-white.svg" alt="Download icon" />
            }
            link={{
              href: `${pdfLink}&download=true`,
              target: '_blank',
              isExternalUrl: true,
            }}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

SignUpModalContent.propTypes = {
  title: PropTypes.string.isRequired,
  modificationDate: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  pdfLink: PropTypes.string.isRequired,
};

export default SignUp;
