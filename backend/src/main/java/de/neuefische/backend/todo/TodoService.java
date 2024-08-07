package de.neuefische.backend.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAll() {
        return todoRepository.findAll();
    }

    public Todo save(Todo todo) {
        String id = UUID.randomUUID().toString();
        Todo todoToSave = todo.withId(id);
        return todoRepository.save(todoToSave);
    }

    public Todo getById(String id) {
        return todoRepository.findById(id).orElse(null);
    }

    public Todo update(Todo todo) {
        return todoRepository.save(todo);
    }

    public void delete(String id) {
        todoRepository.deleteById(id);
    }
}