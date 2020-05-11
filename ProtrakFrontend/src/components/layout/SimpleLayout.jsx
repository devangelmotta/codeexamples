/*
 * Layout for Login, reset password and create project pages
 */

import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

const SimpleLayout = ({ children, withHeader }) => {
  return (
    <main className="root h-full overflow-auto">
      {withHeader && <Header variant="pt-header--simple" />}

      <section className="flex flex-col px-4 py-8 justify-center items-center">
        {withHeader === false && (
          <img src="/static/images/logo/logo.svg" alt="Logo" className="logo mb-12" />
        )}
        <section className="content rounded-lg shadow-lg bg-white p-5 md:p-12 relative">
          {children}
        </section>
      </section>

      <Footer />

      <style jsx>{`
        .root {
          background: var(--yellow-gradient);
        }

        .logo {
          height: 86px;
          width: 86px;
        }

        .content {
          max-width: 100%;
          width: 673px;
        }
      `}</style>
    </main>
  );
};

SimpleLayout.propTypes = {
  children: PropTypes.node.isRequired,
  withHeader: PropTypes.bool,
};

SimpleLayout.defaultProps = {
  withHeader: false,
};

export default SimpleLayout;
