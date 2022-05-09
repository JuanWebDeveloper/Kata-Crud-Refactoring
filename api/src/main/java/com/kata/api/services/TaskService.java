package com.kata.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kata.api.models.TaskModel;
import com.kata.api.repositories.TaskRepository;

@Service
public class TaskService {
    @Autowired
    private TaskRepository tasksRepository;

    // Create a new task
    public TaskModel createTasks(TaskModel tasksModel) {
        return tasksRepository.save(tasksModel);
    }

    // Get all tasks
    public Iterable<TaskModel> getAllTasks() {
        return tasksRepository.findAll();
    }

    // Update a task
    public TaskModel updateTasks(TaskModel tasksModel) {
        return tasksRepository.save(tasksModel);
    }

    // Delete a task
    public void deleteTasks(Long id) {
        tasksRepository.deleteById(id);
    }
}
