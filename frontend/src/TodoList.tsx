import NewTodoCard from './NewTodoCard';
import TodoCard from './TodoCard';
import { Todo, TodoStatus } from "./TodoInterface";

type TodoProps = {
    todos: Todo[];
    status: TodoStatus;
    onChange: () => void;
}

export default function TodoList({ todos, status, onChange }: TodoProps) {
    return (
        <div>
            <h2>{status}</h2>
            {todos.length > 0 ? (
                todos.map(todo => (
                    <TodoCard key={todo.id} todo={todo} onChange={onChange} />
                ))
            ) : (
                <p>No todos available</p>
            )}
            {status === "OPEN" && <NewTodoCard onChange={onChange} />}
        </div>
    );
}
