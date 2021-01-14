import axios from 'axios';
import {
  ADD_LIST,
  GET_LISTS,
  GET_LIST,
  DELETE_LIST,
  SORT_LIST,
  SHARE_LIST,
  GROUP_LIST_BY_DEPT,
  SET_SORT_ORDER,
  ADD_ITEM,
  ADD_SAVED_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
  DELETE_ITEM,
  ADD_DEPARTMENT,
  EDIT_DEPARTMENT,
  DELETE_DEPARTMENT,
  CLEAR_CURRENT,
  LISTS_ERROR,
  CLEAR_LISTS_ERROR,
  CLEAR_LISTS_MESSAGE,
  CLEAR_LISTS,
  SET_LOADING,
  NEW_DEPTARTMENT,
} from '../actions/types';

const jsonHeader = {
  headers: {
    'Content-Type': 'application/json',
  }
}

// const apiServer = 'http://127.0.0.1:8000';
const apiServer = 'https://api.bchristensen.net';


export const getLists = () => async dispatch => {
  // Returns all shopping lists for a particular user

  try {
    const res = await axios.get(`${apiServer}/api/shopping-lists/`);
    dispatch({
      type: GET_LISTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LISTS_ERROR,
      payload: err.response.data
    });
  }
}

export const addNewList = list => async dispatch => {
  // Add a new shopping list

  try {
    const res = await axios.post(`${apiServer}/api/shopping-lists/`, list, jsonHeader);

    dispatch({
      type: ADD_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LISTS_ERROR,
      payload: err.response.data
    });
  }
}

export const getList = id => async dispatch => {
  // Return a particular shopping list
  try {
    const res = await axios.get(`${apiServer}/api/shopping-list/${id}/detail/`);
    // console.log(res.data)
    dispatch({
      type: GET_LIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LISTS_ERROR,
      payload: err.response.data
    })
  }
}

export const deleteList = id => async dispatch => {
  // Permanently delete a list
  try {
    await axios.delete(`${apiServer}/api/shopping-list/${id}/`);

    dispatch({
      type: DELETE_LIST,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: LISTS_ERROR,
      payload: err.response.data
    });
  }
}

export const sortList = (sortBy) => dispatch => {
  if (sortBy === 'item') {
    dispatch({
      type: SORT_LIST,
      // payload: sortBy
    })
  } else {
    dispatch({
      type: GROUP_LIST_BY_DEPT,
    })
  }
}

export const shareList = (list, message) => async dispatch => {
  // Shares the shopping list with the user passed in data
  try {
    const res = await axios.put(`${apiServer}/api/shopping-list/${list.id}/`, list, jsonHeader);

    dispatch({
      type: SHARE_LIST,
      payload: res.data,
      message: message
    });
  } catch (err) {
    // console.log(err);
    dispatch({
      type: LISTS_ERROR,
      payload: err.response.data.non_field_errors[0]
    });
  }
}

export const setSortOrder = (sortOrder) => dispatch => {
  dispatch({
    type: SET_SORT_ORDER,
    payload: sortOrder
  })
}

export const addItem = (data, msg) => async dispatch => {
  // Adds a new item to the currentList

  try {
    const res = await axios.post(`${apiServer}/api/shopping-list/${data.shopping_list}/items/`, data, jsonHeader);

    dispatch({
      type: ADD_ITEM,
      payload: res.data,
      message: msg,
    });
  } catch (err) {
    dispatch({
      type: LISTS_ERROR,
      payload: err.response.data.non_field_errors[0]
    });
  }
}

export const addSavedItem = data => async dispatch => {
  // Set on_list to true for a saved item

  try {
    const res = await axios.put(`${apiServer}/api/shopping-list/item/${data.id}/`, data, jsonHeader);

    dispatch({
      type: ADD_SAVED_ITEM,
      payload: res.data
    });
  } catch (err) {
    // console.error(err.response.data);
    dispatch({
      type: LISTS_ERROR,
      payload: err.response.data
    })
  }
}

export const updateItem = data => async dispatch => {
  try {
    const res = await axios.put(`${apiServer}/api/shopping-list/item/${data.id}/`, data, jsonHeader);

    dispatch({
      type: EDIT_ITEM,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: LISTS_ERROR,
      payload: err.response.data
    })
  }
}

export const removeItemFromList = (data, id) => async dispatch => {
  // Set on_list to false

  try {
    const res = await axios.put(`${apiServer}/api/shopping-list/item/${id}/`, JSON.stringify(data), jsonHeader);

    dispatch({
      type: REMOVE_ITEM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LISTS_ERROR,
      payload: err.response.data
    })
  }
}

export const deleteItem = (id) => async dispatch => {
  try {
    await axios.delete(`${apiServer}/api/shopping-list/item/${id}/`);
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: LISTS_ERROR,
      payload: err.response.data
    })
  }
}

export const addDepartment = (data) => async dispatch => {
  try {
    const res = await axios.post(`${apiServer}/api/shopping-list/${data.shopping_list}/depts/`, data, jsonHeader);

    dispatch({
      type: ADD_DEPARTMENT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: LISTS_ERROR,
      payload: err.response.data.non_field_errors[0]
    })
  }
}

export const updateDepartment = (data) => async dispatch => {
  try {
    const res = await axios.put(`${apiServer}/api/shopping-list/dept/${data.id}/`, data, jsonHeader);

    dispatch({
      type: EDIT_DEPARTMENT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: LISTS_ERROR,
      payload: err.response.data.non_field_errors[0]
    })
  }
}

export const deleteDepartment = (id) => async dispatch => {
  try {
    await axios.delete(`${apiServer}/api/shopping-list/dept/${id}/`);
    dispatch({
      type: DELETE_DEPARTMENT,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: LISTS_ERROR,
      payload: err.response.data
    })
  }
}

export const setNewDepartment = (bool) => dispatch => {
  dispatch({
    type: NEW_DEPTARTMENT,
    payload: bool,
  })
};

export const clearCurrent = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT,
  })
}

export const clearLists = () => dispatch => {
  dispatch({
    type: CLEAR_LISTS,
  })
}

export const clearListsError = () => dispatch => {
  dispatch({
    type: CLEAR_LISTS_ERROR,
  })
}

export const clearListsMessage = () => dispatch => {
  dispatch({
    type: CLEAR_LISTS_MESSAGE,
  })
}

export const setLoading = (value) => dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: value,
  })
}
