import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { useSelector } from 'react-redux';

import ha from 'utils/ha';
import * as haSelectors from 'state/ha/selectors';

import Button from 'components/Button';
import { Lightbulb } from 'components/Icons';

const Light = ({ entity }) => {
  const theme = useContext(ThemeContext);
  const isOn = useSelector(haSelectors.isOn(entity));

  const onClick = () => {
    if (isOn) {
      ha.turnOff({ entity_id: entity });
    } else {
      ha.turnOn({ entity_id: entity });
    }
  };

  return (
    <Button
      isOn={isOn}
      icon={<Lightbulb color={theme.colors.icon} />}
      onClick={onClick}
    />
  );
};

Light.propTypes = {
  entity: PropTypes.string.isRequired,
};

export default Light;
