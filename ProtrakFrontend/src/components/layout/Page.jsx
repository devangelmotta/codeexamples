import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Page = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <title>Protrak</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Public+Sans:100,300,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </Fragment>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

Page.defaultProps = {};

export default Page;
