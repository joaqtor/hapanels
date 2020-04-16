import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';

import { useTitle } from 'hooks';
import * as haSelectors from 'state/ha/selectors';

import Row from 'components/Row';
import Light from 'components/Light';
import Value from 'components/Value';
import { ThermometerHalf, Tint, Sun } from 'components/Icons';

const Office = () => {
  useTitle('Office');
  const theme = useContext(ThemeContext);

  const temperature = useSelector(haSelectors.getState('sensor.office_temperature'));
  const humidity = useSelector(haSelectors.getState('sensor.office_relative_humidity'));
  const luminance = useSelector(haSelectors.getState('sensor.office_luminance'));
  const uv = useSelector(haSelectors.getState('sensor.office_ultraviolet'));

  return (
    <>
      <Row height={3}>
        <Light entity="light.office_desk" />
        <Light entity="light.office_couch_level" />
      </Row>
      <Row height={1}>
        <Value icon={<ThermometerHalf color={theme.colors.neutral} />} value={`${temperature}°`} />
        <Value icon={<Tint color={theme.colors.neutral} />} value={`${String(parseInt(humidity, 10))}%`} />
        <Value icon={<Sun color={theme.colors.neutral} outline />} value={`${String(parseInt(luminance, 10))} lux`} />
        <Value icon={<Sun color={theme.colors.neutral} />} value={String(parseInt(uv, 10))} />
      </Row>
    </>
  );
};

export default Office;
