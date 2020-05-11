/*
 * Layout for Dashboard pages
 */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classnames from 'classnames';

import Header from './Header';

const MainLayout = ({ children, pathname }) => {
  const options = [
    { name: 'dashboard', icon: 'dashboard-white' },
    { name: 'clients', icon: 'clients-white' },
    { name: 'projects', icon: 'project-white' },
    { name: 'proposals', icon: 'folder-white' },
    { name: 'suppliers', icon: 'suppliers-white' },
    { name: 'invoices', icon: 'invoice-white' },
    { name: 'team', icon: 'team-white' },
  ];

  return (
    <main className="h-screen">
      <Header />
      <section className="body">
        <aside className="body__aside block lg:inline-block w-full lg:w-1/5">
          <ul className="w-full h-full">
            {options.map(item => {
              return (
                <MenuItem
                  key={item.name}
                  href={`/${item.name}`}
                  pathname={pathname}
                  name={item.name}
                  icon={item.icon}
                  text={item.name.toUpperCase()}
                  isActive={pathname === item.name}
                />
              );
            })}
          </ul>

          <div className="hidden lg:block text-sm p-2 absolute bottom-0">
            <p className="font-medium text-gray-pt-100">Protrak © 2020</p>
          </div>
        </aside>

        <section className="body__content block lg:inline-block w-full lg:w-4/5">
          <div className="block lg:flex lg:flex-col max-w-screen-lg mx-auto">
            {children}
          </div>
        </section>

        <style jsx>{`
          :global(body) {
            overflow: hidden;
          }

          .body {
            height: calc(100% - var(--header-height));
            overflow: auto;
          }

          .body__aside {
            background-color: var(--blue-pt-100);
            bottom: 0;
            float: none;
            left: 0;
            position: absolute;
            right: 0;
            z-index: 500;
          }

          .body__content {
            float: none;
            padding: 20px 20px 165px;
          }

          /* Large devices [lg] */
          @media (min-width: 1024px) {
            .body {
              overflow: unset;
            }

            .body__aside {
              bottom: unset;
              float: left;
              height: 100%;
              left: unset;
              position: relative;
              right: unset;
            }

            .body__content {
              float: right;
              height: 100%;
              overflow: auto;
              padding: 20px;
            }
          }
        `}</style>
      </section>
    </main>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
};

MainLayout.defaultProps = {};

// --- Components ---

const MenuItem = ({ href, name, icon, text, isActive }) => {
  return (
    <li
      className={classnames(
        'menu-item inline-block lg:block w-1/5 lg:w-full',
        isActive && 'menu-item--active',
      )}
    >
      <Link href={href}>
        <a className="flex items-center py-6 px-1 lg:px-6">
          <img
            src={`/static/images/icons/${icon}.svg`}
            alt={`${name} icon`}
            className="mx-auto lg:mx-0"
          />
          <span className="hidden lg:inline-block font-bold text-sm lg:ml-3">{text}</span>
        </a>
      </Link>

      <style jsx>{`
        span {
          color: var(--gray-pt-400);
        }

        .menu-item:first-child,
        .menu-item:last-child {
          display: none;
        }

        /* Large devices [lg] */
        @media (min-width: 1024px) {
          .menu-item:first-child,
          .menu-item:last-child {
            display: block;
          }

          .menu-item:last-child {
            border-top: 1px solid var(--gray-pt-400);
            border-bottom: 1px solid var(--gray-pt-400);
          }

          .menu-item--active,
          .menu-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </li>
  );
};

MenuItem.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default MainLayout;
