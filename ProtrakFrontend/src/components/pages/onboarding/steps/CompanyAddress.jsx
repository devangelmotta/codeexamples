import { Fragment, useCallback, useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';

import { QUERY_COUNTRIES } from '~/graphql/queries/country';
import { QUERY_STATES_BY_COUNTRY } from '~/graphql/queries/state';
import { QUERY_CITIES_BY_STATES } from '~/graphql/queries/city';
import { MUTATION_CREATE_COMPANY_ADDRESS } from '~/graphql/mutations/company';

import { Input, Separator, Select } from '~/components/primitive';
import { Loader } from '~/components/pages/_shared';

import Stepper from '../components/Stepper';
import { useOnboardingContext } from '../context';
import { companyAddressFormValidation } from '../formConfig';

const CompanyAddress = () => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const {
    updateCreateCompanyForm,
    formData,
    steps,
    setCurrentStep,
  } = useOnboardingContext();

  const {
    data: dataCountries,
    loading: loadingCountries,
    error: errorCountries,
  } = useQuery(QUERY_COUNTRIES);
  const [
    getStates,
    { data: dataStates, loading: loadingStates, error: errorStates },
  ] = useLazyQuery(QUERY_STATES_BY_COUNTRY);
  const [
    getCities,
    { data: dataCities, loading: loadingCities, error: errorCities },
  ] = useLazyQuery(QUERY_CITIES_BY_STATES);
  const [createCompanyAddress, { loading: loadingCreateCompanyAddress }] = useMutation(
    MUTATION_CREATE_COMPANY_ADDRESS,
  );

  useEffect(() => {
    if (dataCountries === undefined) return;

    if (!loadingCountries && errorCountries) {
      alert('Error'); // TODO: Implement a Toast component
      console.trace(errorCountries);
      return;
    }

    setCountryOptions(
      dataCountries.countries.map(country => {
        return { label: country.name, value: country.id };
      }),
    );
  }, [dataCountries]);

  useEffect(() => {
    if (dataStates === undefined) return;

    if (!loadingStates && errorStates) {
      alert('Error'); // TODO: Implement a Toast component
      console.trace(errorStates);
      return;
    }

    setStateOptions(
      dataStates.states.map(state => {
        return { label: state.name, value: state.id };
      }),
    );
  }, [dataStates]);

  useEffect(() => {
    if (dataCities === undefined) return;

    if (!loadingCities && errorCities) {
      alert('Error'); // TODO: Implement a Toast component
      console.trace(errorCities);
      return;
    }

    setCityOptions(
      dataCities.cities.map(state => {
        return { label: state.name, value: state.id };
      }),
    );
  }, [dataCities]);

  const handleSubmitClick = useCallback(async values => {
    try {
      await createCompanyAddress({
        variables: {
          addressOne: values.address,
          addressTwo: values.address2,
          countryId: values.country,
          stateId: values.state,
          cityId: values.city,
          postalCode: values.postalCode,
          companyId: formData.company.id,
        },
      });

      updateCreateCompanyForm(values);
      setCurrentStep(steps.CREATE_COMPANY_SUCCESS);
    } catch (e) {
      alert('Error'); // TODO: handleError
      console.trace(e);
    }
  }, []);

  const handleLocationSelectChange = useCallback((setFieldValue, name, value) => {
    setFieldValue(name, value);

    switch (name) {
      case 'country':
        setFieldValue('state', '');
        setFieldValue('city', '');
        fetchStatesFromCountry(value);
        break;

      case 'state':
        setFieldValue('city', '');
        fetchCitiesFromCountry(value);
        break;

      default:
        break;
    }
  }, []);

  const fetchStatesFromCountry = useCallback(async countryId => {
    getStates({
      variables: {
        countryId,
      },
    });
  }, []);

  const fetchCitiesFromCountry = useCallback(async stateId => {
    getCities({
      variables: {
        stateId,
      },
    });
  }, []);

  return (
    <Fragment>
      <Loader isLoading={loadingCreateCompanyAddress} />
      <Stepper.Title>What is your company&apos;s address?</Stepper.Title>
      <Formik
        validate={companyAddressFormValidation}
        initialValues={{
          address: '',
          address2: '',
          postalCode: '',
          city: '',
          state: '',
          country: '',
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
                  placeholder: 'Address Line 1',
                  name: 'address',
                  type: 'text',
                }}
                value={values.address}
                error={touched.address ? errors.address : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={3} />

              <Input
                htmlAttrs={{
                  placeholder: 'Address Line 2',
                  name: 'address2',
                  type: 'text',
                }}
                value={values.address2}
                error={touched.address2 ? errors.address2 : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                showErrorMessage
              />
              <Separator size={3} />

              <div className="flex flex-wrap">
                <div className="w-full md:flex-1">
                  <Select
                    disabled={loadingCountries}
                    name="country"
                    options={countryOptions}
                    value={values.country}
                    placeholder="Country"
                    error={touched.country ? errors.country : ''}
                    onChange={e =>
                      handleLocationSelectChange(setFieldValue, 'country', e.target.value)
                    }
                    onBlur={handleBlur}
                  />
                </div>
                <Separator responsive={[1, 3]} />
                <div className="w-full md:flex-1">
                  <Select
                    disabled={!values.country || loadingStates}
                    name="state"
                    options={stateOptions}
                    value={values.state}
                    placeholder="State"
                    error={touched.state ? errors.state : ''}
                    onChange={e =>
                      handleLocationSelectChange(setFieldValue, 'state', e.target.value)
                    }
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <Separator size={3} />

              <div className="flex flex-wrap">
                <div className="w-full md:flex-1">
                  <Select
                    disabled={!values.state || loadingCities}
                    name="city"
                    options={cityOptions}
                    placeholder="City"
                    value={values.city}
                    error={touched.city ? errors.city : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <Separator responsive={[1, 3]} />
                <div className="w-full md:flex-1">
                  <Input
                    htmlAttrs={{
                      placeholder: 'Postal Code',
                      name: 'postalCode',
                      type: 'text',
                    }}
                    value={values.postalCode}
                    error={touched.postalCode ? errors.postalCode : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    showErrorMessage
                  />
                </div>
              </div>

              <Stepper.Footer
                disableNextButton={!isValid}
                currentStep={3}
                onNextButtonClick={handleSubmit}
                onSkipButtonClick={() => {
                  setCurrentStep(steps.CREATE_COMPANY_SUCCESS);
                }}
                showNextButton
                showSkipButton
              />
            </form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default CompanyAddress;
