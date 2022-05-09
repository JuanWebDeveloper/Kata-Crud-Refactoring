package com.kata.api.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.kata.api.models.ListModel;

@Repository
public interface ListRepository extends CrudRepository<ListModel, Long> {

}
