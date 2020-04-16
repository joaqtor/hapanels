import React, { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';

import ha from 'utils/ha';
import * as haSelectors from 'state/ha/selectors';

import Row from 'components/Row';
import Column from 'components/Column';
import Button from 'components/Button';
import Slider from 'components/Slider';
import {
  PowerOff,
  VolumeMute,
  VolumeUp,
  TV,
  Chromecast,
  Playstation,
} from 'components/Icons';

import c5n from './channels/c5n.png';
import lnplus from './channels/lnplus.jpg';
import tvpublica from './channels/tvpublica.jpg';
import eltrece from './channels/eltrece.jpg';
import telefe from './channels/telefe.jpg';
import canal26 from './channels/canal26.png';
import canal9 from './channels/canal9.png';
import encuentro from './channels/encuentro.jpg';

import youtube from './apps/youtube.png';
import netflix from './apps/netflix.png';
import plex from './apps/plex.png';

const LivingRemote = () => {
  const entity = 'media_player.living_tv_2';

  const theme = useContext(ThemeContext);
  const isOn = useSelector(haSelectors.isOn(entity));
  const isMuted = useSelector(haSelectors.getAttribute(entity, 'is_volume_muted'));
  const source = useSelector(haSelectors.getAttribute(entity, 'source'));
  const volumeLevel = useSelector(haSelectors.getAttribute(entity, 'volume_level'));
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    setVolume(volumeLevel);
  }, [volumeLevel]);

  const onPower = () => {
    if (isOn) {
      ha.turnOff({ entity_id: entity });
    } else {
      ha.turnOn({ entity_id: entity });
    }
  };

  const onMute = () => {
    ha.service('volume_mute', { domain: 'media_player', entity_id: entity, is_volume_muted: isMuted });
  };

  const onSelectSource = (newSource) => () => {
    ha.service('select_source', { domain: 'media_player', entity_id: entity, source: newSource });
  };

  const channel = (value) => () => {
    ha.service('publish', { domain: 'mqtt', topic: 'living/tv', payload_template: `{ "command": "CHANNEL", "value": ${value} }` });
  };

  const onVolumeChange = (e) => {
    setVolume(e.target.value / 100);
  };

  const onVolumePersist = () => {
    ha.service('volume_set', { domain: 'media_player', entity_id: entity, volume_level: volume });
  };

  const VolumeIcon = isMuted ? VolumeMute : VolumeUp;

  return (
    <>
      <Row height={2}>
        <Column>
          <Button
            isOn={isOn}
            icon={<PowerOff color={theme.colors.icon} />}
            onClick={onPower}
          />
        </Column>
        <Column>
          <Button
            statusLightSize="mini"
            isOn={source === 'TV'}
            icon={<TV color={theme.colors.icon} />}
            onClick={onSelectSource('TV')}
            label="TV"
            type="stretch"
          />
          <Button
            statusLightSize="mini"
            isOn={source === 'Chromecast'}
            icon={<Chromecast color={theme.colors.icon} />}
            onClick={onSelectSource('Chromecast')}
            label="Chromecast"
            type="stretch"
          />
          <Button
            statusLightSize="mini"
            isOn={source === 'Playstation 4'}
            icon={<Playstation color={theme.colors.icon} />}
            onClick={onSelectSource('Playstation 4')}
            label="Playstation 4"
            type="stretch"
          />
        </Column>
      </Row>
      <Row height={1}>
        <Button
          icon={<VolumeIcon color={isOn ? theme.colors.icon : theme.colors.neutral} />}
          onIconClick={isOn ? onMute : null}
          label={(
            <Slider
              value={volume * 100}
              min={0}
              max={100}
              onChange={onVolumeChange}
              onTouchEnd={onVolumePersist}
            />
          )}
        />
      </Row>
      <Row height={5}>
        <Column>
          {source === 'TV' && (
            <>
              <Row>
                <Button
                  onClick={channel(252)}
                  background={c5n}
                />
                <Button
                  onClick={channel(352)}
                  background={lnplus}
                />
              </Row>
              <Row>
                <Button
                  onClick={channel(232)}
                  background={tvpublica}
                />
                <Button
                  onClick={channel(133)}
                  background={eltrece}
                />
              </Row>
              <Row>
                <Button
                  onClick={channel(162)}
                  background={canal26}
                />
                <Button
                  onClick={channel(143)}
                  background={telefe}
                />
              </Row>
              <Row>
                <Button
                  onClick={channel(153)}
                  background={canal9}
                />
                <Button
                  onClick={channel(122)}
                  background={encuentro}
                />
              </Row>
            </>
          )}
          {source === 'Chromecast' && (
            <>
              <Row>
                <Button
                  target="https://youtube.com"
                  background={youtube}
                />
                <Button
                  target="https://netflix.com"
                  background={netflix}
                />
              </Row>
              <Row>
                <Button
                  target="https://192.168.88.94:32400/web/index.html#"
                  background={plex}
                />
              </Row>
            </>
          )}
        </Column>
      </Row>
    </>
  );
};

export default LivingRemote;
