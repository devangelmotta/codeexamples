import PropTypes from 'prop-types';

const ProjectOptionsBox = ({ title, description, icon, onClickHandler }) => {
  return (
    <div
      className="root flex flex-col text-center rounded-lg border py-4 px-8 items-center justify-center"
      onClick={onClickHandler}
    >
      <img
        className="mx-auto"
        src={`/static/images/icons/${icon}.svg`}
        alt={`${icon} icon`}
      />
      <p className="text-2xl my-4 font-bold">{title}</p>
      <p>{description}</p>

      <style jsx>{`
        .root {
          background-color: #f5f5f5;
          border: 2px solid #c5cdd4;
          cursor: pointer;
          max-width: 100%;
          width: 300px;
        }

        img {
          height: 96px;
          width: 96px;
        }
      `}</style>
    </div>
  );
};

ProjectOptionsBox.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default ProjectOptionsBox;
