package com.example.todolist.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.todolist.Model.Task;

public interface TaskRepo extends JpaRepository<Task, Long> {

}
