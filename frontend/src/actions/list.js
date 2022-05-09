import { v4 as uuidv4 } from 'uuid';

import { types } from '../types/types';
import { headers } from '../helpers/headers';
import { pathApi } from '../helpers/pathApi';

// Actions to create in db and add in the state the lists
export const createListAction = (data) => {
  return async (dispatch) => {
    const tasksId = uuidv4();
    const { listName } = data;

    const body = JSON.stringify({
      listName,
      tasksId,
    });

    const credentials = {
      method: 'POST',
      headers,
      body,
    };

    await fetch(`${pathApi}/createList`, credentials)
      .then((response) => response.json())
      .then((data) => {
        dispatch(addNewList(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const addNewList = (list) => ({
  type: types.addNewList,
  payload: list,
});

// Actions to obtain from the database and send the lists to the state
export const actionGetAllLists = () => {
  return async (dispatch) => {
    const credentials = {
      method: 'GET',
      headers,
    };

    await fetch(`${pathApi}/getAllLists`, credentials)
      .then((response) => response.json())
      .then((data) => {
        dispatch(addAllLists(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const addAllLists = (lists) => ({
  type: types.addAllLists,
  payload: lists,
});

// Actions to edit in db and update in the state the edited list
export const listEditAction = (data) => {
  return async (dispatch) => {
    const { id, listName, tasksId } = data;

    const body = JSON.stringify({
      id,
      listName,
      tasksId,
    });

    const credentials = {
      method: 'PUT',
      headers,
      body,
    };

    await fetch(`${pathApi}/updateList`, credentials)
      .then((response) => response.json())
      .then((data) => {
        dispatch(listUpdate(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const listUpdate = (list) => ({
  type: types.listUpdate,
  payload: list,
});

// Actions to delete in db and delete in the state the deleted list
export const actionToDeleteList = (id) => {
  return async (dispatch) => {
    const credentials = {
      method: 'DELETE',
      headers,
    };

    await fetch(`${pathApi}/deleteList/${id}`, credentials)
      .then((response) => response.json())
      .then((data) => {
        data && dispatch(deleteListOfState(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const deleteListOfState = (id) => ({
  type: types.deleteListOfState,
  payload: id,
});
