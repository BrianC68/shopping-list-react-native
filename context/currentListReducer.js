import { SET_CURRENT_LIST_TITLE } from './types';

export default (state, action) => {
  switch (action.type) {
    case SET_CURRENT_LIST_TITLE:
      return {
        ...state,
        currentListTitle: action.payload,
      };
    default:
      return state;
  }
}