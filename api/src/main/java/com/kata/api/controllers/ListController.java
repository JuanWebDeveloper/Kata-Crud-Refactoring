package com.kata.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.kata.api.models.ListModel;
import com.kata.api.services.ListService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", 
        methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE 
    }) // Cross origin access for React

public class ListController {
    @Autowired
    private ListService listService;

    // Create a new list
    @PostMapping("/createList")
    public ListModel createList(@RequestBody ListModel listModel) {
        return listService.createList(listModel);
    }

    // Get all lists
    @GetMapping("/getAllLists")
    public Iterable<ListModel> getAllLists() {
        return listService.getAllLists();
    }

    // Update a list
    @PutMapping("/updateList")
    public ListModel updateList(@RequestBody ListModel listModel) {
        return listService.updateList(listModel);
    }

    // Delete a list
    @DeleteMapping("/deleteList/{id}")
    public boolean deleteList(@PathVariable Long id) {
        try {
            listService.deleteList(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
