export const isOn = (entity) => ({ ha: state }) => {
  if (!state.data[entity]) return false;
  return state.data[entity].state === 'on';
};

export const getState = (entity) => ({ ha: state }) => {
  if (!state.data[entity]) return false;
  return state.data[entity].state;
};

export const getAttribute = (entity, attribute) => ({ ha: state }) => {
  if (!state.data[entity]) return false;
  return state.data[entity].attributes[attribute];
};
