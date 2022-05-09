import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionToCreateTask, actionToFilterTasks } from '../actions/tasks';

import { Forms } from './Forms';
import { Task } from './Task';

export const ListsBody = ({ tasksId }) => {
  const dispatch = useDispatch();
  const { filteredTasks } = useSelector((state) => state.tasks);
  const [createTask, setCreateTask] = useState(false);

  const createTaskForm = (e, data, reset) => {
    e.preventDefault();

    const body = {
      listId: tasksId,
      taskName: data.taskName,
    };

    dispatch(actionToCreateTask(body));
    setCreateTask(false);
    reset({ taskName: '' });
  };

  useEffect(() => {
    dispatch(actionToFilterTasks(tasksId));
  }, []);

  return (
    <div className='lists-body'>
      <div className='content'>
        <button className='button' onClick={() => setCreateTask(!createTask)}>
          {createTask ? 'Cancelar' : 'Agregar tarea'}
        </button>

        <div className={`container-create_tasks ${createTask && 'active'}`} id='containerCreateTasks'>
          <Forms inputName='taskName' placeholder='Nombre de la tarea' button='Crear' onSubmit={createTaskForm} />
        </div>

        <div className='tasks-container'>{filteredTasks[tasksId] && filteredTasks[tasksId].map((task) => <Task key={task.id} {...task} />)}</div>
      </div>
    </div>
  );
};
