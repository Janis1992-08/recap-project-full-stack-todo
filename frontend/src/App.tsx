import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./TodoList.tsx";
import { Todo, TodoFormValues } from "./TodoInterface.ts";
import {Link, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.tsx";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [user, setUser] = useState<{ userName: string } | undefined | null>(undefined);

    useEffect(() => {
        fetchTodos();
        me();
    }, []);

    function fetchTodos() {
        axios.get("/api/todo")
            .then(response => {
                console.log('Fetched todos:', response.data);  // Log the response data
                setTodos(response.data);
            })
            .catch(error => {
                console.error('Error fetching todos:', error);  // Log any errors
                setTodos([]);  // Set todos to an empty array in case of an error
            });
    }

    const login = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.open(host + '/oauth2/authorization/github', '_self');
    };

    const logout = () => {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin;
        window.open(host + "/logout", "_self");
    };

    const me = () => {
        axios.get("/api/auth/me")
            .then(response => {
                console.log('User data:', response.data);
                setUser(response.data);
            })
            .catch(() => {
                setUser(null);
            });
    };

    if ( todos.length === 0) {
        return <p>Loading...</p>;
    }

    console.log('Todos:', todos);
    console.log('User:', user?.userName);

    return (
        <>
            <div>
                <button onClick={login}>Login</button>
                <button onClick={logout}>Logout</button>
                <p>User: {user?.userName}</p>
                <Link to={"/"}>Home</Link>
                <Link to={"/todos"}>Todos</Link>

                <Routes>
                    <Route path="/" element={<p>Home</p>} />
                    <Route element={<ProtectedRoute user={user?.userName} />}>
                        <Route path="/todos" element={
                            <div>
                                <h1>TODOs</h1>
                                {TodoFormValues.map(status => (
                                    <TodoList
                                        key={status}
                                        todos={todos.filter(todo => todo.status === status)}
                                        status={status}
                                        onChange={fetchTodos}
                                    />
                                ))}
                            </div>
                        } />
                        <Route path="/profile" element={<p>{user?.userName}</p>} />
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default App;