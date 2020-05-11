import { Fragment, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Dropdown, Label } from '~/components/primitive';

const ListMembersTeamSection = ({ toggleModalHandler }) => {
  const { current: memberOptions } = useRef([
    {
      value: 'owner',
      label: 'Make Owner',
    },
    {
      value: 'admin',
      label: 'Make Admin',
    },
    {
      value: 'delete',
      label: 'Delete',
      icon: <img src="/static/images/icons/trash-red-2.svg" alt="Delete icon" />,
      className: 'text-red-pt-100',
    },
  ]);
  const { current: members } = useRef([
    {
      id: 1,
      name: 'Daniel Hunter',
      email: 'daniihter@yahoo.com',
      since: '08/18/2015',
      role: 'OWNER',
      photo: '/static/images/pages/team/united-members.png',
    },
    {
      id: 2,
      name: 'Christopher Rose',
      email: 'daniihter@yahoo.com',
      since: '08/18/2015',
      role: 'ADMIN',
      photo: '/static/images/pages/team/united-members.png',
    },
    {
      id: 3,
      name: 'Scott Warren',
      email: 'daniihter@yahoo.com',
      since: '08/18/2015',
      role: 'TEAM',
      photo: '/static/images/pages/team/united-members.png',
    },
  ]);

  const renderUserRole = useCallback(role => {
    let variant = '';

    if (role === 'OWNER') {
      variant = 'pt-label--light-yellow';
    } else if (role === 'ADMIN') {
      variant = 'pt-label--blue';
    } else if (role === 'TEAM') {
      variant = 'pt-label--light-green';
    }

    return (
      <Label variant={variant} size="sm">
        {role}
      </Label>
    );
  }, []);

  return (
    <Fragment>
      {members.map(item => {
        return (
          <div key={`team-member-${item.id}`}>
            <div
              className={classnames(
                'flex flex-wrap items-center bg-gray-pt-400 my-5 py-4 rounded-md',
              )}
            >
              <div className="w-full md:w-1/2 md:max-w-sm flex flex-row flex-no-wrap justify-start items-start md:items-center px-4">
                <img
                  className="h-10 w-10 flex-shrink-0"
                  src={item.photo}
                  alt="User avatar"
                />
                <div className="mx-4">
                  <p className="font-bold text-md text-gray-pt-200 break-words mb-1 md:mb-0">
                    {item.name} {item.role === 'OWNER' ? '(You)' : ''}
                  </p>
                  <p className="text-sm text-gray-pt-200 break-all">
                    <img
                      className="inline w-3 h-3 mr-1 align-middle"
                      src="/static/images/icons/mail-dark.svg"
                      alt="Email icon"
                    />
                    {item.email}
                  </p>
                </div>
                <div className="ml-auto">{renderUserRole(item.role)}</div>
              </div>

              <div className="flex flex-row flex-no-wrap w-full md:w-1/2 md:flex-1 justify-end items-center px-5 mt-2 md:mt-0">
                <p className="text-gray-500 text-sm leading-tight mr-4">
                  Member since {item.since}
                </p>
                <Dropdown
                  options={memberOptions}
                  orientation="right"
                  CustomButton={
                    <div className="flex items-center py-4">
                      <div className="inline-block w-1 h-1 bg-blue-pt-100 rounded" />
                      <div className="inline-block w-1 h-1 bg-blue-pt-100 rounded mx-1" />
                      <div className="inline-block w-1 h-1 bg-blue-pt-100 rounded" />
                    </div>
                  }
                  onOptionClickHandler={() => {}}
                />
              </div>
            </div>

            {item.role === 'OWNER' && (
              <div className="w-full border-b border-gray-pt-600" />
            )}
          </div>
        );
      })}

      <div
        className="flex flex-row items-center mt-10 cursor-pointer px-6"
        onClick={toggleModalHandler}
      >
        <div className="flex justify-center items-center rounded-full border  border-gray-pt-200 bg-gray-pt-400 h-10 w-10">
          <img
            className="w-5 h-5"
            src="/static/images/icons/plus-dark.svg"
            alt="Add icon"
          />
        </div>
        <span className="text-gray-pt-200 text-md ml-5">Add member</span>
      </div>
    </Fragment>
  );
};

ListMembersTeamSection.propTypes = {
  toggleModalHandler: PropTypes.func.isRequired,
};

export default ListMembersTeamSection;
