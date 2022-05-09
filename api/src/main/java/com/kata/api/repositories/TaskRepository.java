package com.kata.api.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.kata.api.models.TaskModel;

@Repository
public interface TaskRepository extends CrudRepository<TaskModel, Long> {

}
