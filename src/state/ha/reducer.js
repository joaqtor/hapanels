import produce from 'immer';

import {
  LOAD,
  AUTH_CHANGE,
  EVENT,
} from './constants';

export const initialState = {
  data: {},
  auth: false,
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case AUTH_CHANGE:
      draft.auth = action.auth;
      break;

    case LOAD:
      draft.data = action.data;
      break;

    case EVENT:
      draft.data[action.entity_id] = action.data;
      break;

    default:
  }
});

export default reducer;
