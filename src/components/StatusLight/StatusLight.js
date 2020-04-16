import PropTypes from 'prop-types';
import styled from 'styled-components';

const StatusLight = styled.div`
  position: absolute;
  width: ${(props) => (props.size === 'normal' ? '16px' : '8px')};
  height: ${(props) => (props.size === 'normal' ? '16px' : '8px')};
  background-color: ${(props) => (props.active ? props.theme.colors.on : props.theme.colors.neutral)};
  border-radius: 100%;
  right: ${(props) => (props.size === 'normal' ? '16px' : '8px')};
  top: ${(props) => (props.size === 'normal' ? '16px' : '8px')};
`;

StatusLight.propTypes = {
  active: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['normal', 'mini']).isRequired,
};

export default StatusLight;
