import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: ${(props) => (props.type === 'normal' ? '20px' : '8px')};;
  flex: 1;
  padding: ${(props) => (props.type === 'normal' ? '16px' : '8px')};
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;

  ${(props) => props.background && `
    background-color: white;
    background-image: url(${props.background});
    background-size: contain;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
  `}

  &:before {
    content: '';
    background-color: aliceblue;
    border-radius: 50%;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: scale(0.001, 0.001);

    ${(props) => props.animating && `
      animation: effect_dylan 0.3s forwards;
    `}
  }

  svg {
    width: 50%;
    height: 50%;
  }

  @keyframes effect_dylan {
    50% {
      transform: scale(1.5, 1.5);
      opacity: 0;
    }
    99% {
      transform: scale(0.001, 0.001);
      opacity: 0;
    }
    100% {
      transform: scale(0.001, 0.001);
      opacity: 1;
    }
  }
`;

Card.propTypes = {
  animating: PropTypes.bool,
  type: PropTypes.oneOf(['normal', 'stretch']),
};

Card.defaultProps = {
  animating: false,
  type: 'normal',
};

export default Card;
