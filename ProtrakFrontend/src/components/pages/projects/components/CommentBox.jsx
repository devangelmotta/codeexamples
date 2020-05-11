import PropTypes from 'prop-types';

import { Label, Separator } from '~/components/primitive';
import { pluralize } from '~/utils/utils';

const CommentBox = ({ author, message, numberOfLikes, date, dateUnit }) => {
  return (
    <div className="w-full lg:w-11/12">
      <div className="h-4 ml-6 border-l-4 border-gray-pt-100" />
      <div className="flex bg-gray-pt-400 py-3 rounded">
        <div className="px-2">
          <img src={author.avatarUrl} alt="Avatar" className="h-12 w-12 rounded-full" />
        </div>
        <div className="flex-1 px-2">
          <div className="flex items-center">
            <p className="font-bold text-lg text-blue-pt-100 mr-2">{author.name}</p>
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
          </div>
          <p className="text-sm text-gray-pt-200 my-1">{message}</p>
          <Separator color="gray" size={3} />
          <div className="text-gray-pt-200 flex my-2 justify-between items-center">
            <div className="border rounded flex items-center p-1 cursor-pointer">
              <img src="/static/images/icons/likes.svg" alt="likes" className="mr-1" />
              <p className="text-xs">{numberOfLikes}</p>
            </div>
            <p className="text-sm font-thin">{pluralize(date, dateUnit)} ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

CommentBox.propTypes = {
  author: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  date: PropTypes.number.isRequired,
  dateUnit: PropTypes.string.isRequired,
  numberOfLikes: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};

export default CommentBox;
