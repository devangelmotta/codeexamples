import PropTypes from 'prop-types';
import { Button } from '~/components/primitive';

const EmptyTeamSection = ({ toggleModalHandler }) => {
  return (
    <div className="flex flex-col justify-center items-center py-12">
      <img
        src="/static/images/pages/team/united-members.png"
        className="w-32 h-32"
        alt="United members"
      />
      <p className="text-gray-pt-200 leading-6 antialiased text-center mx-4 my-8">
        You can create a team and share responsibilities.
      </p>
      <Button size="sm" onClick={toggleModalHandler}>
        Add member
      </Button>
    </div>
  );
};

EmptyTeamSection.propTypes = {
  toggleModalHandler: PropTypes.func.isRequired,
};

export default EmptyTeamSection;
