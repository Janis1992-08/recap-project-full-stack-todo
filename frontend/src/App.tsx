import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import TodoList from "./TodoList.tsx";
import {Todo, TodoFormValues} from "./TodoInterface.ts";

function App() {

  const [todos, setTodos] = useState<Todo[]>()
function fetchTodos() {
    axios.get("api/todo")
        .then(response => {
            setTodos(response.data)
        })
}

  useEffect(fetchTodos, [])

  if(!todos) {
    return <p>Loading...</p>
  }

  return (
    <>
        <div>
            <h1>TODOs</h1>
        {
            TodoFormValues.map(status => (
                <TodoList key={status} todos={todos.filter(todo => todo.status === status)} status={status} onChange={fetchTodos}/>
            ))
        }
        </div>
    </>
  )
}

export default App
