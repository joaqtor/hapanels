import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex: ${(props) => props.height / 8};
  overflow: hidden;
  flex-direction: row;
`;

Row.defaultProps = {
  height: 8,
};

export default Row;
