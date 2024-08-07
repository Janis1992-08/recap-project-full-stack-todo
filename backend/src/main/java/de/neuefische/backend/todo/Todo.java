package de.neuefische.backend.todo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "todos")
public record Todo(
        @Id
        String id,
        String description,
        TodoStatus status
) {

    public Todo(String description, TodoStatus status) {
        this(null, description, status);
    }

    public Todo withId(String id) {
        return new Todo(id, description, status);
    }
}
