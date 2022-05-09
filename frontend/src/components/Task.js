import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { actionToDeleteTask, actionToEditTask } from '../actions/tasks';

import { Forms } from './Forms';

export const Task = ({ id, taskName, completed, listId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const editTask = (e, data, reset) => {
    e.preventDefault();

    const body = {
      id,
      taskName: data.taskName,
      listId,
      completed,
    };

    dispatch(actionToEditTask(body));
    setIsEditing(false);
    reset({ taskName: '' });
  };

  const toggleCompleted = () => dispatch(actionToEditTask({ id, taskName, listId, completed: !completed }));

  const deleteTask = () => dispatch(actionToDeleteTask(id, listId));

  return (
    <div className={`task animate__animated animate__fadeInLeftBig ${completed && 'completed'}`}>
      <div className='content'>
        <div className='wrapper'>
          <h2>{taskName}</h2>

          <div className='actions'>
            <span onClick={toggleCompleted}>
              {completed ? <i className='fa-solid fa-check complete'></i> : <i className='fa-solid fa-xmark incomplete'></i>}
            </span>
            <button className={`button button-delete ${isEditing && 'disabled'}`} onClick={() => setConfirmDelete(!confirmDelete)}>
              <i className='fa-solid fa-trash-can'></i>
              {confirmDelete ? 'Cancelar' : 'Eliminar'}
            </button>
            <button className={`button button-edit ${completed && 'disabled'} ${confirmDelete && 'disabled'}`} onClick={() => setIsEditing(!isEditing)}>
              <i className='fa-solid fa-pen-to-square'></i>
              {isEditing ? 'Cancelar' : 'Editar'}
            </button>
          </div>
        </div>
        {isEditing && (
          <div className='container-edit_task animate__animated animate__backInRight'>
            <Forms inputName='taskName' placeholder='Nuevo nombre de la tarea' button='Actualizar' onSubmit={editTask} valueToEdit={taskName} />
          </div>
        )}
        {confirmDelete && (
          <div className='container-delete_list animate__animated animate__zoomIn'>
            <h2 className='sub-title'>¿Estás seguro de que quieres eliminar la tarea?</h2>
            <p>Una vez eliminada no podrás recuperar la información de esta tarea</p>
            <button className='button' onClick={deleteTask}>
              Si, estoy seguro
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
