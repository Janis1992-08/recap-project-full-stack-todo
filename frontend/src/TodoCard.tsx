import {Todo, TodoStatus} from "./TodoInterface.ts";
import axios from "axios";
import {useState} from "react";


type Props = {
    todo: Todo
    onChange: () => void;
}



export default function TodoCard(props: Props) {

    const [description, setDescription] = useState(props.todo.description);

    function changeInput(event: React.ChangeEvent<HTMLInputElement>) {
        const newDescription = event.target.value;
        setDescription(newDescription)
        axios.put(`api/todo/${props.todo.id}`, {
            ...props.todo,
            description: newDescription,

        }as Todo)
            .then(props.onChange)
    }

    function deleteTodo() {
        axios.delete(`api/todo/${props.todo.id}`)
            .then(props.onChange)
    }

    function move(targetStatus: TodoStatus) {
        axios.put(`api/todo/${props.todo.id}`, {
            ...props.todo,
            status: targetStatus
        } as Todo)
            .then(props.onChange)
    }

    return (
        <div>
            <input value={description} onInput={changeInput}/>
            <button onClick={deleteTodo}>🗑️</button>
            {
                props.todo.status === 'OPEN'
                    ? <div></div>
                :(
                    props.todo.status === 'IN_PROGRESS'
                    ? <button onClick={() => move("OPEN")}>⬅️</button>
                    : <button onClick={() => move("IN_PROGRESS")}>⬅️</button>
                    )
            }
            {
                props.todo.status === 'DONE'
                    ? <div></div>
                    : (
                        props.todo.status === 'OPEN'
                            ? <button onClick={() => move("IN_PROGRESS")}>➡️</button>
                            : <button onClick={() => move("DONE")}>➡️</button>)

            }

        </div>
    )
}