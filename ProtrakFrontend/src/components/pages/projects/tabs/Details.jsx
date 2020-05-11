import PropTypes from 'prop-types';

import { Project } from '~/components/pages/_shared';
import { Button, Separator } from '~/components/primitive';
import { formatNumberToString } from '~/utils/utils';

const Details = ({ project }) => {
  return (
    <div>
      <p className="font-bold text-xl my-4 text-gray-pt-300">Project information</p>
      <p className="text-gray-pt-200 font-thin text-sm mb-4 text-justify">
        {project.details.info}
      </p>
      <div className="flex flex-wrap md:w-8/12">
        <div className="flex flex-wrap w-full justify-between">
          <Project.DataItem title="Address" data={project.details.address} />
          <Project.DataItem title="City" data={project.details.city} />
          <Project.DataItem title="State" data={project.details.state} />
        </div>
        <div className="flex flex-wrap w-full justify-between">
          <Project.DataItem title="Start Date" data={project.details.startDate} />
          <Project.DataItem title="End Date" data={project.details.endDate} />
          <Project.DataItem
            title="Estimated Cost"
            data={`$ ${formatNumberToString(project.details.estimatedCost)}`}
          />
        </div>
      </div>
      <Separator size={3} color="gray" />
      <div className="flex flex-wrap mt-3 sm:mt-6">
        <Button
          size="sm"
          className="w-full sm:w-auto"
          onClick={e => {
            alert(e.currentTarget.innerText);
          }}
        >
          Mark as completed
        </Button>
        <Separator responsive={[1, 1, 'sm']} />
        <Button
          variant="pt-button--red"
          size="sm"
          className="w-full sm:w-auto"
          onClick={e => {
            alert(e.currentTarget.innerText);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

Details.propTypes = {
  project: PropTypes.shape({
    details: PropTypes.shape({
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      estimatedCost: PropTypes.number.isRequired,
      info: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Details;
