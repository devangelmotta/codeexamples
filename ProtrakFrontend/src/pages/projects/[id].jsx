import PropTypes from 'prop-types';

import { MainLayout } from '~/components/layout';
import { Tabs } from '~/components/primitive';
import { ActivityTab, DetailsTab } from '~/components/pages/projects';

const ProjectDetail = ({ project, activities }) => {
  return (
    <MainLayout pathname="projects">
      <div className="flex items-center mb-4">
        <img
          src="/static/images/icons/project-white-outlined.svg"
          alt="Project icon"
          className="w-24 h-24"
        />
        <div className="ml-6">
          <h1 className="font-bold text-2xl mb-1 text-gray-pt-300">{project.name}</h1>
          <p className="text-gray-pt-200 font-thin">Client: {project.client}</p>
          <p className="text-gray-pt-200 font-thin">Created: {project.createdDate}</p>
        </div>
      </div>
      <Tabs>
        <ActivityTab data-label="Activity" activities={activities} project={project} />
        <DetailsTab data-label="Details" project={project} />
      </Tabs>
    </MainLayout>
  );
};

ProjectDetail.propTypes = {
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
          id: PropTypes.string,
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
};

ProjectDetail.defaultProps = {
  activities: [],
};

ProjectDetail.getInitialProps = async ({ query }) => {
  return {
    project: {
      id: query.id,
      name: '131 Bobby River',
      client: 'Berenice Owen',
      budget: 72000,
      budgetUpdatedDate: 1,
      totalPaid: 45000,
      pendingPayment: 27000,
      budgetChanged: 72000,
      createdDate: '11/24/2019',
      daysLeft: 10,
      percentageProgress: 30,
      projectStatus: 'progress',
      details: {
        address: '131 Bobby River',
        city: 'Miami',
        state: 'Florida',
        startDate: '2/24/2020',
        endDate: '11/19/2020',
        estimatedCost: 94000,
        info:
          'Lorem ipsum dolor sit amet, consectetur' +
          'adipiscing elit, sed do eiusmod tempor incididunt' +
          'ut labore et dolore magna aliqua. Ut enim ad minim' +
          'veniam, quis nostrud exercitation ullamco laboris' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute' +
          'irure dolor in reprehenderit in voluptate velit esse' +
          'cillum dolore eu fugiat nulla pariatur. Excepteur' +
          'sint occaecat cupidatat non proident, sunt in culpa' +
          'qui officia deserunt mollit anim id est laborum.',
      },
    },
    activities: [
      {
        activity: 'addedPhotos',
        author: {
          avatarUrl: 'https://i.pravatar.cc/150?img=2',
          name: 'Daniel Hunter',
          role: 'contractor',
        },
        pinned: true,
        needToConfirm: false,
        numberOfLikes: 5,
        numberOfComments: 0,
        comments: [],
        date: 2,
        dateUnit: 'week',
        message: 'Start of construction',
        images: [
          '/static/images/pages/projects/thumbnail-example-1.png',
          '/static/images/pages/projects/thumbnail-example-2.png',
          '/static/images/pages/projects/thumbnail-example-3.png',
          '/static/images/pages/projects/thumbnail-example-1.png',
          '/static/images/pages/projects/thumbnail-example-2.png',
        ],
        isPrivate: false,
        beforeDate: '00/00/0000',
        afterDate: '00/00/0000',
        beforeBudget: 94000,
        afterBudget: 72000,
      },
      {
        activity: 'addedSupplier',
        author: {
          avatarUrl: 'https://i.pravatar.cc/150?img=2',
          name: 'Daniel Hunter',
          role: 'contractor',
        },
        pinned: false,
        needToConfirm: false,
        numberOfLikes: 5,
        numberOfComments: 0,
        comments: [],
        date: 2,
        dateUnit: 'week',
        message: 'You added a supplier to the project',
        images: [],
        isPrivate: true,
      },
      {
        activity: 'markedPaid',
        author: {
          avatarUrl: 'https://i.pravatar.cc/150?img=2',
          name: 'Daniel Hunter',
          role: 'contractor',
        },
        pinned: false,
        needToConfirm: false,
        numberOfLikes: 5,
        numberOfComments: 1,
        comments: [
          {
            author: {
              avatarUrl: 'https://i.pravatar.cc/150?img=1',
              name: 'Daniel Hunter',
              role: 'contractor',
            },
            message: 'comment',
            numberOfLikes: 5,
            date: 3,
            dateUnit: 'day',
          },
          {
            author: {
              avatarUrl: 'https://i.pravatar.cc/150?img=1',
              name: 'Daniel Hunter',
              role: 'contractor',
            },
            message: 'comment',
            numberOfLikes: 5,
            date: 3,
            dateUnit: 'day',
          },
        ],
        date: 2,
        dateUnit: 'week',
        message: 'You marked the bill as paid',
        images: [],
        isPrivate: false,
        beforeDate: '00/00/0000',
        afterDate: '00/00/0000',
        beforeBudget: 94000,
        afterBudget: 72000,
      },
      {
        activity: 'invoiceSent',
        author: {
          avatarUrl: 'https://i.pravatar.cc/150?img=2',
          name: 'Daniel Hunter',
          role: 'contractor',
        },
        pinned: false,
        needToConfirm: false,
        numberOfLikes: 5,
        numberOfComments: 0,
        comments: [],
        date: 2,
        dateUnit: 'week',
        message: 'Invoice sent for 50% | $ 36.000',
        images: [],
        isPrivate: false,
        beforeDate: '00/00/0000',
        afterDate: '00/00/0000',
        beforeBudget: 94000,
        afterBudget: 72000,
      },
      {
        activity: 'acceptedBudget',
        author: {
          avatarUrl: 'https://i.pravatar.cc/150?img=2',
          name: 'Daniel Hunter',
          role: 'contractor',
        },
        pinned: false,
        needToConfirm: false,
        numberOfLikes: 5,
        numberOfComments: 0,
        comments: [],
        date: 2,
        dateUnit: 'week',
        message: 'Updated budget',
        images: [],
        isPrivate: false,
        beforeDate: '00/00/0000',
        afterDate: '00/00/0000',
        beforeBudget: 94000,
        afterBudget: 72000,
      },
      {
        activity: 'requestBudget',
        author: {
          avatarUrl: 'https://i.pravatar.cc/150?img=1',
          name: 'Berenice Owen',
          role: 'client',
        },
        pinned: false,
        needToConfirm: true,
        numberOfLikes: 5,
        numberOfComments: 0,
        comments: [],
        date: 2,
        dateUnit: 'week',
        message: 'I need you to please lower my price.',
        images: [],
        isPrivate: false,
        beforeDate: '00/00/0000',
        afterDate: '00/00/0000',
        beforeBudget: 94000,
        afterBudget: 72000,
      },
      {
        activity: 'acceptedDate',
        author: {
          avatarUrl: 'https://i.pravatar.cc/150?img=1',
          name: 'Berenice Owen',
          role: 'client',
        },
        pinned: false,
        needToConfirm: false,
        numberOfLikes: 5,
        numberOfComments: 0,
        comments: [],
        date: 2,
        dateUnit: 'week',
        message: 'I accepted the new date.',
        images: [],
        isPrivate: false,
        beforeDate: '00/00/0000',
        afterDate: '00/00/0000',
        beforeBudget: 94000,
        afterBudget: 72000,
      },
      {
        activity: 'requestDate',
        author: {
          avatarUrl: 'https://i.pravatar.cc/150?img=2',
          name: 'Daniel Hunter',
          role: 'contractor',
        },
        pinned: false,
        needToConfirm: true,
        numberOfLikes: 5,
        numberOfComments: 0,
        comments: [],
        date: 2,
        dateUnit: 'week',
        message: 'Update the due date I hope you approve. - 12/19/2019',
        images: [],
        isPrivate: false,
        beforeDate: '00/00/0000',
        afterDate: '00/00/0000',
        beforeBudget: 94000,
        afterBudget: 72000,
      },
      {
        activity: 'proposalApproved',
        author: {
          avatarUrl: 'https://i.pravatar.cc/150?img=1',
          name: 'Berenice Owen',
          role: 'client',
        },
        pinned: false,
        needToConfirm: false,
        numberOfLikes: 5,
        numberOfComments: 0,
        comments: [],
        date: 2,
        dateUnit: 'week',
        message: 'Proposal approved',
        images: [],
        isPrivate: false,
        beforeDate: '00/00/0000',
        afterDate: '00/00/0000',
        beforeBudget: 94000,
        afterBudget: 72000,
      },
    ].map((item, index) => ({
      ...item,
      id: `activity-${index}`,
      comments: item.comments.map((comments, commentIndex) => ({
        ...comments,
        id: `comment-${commentIndex}`,
      })),
    })),
  };
};

export default ProjectDetail;
