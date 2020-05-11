import { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Tabs = ({ children, initialTabIndex }) => {
  const [activeTab, setActiveTab] = useState(initialTabIndex);

  return (
    <div className="pt-tabs">
      <div className="pt-tabs__menu inline-flex text-blue-pt-100 mb-4">
        {children.map((child, index) => {
          const tabLabel = child.props['data-label'];
          return (
            <div
              className={classnames(
                'pt-tabs__menu-item cursor-pointer px-6 py-2 border-b border-pt-600',
                index === activeTab && 'font-bold border-blue-pt-100',
              )}
              key={tabLabel}
              onClick={() => setActiveTab(index)}
            >
              {tabLabel}
            </div>
          );
        })}
      </div>
      <div className="pt-tabs__content">{children[activeTab]}</div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  initialTabIndex: PropTypes.number,
};

Tabs.defaultProps = {
  initialTabIndex: 0,
};

export default Tabs;
