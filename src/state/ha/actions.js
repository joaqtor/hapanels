import ha, { promises } from 'utils/ha';
import ws from 'utils/ws';

import {
  LOAD,
  EVENT,
  AUTH_CHANGE,
} from './constants';
import { TOKEN } from '../../constants';

export const listen = () => async (dispatch) => {
  ws.addEventListener('message', async ({ data: rawData }) => {
    const data = JSON.parse(rawData);

    if (data.type === 'auth_ok') {
      ha.send({ type: 'subscribe_events', event_type: 'state_changed' });
      const result = await ha.send({ type: 'get_states' });
      const states = {};
      result.forEach((state) => {
        states[state.entity_id] = state;
      });
      dispatch({ type: LOAD, data: states });
      dispatch({ type: AUTH_CHANGE, auth: true });
    }

    if (data.type === 'auth_required') {
      ha.send({ type: 'auth', access_token: TOKEN }, false);
      dispatch({ type: AUTH_CHANGE, auth: false });
    }

    if (data.type === 'event') {
      if (data.event.event_type === 'state_changed') {
        dispatch({
          type: EVENT,
          entity_id: data.event.data.entity_id,
          data: data.event.data.new_state,
        });
      }
    }

    const p = promises[data.id];
    if (p) {
      clearTimeout(p.timeout);
      if (!data.success) p.reject(new Error(JSON.stringify(data.error)));
      else p.resolve(data.result);
    }
  });
};

export default listen;
