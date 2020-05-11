import classnames from 'classnames';
import PropTypes from 'prop-types';

const Footer = ({ className }) => {
  return (
    <footer className={classnames('mt-10 mb-6', className)}>
      <p className="font-medium text-center">© 2020 Protrak All rights reserved.</p>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: '',
};

export default Footer;
