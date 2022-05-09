import { types } from '../types/types';

const initialState = {
  tasks: [],
  filteredTasks: {},
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addNewTask:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case types.addAllTasks:
      return {
        ...state,
        tasks: action.payload,
      };
    case types.filterTasks:
      return {
        ...state,
        filteredTasks: { ...state.filteredTasks, [action.payload[0].listId]: action.payload },
      };
    case types.noFilterTasks:
      return {
        ...state,
        filteredTasks: { ...state.filteredTasks, [action.payload]: [] },
      };
    case types.taskUpdate:
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
      };
    case types.deleteTaskOfState:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};
