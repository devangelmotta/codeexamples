import React, { Fragment, useRef } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Dropdown, Button, Modal } from '~/components/primitive';
import {
  ClientModalContent,
  NewProjectModalContent,
  ProposalToClientModalContent,
  ProposalToSupplierModalContent,
} from '~/components/pages/_shared';

import { Routes } from '~/utils/constants';
import { useSwitchOptions, useModal } from '~/hooks';

const Header = ({ variant }) => {
  const { isModalVisible, setIsModalVisible, onCloseModalHandler } = useModal();
  const {
    options: modalOptions,
    selectedOption: modalSelectedOption,
    setSelectedOption: setModalSelectedOption,
  } = useSwitchOptions(['client', 'project', 'proposal', 'supplier', 'invoice']);
  const { current: createDropdownOptions } = useRef([
    {
      value: modalOptions.CLIENT,
      label: 'Client',
      icon: <img src="/static/images/icons/user-white.svg" alt="user icon" />,
      description: 'New Client',
    },
    {
      value: modalOptions.PROJECT,
      label: 'Project',
      icon: <img src="/static/images/icons/project-white.svg" alt="project icon" />,
      description: 'New Project',
    },
    {
      value: modalOptions.PROPOSAL,
      label: 'Proposal',
      icon: <img src="/static/images/icons/folder-white.svg" alt="folder icon" />,
      description: 'New Proposal',
    },
    {
      value: modalOptions.SUPPLIER,
      label: 'Supplier',
      icon: <img src="/static/images/icons/suppliers-white.svg" alt="supplier icon" />,
      description: 'New Supplier',
    },
    {
      value: modalOptions.INVOICE,
      label: 'Invoice',
      icon: <img src="/static/images/icons/invoice-white.svg" alt="invoice icon" />,
      description: 'New Invoice',
    },
  ]);
  const { current: profileDropdownOptions } = useRef([
    {
      value: '/settings',
      label: 'Settings',
      icon: <img src="/static/images/icons/settings.svg" alt="Settings icon" />,
    },
    {
      value: '/billing',
      label: 'Billing',
      icon: <img src="/static/images/icons/creditcard-fill.svg" alt="Credit Card icon" />,
    },
    {
      value: '/team',
      label: 'Team',
      icon: <img src="/static/images/icons/team-dark-blue.svg" alt="Team icon" />,
      className: 'block lg:hidden',
    },
    {
      value: '/logout',
      label: 'Log Out',
      icon: <img src="/static/images/icons/logout.svg" alt="Logout icon" />,
    },
  ]);

  return (
    <header
      className={classnames('pt-header flex flex-shrink-0 items-center px-4', variant)}
    >
      <Link href={Routes.DASHBOARD}>
        <img
          src="/static/images/logo/logo-with-title.svg"
          className="mr-auto hidden md:block cursor-pointer"
          alt="Logo"
        />
      </Link>
      <Link href={Routes.DASHBOARD}>
        <img
          src="/static/images/logo/logo.svg"
          className="mr-auto block md:hidden w-6 cursor-pointer"
          alt="Logo"
        />
      </Link>
      {variant === 'pt-header--default' && (
        <Fragment>
          <Dropdown
            variant="pt-dropdown--dark"
            placeholder="Create"
            options={createDropdownOptions}
            CustomButton={
              <Fragment>
                <div className="block md:hidden bg-blue-pt-100 rounded-lg p-2">
                  <img src="/static/images/icons/plus-white.svg" alt="Plus icon" />
                </div>
                <div className="hidden md:block">
                  <Button className="pt-dropdown__button" size="sm">
                    Create
                  </Button>
                </div>
              </Fragment>
            }
            onOptionClickHandler={modalSelectedOption_ => {
              if (modalSelectedOption_ === modalOptions.INVOICE) return;

              setIsModalVisible(true);
              setModalSelectedOption(modalSelectedOption_);
            }}
          />
          <img
            src="/static/images/icons/notification.svg"
            alt="Notifications icon"
            className="mx-5 md:mx-10 w-7"
          />
        </Fragment>
      )}
      <Dropdown
        options={profileDropdownOptions}
        placeholder="Profile"
        orientation="right"
        CustomButton={
          <div className="flex items-center">
            <span className="text-blue-pt-100 font-semibold text-md hidden md:inline-block mr-3">
              User Name
            </span>
            <img src="/static/images/icons/avatar.svg" alt="Avatar" className="mr-3" />
            <img src="/static/images/icons/arrow-down-dark.svg" alt="Arrow down icon" />
          </div>
        }
        onOptionClickHandler={() => {}}
      />

      <Modal visible={isModalVisible} onCloseHandler={setIsModalVisible} showCloseButton>
        {modalSelectedOption === modalOptions.CLIENT && (
          <ClientModalContent variant="create" onCloseHandler={onCloseModalHandler} />
        )}
        {modalSelectedOption === modalOptions.PROJECT && (
          <NewProjectModalContent onCloseHandler={onCloseModalHandler} />
        )}
        {modalSelectedOption === modalOptions.PROPOSAL && (
          <ProposalToClientModalContent onCloseHandler={onCloseModalHandler} />
        )}
        {modalSelectedOption === modalOptions.SUPPLIER && (
          <ProposalToSupplierModalContent onCloseHandler={onCloseModalHandler} />
        )}
      </Modal>

      <style jsx>
        {`
          .pt-header {
            height: var(--header-height);
          }

          .pt-header--default {
            background-color: var(--yellow-pt-200);
          }

          .pt-header--simple {
            background-color: transparent;
          }
        `}
      </style>
    </header>
  );
};

Header.propTypes = {
  variant: PropTypes.oneOf(['pt-header--default', 'pt-header--simple']),
};

Header.defaultProps = {
  variant: 'pt-header--default',
};

export default Header;
