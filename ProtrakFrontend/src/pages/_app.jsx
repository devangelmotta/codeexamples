import '../styles.css';

import PropTypes from 'prop-types';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import { Page } from '~/components/layout';
import { updateUserId } from '~/utils/constants';
import GraphQLClient from '~/graphql';

class CustomApp extends App {
  state = { error: null };

  componentDidMount() {
    updateUserId(window.localStorage.getItem('user_id'));
  }

  componentDidCatch(error, info) {
    console.group('componentDidCatch');
    console.error(error);
    console.error(info);
    console.groupEnd('componentDidCatch');

    this.setState({ error });
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Page>
        <ApolloProvider client={GraphQLClient}>
          <Component
            {...pageProps} // eslint-disable-line react/jsx-props-no-spreading
          />
        </ApolloProvider>
      </Page>
    );
  }
}

CustomApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({}).isRequired, // TODO: Fill this shape
};

export default CustomApp;
