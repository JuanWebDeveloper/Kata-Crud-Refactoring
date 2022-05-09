import { types } from '../types/types';
import { headers } from '../helpers/headers';
import { pathApi } from '../helpers/pathApi';

// Actions to create in db and add in the state the tasks
export const actionToCreateTask = (data) => {
  return async (dispatch) => {
    const { listId, taskName } = data;

    const body = JSON.stringify({
      listId,
      taskName,
    });

    const credentials = {
      method: 'POST',
      headers,
      body,
    };

    await fetch(`${pathApi}/createTasks`, credentials)
      .then((response) => response.json())
      .then((data) => {
        dispatch(addNewTask(data));
        dispatch(actionToFilterTasks(listId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const addNewTask = (task) => ({
  type: types.addNewTask,
  payload: task,
});

// Actions to get all tasks and add them to status
export const actionToGetAllTasks = () => {
  return async (dispatch) => {
    const credentials = {
      method: 'GET',
      headers,
    };

    await fetch(`${pathApi}/getAllTasks`, credentials)
      .then((response) => response.json())
      .then((data) => {
        dispatch(addAllTasks(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const addAllTasks = (tasks) => ({
  type: types.addAllTasks,
  payload: tasks,
});

// action to filter the tasks by their listId
export const actionToFilterTasks = (listId) => {
  return async (dispatch, getState) => {
    await dispatch(actionToGetAllTasks());
    const { tasks } = getState().tasks;

    const filteredTasks = tasks.filter((task) => task.listId === listId);

    if (filteredTasks.length > 0) {
      dispatch(filterTasks(filteredTasks));
    } else {
      dispatch(noFilterTasks(listId));
    }
  };
};

const filterTasks = (filteredTasks) => ({
  type: types.filterTasks,
  payload: filteredTasks,
});

const noFilterTasks = (tasks) => ({
  type: types.noFilterTasks,
  payload: tasks,
});

// Actions to edit in db and update in the state the tasks
export const actionToEditTask = (data) => {
  return async (dispatch) => {
    const body = JSON.stringify(data);

    const credentials = {
      method: 'PUT',
      headers,
      body,
    };

    await fetch(`${pathApi}/updateTasks`, credentials)
      .then((response) => response.json())
      .then((data) => {
        dispatch(taskUpdate(data));
        dispatch(actionToFilterTasks(data.listId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const taskUpdate = (task) => ({
  type: types.taskUpdate,
  payload: task,
});

// Actions to delete in db and delete in the state the deleted task
export const actionToDeleteTask = (id, listId) => {
  return async (dispatch) => {
    const credentials = {
      method: 'DELETE',
      headers,
    };

    await fetch(`${pathApi}/deleteTasks/${id}`, credentials)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          dispatch(deleteTaskOfState(id));
          dispatch(actionToFilterTasks(listId));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const deleteTaskOfState = (task) => ({
  type: types.deleteTaskOfState,
  payload: task,
});

export const removeAllTasksFromAList = (listId) => {
  return async (dispatch, getState) => {
    const { filteredTasks } = getState().tasks;

    filteredTasks[listId].forEach((task) => {
      dispatch(actionToDeleteTask(task.id, listId));
    });
  };
};
