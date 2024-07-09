import NewTodoCard from './NewTodoCard.tsx';
import TodoCard from './TodoCard';
import {Todo, TodoStatus} from "./TodoInterface.ts";

type TodoProps = {
    todos: Todo[];
    status: TodoStatus;
    onChange: () => void;
}

export default function TodoList(props: TodoProps) {
    return (
        <div>
            <h2>{props.status}</h2>
            {
                props.todos.map(todo => <TodoCard key={todo.id} todo={todo} onChange={props.onChange} />)
            }
            {
                (props.status === "OPEN" ) && <NewTodoCard onChange={props.onChange}  />
            }
        </div>
    )
}