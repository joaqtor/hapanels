import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

const Value = ({ icon, value }) => (
  <Button icon={icon} label={value} type="stretch" />
);

Value.propTypes = {
  icon: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
};

export default Value;
