import { types } from '../types/types';

const initialState = {
  lists: [],
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addNewList:
      return {
        lists: [...state.lists, action.payload],
      };
    case types.addAllLists:
      return {
        lists: action.payload,
      };
    case types.listUpdate:
      return {
        lists: state.lists.map((list) => (list.id === action.payload.id ? action.payload : list)),
      };
    case types.deleteListOfState:
      return {
        lists: state.lists.filter((list) => list.id !== action.payload),
      };
    default:
      return state;
  }
};
