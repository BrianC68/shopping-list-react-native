import React, { useReducer } from 'react';
import CurrentListContext from './currentListContext';
import currentListReducer from './currentListReducer';
import { SET_CURRENT_LIST_TITLE } from './types';

const currentListState = props => {
  const initialState = {
    currentListTitle: 'List Detail',
  }

  const [state, dispatch] = useReducer(currentListReducer, initialState);

  const setCurrentListTitle = (title) => dispatch(
    {
      type: SET_CURRENT_LIST_TITLE,
      payload: title,
    }
  )

  // const clearCurrentListTitle = () => dispatch(
  //   {
  //     type: CLEAR_CURRENT_LIST_TITLE,
  //   }
  // )

  return <CurrentListContext.Provider
    value={{
      currentListTitle: state.currentListTitle,
      setCurrentListTitle,
      // clearCurrentListTitle,
    }}
  >
    {props.children}
  </CurrentListContext.Provider>
};

export default currentListState;
