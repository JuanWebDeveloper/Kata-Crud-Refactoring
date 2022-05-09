package com.kata.api.models;

import javax.persistence.*;

@Entity
@Table(name = "lists")
public class ListModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String listName;
    private String tasksId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public String getTasksId() {
        return tasksId;
    }

    public void setTasksId(String tasksId) {
        this.tasksId = tasksId;
    }

}
