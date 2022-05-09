import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { actionToDeleteList, listEditAction } from '../actions/list';
import { removeAllTasksFromAList } from '../actions/tasks';

import { Forms } from './Forms';
import { ListsBody } from './ListsBody';

export const Lists = ({ id, listName, tasksId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const editList = (e, data, reset) => {
    e.preventDefault();
    const body = {
      id,
      listName: data.listName,
      tasksId,
    };

    dispatch(listEditAction(body));

    reset({ listName: '' });
    setIsEditing(false);
  };

  const deleteList = (id) => {
    dispatch(actionToDeleteList(id));
    dispatch(removeAllTasksFromAList(tasksId));
    setConfirmDelete(false);
  };

  return (
    <div className='lists animate__animated animate__backInUp'>
      <div className='content'>
        <div className='header'>
          <h2 className='sub-title'>{listName}</h2>

          <div className='actions'>
            <button className={`button button-delete ${isEditing && 'disabled'}`} onClick={() => setConfirmDelete(!confirmDelete)}>
              <i className='fa-solid fa-trash-can'></i>
              {confirmDelete ? 'Cancelar' : 'Eliminar'}
            </button>
            <button className={`button button-edit ${confirmDelete && 'disabled'}`} onClick={() => setIsEditing(!isEditing)}>
              <i className='fa-solid fa-pen-to-square'></i>
              {isEditing ? 'Cancelar' : 'Editar'}
            </button>
          </div>
        </div>

        {!isEditing && !confirmDelete && (
          <div className='body'>
            <ListsBody tasksId={tasksId} />
          </div>
        )}

        {isEditing && (
          <div className='container-edit_list animate__animated animate__backInLeft'>
            <Forms inputName='listName' placeholder='Nuevo nombre de la lista' button='Actualizar' onSubmit={editList} valueToEdit={listName} />
          </div>
        )}
        {confirmDelete && (
          <div className='container-delete_list lists animate__animated animate__zoomIn'>
            <h2 className='sub-title'>¿Estás seguro de que quieres eliminar la lista?</h2>
            <p>Una vez eliminada no podrás recuperar la información de esta lista</p>
            <button className='button' onClick={() => deleteList(id)}>
              Si, estoy seguro
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
