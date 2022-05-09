package com.kata.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kata.api.models.ListModel;
import com.kata.api.repositories.ListRepository;

@Service
public class ListService {
    @Autowired
    private ListRepository listRepository;

    // Create a new list
    public ListModel createList(ListModel listModel) {
        return listRepository.save(listModel);
    }

    // Get all lists
    public Iterable<ListModel> getAllLists() {
        return listRepository.findAll();
    }

    // Update a list
    public ListModel updateList(ListModel listModel) {
        return listRepository.save(listModel);
    }

    // Delete a list
    public void deleteList(Long id) {
        listRepository.deleteById(id);
    }
}
