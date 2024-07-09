
import React from "react";
import {Todo} from "./TodoInterface.ts";
import axios from "axios";


type Props = {
    onChange: () => void;
}



export default function NewTodoCard(props: Props) {

    const [description, setDescription] = React.useState('');


    function updateText(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value)
    }

    function saveTodo() {
        setDescription("")
        axios.post("api/todo", {
            description: description,
            status: "OPEN"
        } as Todo)
            .then(props.onChange)

    }


    return (
        <div>
            <h3>New Todo</h3>
            <input type={"text"} value={description} onInput={updateText}/>
            <button onClick={saveTodo}>Create</button>
        </div>
    );
}

