package com.kata.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.kata.api.models.TaskModel;
import com.kata.api.services.TaskService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", 
        methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE 
    }) // Cross origin access for React

public class TaskController {
    @Autowired
    private TaskService tasksService;

    // Create a new task
    @PostMapping("/createTasks")
    public TaskModel createTasks(@RequestBody TaskModel tasksModel) {
        return tasksService.createTasks(tasksModel);
    }

    // Get all tasks
    @GetMapping("/getAllTasks")
    public Iterable<TaskModel> getAllTasks() {
        return tasksService.getAllTasks();
    }

    // Update a task
    @PutMapping("/updateTasks")
    public TaskModel updateTasks(@RequestBody TaskModel tasksModel) {
        return tasksService.updateTasks(tasksModel);
    }

    // Delete a task
    @DeleteMapping("/deleteTasks/{id}")
    public boolean deleteTasks(@PathVariable Long id) {
        try {
            tasksService.deleteTasks(id);
            return true;
        } catch (Exception e) {
            return false;
        } 
    }
}
