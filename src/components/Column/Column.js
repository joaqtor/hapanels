import styled from 'styled-components';
import PropTypes from 'prop-types';

const Column = styled.div`
  display: flex;
  flex: ${(props) => props.width / 4};
  flex-direction: column;
  overflow: hidden;
`;

Column.propTypes = {
  width: PropTypes.number,
};

Column.defaultProps = {
  width: 4,
};

export default Column;
