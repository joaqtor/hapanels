import ws from 'utils/ws';

let id = 0;
export const promises = {};

const ha = {
  send: (payload, withId = true) => {
    const data = { ...payload };
    // eslint-disable-next-line no-plusplus
    if (withId) data.id = ++id;

    return new Promise((resolve, reject) => {
      if (withId) {
        promises[data.id] = {
          timeout: setTimeout(() => {
            reject(new Error(`No response received from home-assistant - ID: ${data.id}`));
          }, 5000),
          resolve,
          reject,
        };
      }

      ws.send(JSON.stringify(data));
    });
  },
  service: (service, data) => {
    const domain = data && (data.domain || data.entity_id.split('.')[0]);
    // eslint-disable-next-line no-param-reassign
    delete data.domain;

    return ha.send({
      type: 'call_service',
      domain,
      service,
      service_data: data,
    });
  },
  turnOn: (data) => ha.service('turn_on', data),
  turnOff: (data) => ha.service('turn_off', data),
};

export default ha;
