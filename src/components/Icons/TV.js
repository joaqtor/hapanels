import React from 'react';
import PropTypes from 'prop-types';

const path = 'M592 0H48A48 48 0 0 0 0 48v320a48 48 0 0 0 48 48h240v32H112a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H352v-32h240a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm-16 352H64V64h512z';

const TV = ({ color }) => (
  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="TV" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
    <path fill={color} d={path} />
  </svg>
);

TV.propTypes = {
  color: PropTypes.string,
};

TV.defaultProps = {
  color: 'white',
};

export default TV;
