import {
  ADD_LIST,
  GET_LISTS,
  GET_LIST,
  DELETE_LIST,
  SORT_LIST,
  SHARE_LIST,
  GROUP_LIST_BY_DEPT,
  ADD_ITEM,
  ADD_SAVED_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
  DELETE_ITEM,
  ADD_DEPARTMENT,
  EDIT_DEPARTMENT,
  DELETE_DEPARTMENT,
  LISTS_ERROR,
  CLEAR_LISTS_ERROR,
  CLEAR_CURRENT,
  CLEAR_LISTS,
  SET_LOADING,
  SET_SORT_ORDER,
  CLEAR_LISTS_MESSAGE,
  NEW_DEPTARTMENT,
} from '../actions/types';

const initialState = {
  lists: null,
  error: null,
  currentList: null,
  loading: false,
  sort_order: '',
  message: '',
  newDept: false,
}

const list = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTS:
      return {
        ...state,
        lists: action.payload,
        currentList: null,
        // loading: false
      }
    case ADD_LIST:
      return {
        ...state,
        lists: [action.payload, ...state.lists],
        loading: false
      }
    case GET_LIST:
      return {
        ...state,
        currentList: action.payload[0],
        // loading: false //now set false in ListDetailScreen.js
      }
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => action.payload !== list.id),
        loading: false
      }
    case SORT_LIST:
      return {
        ...state,
        currentList: {
          ...state.currentList,
          list_items: [
            ...state.currentList.list_items
          ].sort((a, b) => {
            let itemA = a.item.toLowerCase(),
              itemB = b.item.toLowerCase();

            if (state.sort_order === 'asc') {
              if (itemA < itemB) {
                return -1;
              }
              if (itemA > itemB) {
                return 1;
              }
            } else {
              if (itemA < itemB) {
                return 1;
              }
              if (itemA > itemB) {
                return -1;
              }
            }
            return 0;
          })
        }
      }
    case SHARE_LIST:
      return {
        ...state,
        currentList: {
          ...state.currentList,
          shares: action.payload.shares
        },
        message: action.message,
        loading: false,
      }
    case GROUP_LIST_BY_DEPT:
      return {
        ...state,
        currentList: {
          ...state.currentList,
          list_items: [
            ...state.currentList.list_items
          ].sort((a, b) => {
            let deptA = a.department,
              deptB = b.department;

            if (state.sort_order === 'asc') {
              if (deptA < deptB) {
                return -1;
              }
              if (deptA > deptB) {
                return 1;
              }
            } else {
              if (deptA < deptB) {
                return 1;
              }
              if (deptA > deptB) {
                return -1;
              }
            }
            return 0;
          })
        }
      }
    case SET_SORT_ORDER:
      return {
        ...state,
        sort_order: action.payload
      }
    case ADD_ITEM:
      return {
        ...state,
        currentList: {
          ...state.currentList,
          list_items: [
            ...state.currentList.list_items,
            action.payload
          ]
        },
        message: action.message,
        loading: false,
      }
    case ADD_SAVED_ITEM:
      return {
        ...state,
        currentList: {
          ...state.currentList,
          list_items: [
            ...state.currentList.list_items.map(item => item.id === action.payload.id ? action.payload : item)
          ]
        },
        loading: false
      }
    case EDIT_ITEM:
      return {
        ...state,
        currentList: {
          ...state.currentList,
          list_items: [
            ...state.currentList.list_items.map(item => item.id === action.payload.id ? action.payload : item)
          ]
        },
        loading: false
      }
    case REMOVE_ITEM:
      // console.log(action.payload)
      return {
        ...state,
        currentList: {
          ...state.currentList,
          list_items: [
            // ...state.currentList.list_items
            ...state.currentList.list_items.map(item => item.id === action.payload.id ? action.payload : item)
          ]
        },
        loading: false
      }
    case DELETE_ITEM:
      return {
        ...state,
        currentList: {
          ...state.currentList,
          list_items: state.currentList.list_items.filter(item => item.id !== action.payload)
        },
        loading: false
      }
    case ADD_DEPARTMENT:
      return {
        ...state,
        currentList: {
          ...state.currentList,
          departments: [
            action.payload,
            ...state.currentList.departments
          ]
        },
        loading: false,
      }
    case EDIT_DEPARTMENT:
      return {
        ...state,
        currentList: {
          ...state.currentList,
          departments: [
            ...state.currentList.departments.map(dept => dept.id === action.payload.id ? action.payload : dept)
          ]
        },
        loading: false,
      }
    case DELETE_DEPARTMENT:
      return {
        ...state,
        currentList: {
          ...state.currentList,
          departments: [
            ...state.currentList.departments.filter(dept => dept.id !== action.payload)
          ],
          list_items: [
            ...state.currentList.list_items.map(item => item.department === action.payload ? { ...item, department: null } : { ...item })
          ]
        },
        loading: false,
      }
    case NEW_DEPTARTMENT:
      return {
        ...state,
        newDept: action.payload,
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        currentList: null
      }
    case CLEAR_LISTS:
      return {
        ...state,
        lists: null,
      }
    case LISTS_ERROR:
      // console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case CLEAR_LISTS_ERROR:
      return {
        ...state,
        error: null
      }
    case CLEAR_LISTS_MESSAGE:
      return {
        ...state,
        message: ''
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return {
        ...state,
      }
  }
}

export default list;
