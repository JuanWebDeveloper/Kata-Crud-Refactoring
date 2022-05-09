import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Forms } from './Forms';
import { Lists } from './Lists';

// Action
import { createListAction, actionGetAllLists } from '../actions/list';
import { actionToGetAllTasks } from '../actions/tasks';

export const Main = () => {
  const dispatch = useDispatch();
  const { lists } = useSelector((state) => state.lists);

  const createList = (e, data, reset) => {
    e.preventDefault();
    dispatch(createListAction(data));
    e.target.reset();
    reset({ listName: '' });
  };

  useEffect(() => {
    dispatch(actionGetAllLists());
    dispatch(actionToGetAllTasks());
  }, []);

  return (
    <div className='main'>
      <div className='content'>
        <h1 className='title'>Bienvenido Al Administrador De Tareas</h1>
        <Forms inputName='listName' placeholder='Nombre de la lista de tareas' button='Crear' onSubmit={createList} />

        <h2 className='title list-title'>{lists.length > 0 ? 'Listas de tareas' : 'No hay listas de tareas'}</h2>

        {lists.length > 0 && lists.map((list) => <Lists key={list.id} {...list} />)}
      </div>
    </div>
  );
};
