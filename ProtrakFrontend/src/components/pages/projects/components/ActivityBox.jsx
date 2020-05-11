import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Button, Input, Label, Separator } from '~/components/primitive';
import CommentBox from './CommentBox';
import ImgSlider from './ImgSlider';

import { formatNumberToString, pluralize } from '~/utils/utils';

const ActivityBox = ({
  activity,
  isPrivate,
  pinned,
  needToConfirm,
  author,
  date,
  dateUnit,
  numberOfComments,
  numberOfLikes,
  message,
  comments,
  beforeDate,
  afterDate,
  beforeBudget,
  afterBudget,
  images,
}) => {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');

  const renderHeader = useCallback(() => {
    if (activity === 'markedPaid') {
      return <Label variant="pt-label--dark-green">MARKED AS PAID</Label>;
    }

    if (activity === 'invoiceSent') {
      return <Label variant="pt-label--dark-yellow">PENDING PAYMENT</Label>;
    }

    if (activity === 'requestBudget' || activity === 'acceptedBudget') {
      return (
        <div className="text-right ml-2">
          <p className="text-xs font-bold text-gray-pt-300">
            Project total before: $ {formatNumberToString(beforeBudget)}
          </p>
          <p className="text-gray-pt-200 text-lg font-bold">
            $ {formatNumberToString(afterBudget)}
          </p>
        </div>
      );
    }

    if (activity === 'requestDate' || activity === 'acceptedDate') {
      return (
        <div className="text-right">
          <p className="text-xs font-bold">Before: {beforeDate}</p>
          <p className="text-gray-pt-200 font-bold">{afterDate}</p>
        </div>
      );
    }

    return null;
  }, []);

  return (
    <div>
      <div className="mb-4 flex bg-gray-pt-400 pt-3 pb-6 rounded w-full overflow-hidden">
        <div className="px-2 flex-shrink-0">
          <img src={author.avatarUrl} alt="Avatar" className="h-12 w-12 rounded-full" />
        </div>
        <div className="flex-1 px-2">
          <div className="flex flex-wrap justify-between items-start">
            <div className="flex items-center w-full lg:w-auto mb-1">
              <p className="font-bold text-lg text-blue-pt-100 mr-4">{author.name}</p>
              <div className="flex flex-1 flex-row justify-end items-center">
                {author.role === 'contractor' && (
                  <Label variant="pt-label--light-yellow" size="sm">
                    CONTRACTOR
                  </Label>
                )}
                {author.role === 'client' && (
                  <Label variant="pt-label--light-green" size="sm">
                    CLIENT
                  </Label>
                )}
                {pinned ? (
                  <img
                    src="/static/images/icons/pin-circle-dark.svg"
                    alt="pinned dark"
                    className="ml-2 cursor-pointer w-6 h-6"
                  />
                ) : (
                  <img
                    src="/static/images/icons/pin-circle-light-gray.svg"
                    alt="pinned gray"
                    className="ml-2 cursor-pointer w-6 h-6"
                  />
                )}
              </div>
            </div>

            <div className="hidden lg:flex">
              {isPrivate && (
                <div className="flex">
                  <img src="/static/images/icons/eye-outline.svg" alt="Private icon" />
                  <p className="text-sm text-gray-pt-100 ml-2">Only you can see this</p>
                </div>
              )}
              <div>{renderHeader()}</div>
            </div>
          </div>
          <div className="my-2">
            <p className="text-sm font-thin text-gray-pt-200 mt-1 mb-3">{message}</p>
            {activity === 'addedPhotos' && <ImgSlider images={images} />}
            {isPrivate && (
              <div className="flex lg:hidden">
                <img src="/static/images/icons/eye-outline.svg" alt="Private icon" />
                <p className="text-sm text-gray-pt-100 ml-2">Only you can see this</p>
              </div>
            )}
            <div className="lg:hidden">{renderHeader()}</div>
            {needToConfirm && (
              <div className="flex lg:hidden items-center justify-between my-2">
                <div>
                  <Button
                    size="xs"
                    variant="pt-button--red"
                    className="mx-1"
                    onClick={() => {}}
                  >
                    <p className="font-bold">X</p>
                  </Button>
                  <Button
                    size="xs"
                    variant="pt-button--green"
                    className="mx-1"
                    onClick={() => {}}
                  >
                    <p className="font-bold">✓</p>
                  </Button>
                </div>
                <Button size="xs" className="mx-1" onClick={() => {}}>
                  <p className="text-sm">See details</p>
                </Button>
              </div>
            )}
          </div>
          <Separator color="gray" size={3} />
          <div className="text-gray-pt-200 flex my-2 justify-between items-center">
            <div className="flex">
              <div
                className="border border-gray-pt-100 rounded flex items-center py-1 px-2 mr-2 cursor-pointer"
                onClick={() => {}}
              >
                <img src="/static/images/icons/likes.svg" alt="like" className="mr-1" />
                <p className="text-xs">{numberOfLikes}</p>
              </div>
              <div
                className="border border-gray-pt-100 rounded flex items-center py-1 px-2 cursor-pointer"
                onClick={() => setShowComment(!showComment)}
              >
                <img
                  src="/static/images/icons/comments.svg"
                  alt="comment"
                  className="mr-1"
                />
                <p className="text-xs">{numberOfComments}</p>
              </div>
              {needToConfirm && (
                <div className="ml-2 hidden lg:flex items-center">
                  <Button size="xs" variant="pt-button--red" className="mx-1">
                    <p className="font-bold">X</p>
                  </Button>
                  <Button size="xs" variant="pt-button--green" className="mx-1">
                    <p className="font-bold">✓</p>
                  </Button>
                  <Button size="xs" className="mx-1">
                    <p className="text-sm">See details</p>
                  </Button>
                </div>
              )}
            </div>
            <p className="text-sm font-thin">{pluralize(date, dateUnit)} ago</p>
          </div>
          {showComment && (
            <div>
              <div className="flex flex-wrap items-center">
                <div className="flex-1 pr-1 lg:pr-0 my-1">
                  <Input
                    variant="pt-input--comment"
                    htmlAttrs={{
                      placeholder: 'Write a comment...',
                      type: 'text',
                      size: '4',
                    }}
                    value={comment}
                    onChange={e => {
                      setComment(e.target.value);
                    }}
                  />
                </div>

                <div className="lg:hidden my-1">
                  <Button size="sm" disabled={comment.trim() === ''}>
                    Post
                  </Button>
                </div>
              </div>
              <div className="hidden lg:flex justify-end">
                <img
                  src="/static/images/icons/enter-button.svg"
                  alt="enter"
                  className="mr-1"
                />
                <p className="text-xs text-gray-pt-700">Enter to comment</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {numberOfComments > 0 && (
        <div className="flex flex-wrap justify-end">
          {comments.map(item => {
            return (
              <CommentBox
                key={item.id}
                author={item.author}
                message={item.message}
                numberOfLikes={item.numberOfLikes}
                date={item.date}
                dateUnit={item.dateUnit}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

ActivityBox.propTypes = {
  activity: PropTypes.oneOf([
    'addedPhotos',
    'addedSupplier',
    'markedPaid',
    'invoiceSent',
    'acceptedBudget',
    'requestBudget',
    'acceptedDate',
    'requestDate',
    'proposalApproved',
  ]).isRequired,
  isPrivate: PropTypes.bool.isRequired,
  pinned: PropTypes.bool.isRequired,
  needToConfirm: PropTypes.bool.isRequired,
  author: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  date: PropTypes.number.isRequired,
  dateUnit: PropTypes.string.isRequired,
  numberOfComments: PropTypes.number.isRequired,
  numberOfLikes: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
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
  ).isRequired,
  beforeDate: PropTypes.string,
  afterDate: PropTypes.string,
  beforeBudget: PropTypes.number,
  afterBudget: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.string),
};

ActivityBox.defaultProps = {
  beforeDate: '',
  afterDate: '',
  beforeBudget: undefined,
  afterBudget: undefined,
  images: [],
};

export default ActivityBox;
