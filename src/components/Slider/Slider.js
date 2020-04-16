import React from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  height: 28px;
`;
const Range = styled.input.attrs({
  type: 'range',
})`
  appearance: none;
  width: 100%;
  height: 2px;
  outline: none;
  border-radius: .25rem;
  margin-top: -2px;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    background-color: ${(props) => props.theme.colors.cardBackground};
    border: .25rem solid white;
    border-radius: 1rem;
    cursor: pointer;
  }
`;

const Slider = ({ ...props }) => (
  <SliderContainer>
    <Range
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </SliderContainer>
);

export default Slider;
