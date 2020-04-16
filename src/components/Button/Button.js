import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Card from 'components/Card';
import StatusLight from 'components/StatusLight';

const Label = styled.div`
  flex: 1;
  font-weight: 500;
  text-align: center;
  margin: -3px 0 0 8px;
  font-size: 24px;
  font-weight: bold;
  color: #ddd;
`;

const Icon = styled.div`
  ${(props) => (props.hasLabel ? `
    text-align: left;
    position: absolute;
    left: 16px;

    svg {
      width: 24px;
      height: 24px;
    }
  ` : `
    flex: 1;
    text-align: center;
  `)}
`;

const Button = ({
  isOn,
  icon,
  onClick,
  onIconClick,
  label,
  statusLightSize,
  type,
  background,
}) => {
  const [animating, setAnimating] = useState(false);

  const onTouchEnd = () => {
    setAnimating(true);

    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    onClick();
  };

  const onIconTouchEnd = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    onIconClick();
  };

  const onAnimationEnd = () => {
    setAnimating(false);
  };

  return (
    <Card
      onTouchEnd={onClick ? onTouchEnd : null}
      type={type}
      animating={animating}
      onAnimationEnd={onAnimationEnd}
      background={background}
    >
      {isOn !== null && <StatusLight size={statusLightSize} active={isOn} />}
      {icon && (
        <Icon hasLabel={!!label} onTouchEnd={onIconClick ? onIconTouchEnd : null}>{icon}</Icon>
      )}
      {label && <Label>{label}</Label>}
    </Card>
  );
};

Button.propTypes = {
  isOn: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  onIconClick: PropTypes.func,
  label: PropTypes.string,
  statusLightSize: PropTypes.oneOf(['normal', 'mini']),
  type: PropTypes.oneOf(['normal', 'stretch']),
  background: PropTypes.string,
};

Button.defaultProps = {
  isOn: null,
  icon: null,
  onClick: null,
  onIconClick: null,
  label: null,
  statusLightSize: 'normal',
  type: 'normal',
  background: null,
};

export default Button;
