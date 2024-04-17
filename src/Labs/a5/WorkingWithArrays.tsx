import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkingWithArrays() {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const API = `${API_BASE}a5/todos`;
    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
      });
    const [todos, setTodos] = useState<any[]>([]);
    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
      };
    const deleteTodo = async (todo:any) => {
        const response = await axios.delete(`${API}/${todo.id}`);
        setTodos(todos.filter((t) => t.id !== todo.id));
    };
    const updateTodo = async () => {
        const response = await axios.put(`${API}/${todo.id}`, todo);
        setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    };
    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };
    const removeTodo = async (todo:any) => {
        const response = await axios
          .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };
    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };
    const fetchTodoById = async (id:number) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };
    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    return (
      <div>
        <h3>Working with Arrays</h3>
        <button className="btn btn-primary" onClick={createTodo} >
        Create Todo
        </button>
        <button className="btn btn-success" onClick={updateTitle} >
        Update Title
        </button>
        <input className="form-control" value={todo.id}
            onChange={(e) => setTodo({ ...todo,
            id: parseInt(e.target.value) })}/>
        <input className="form-control" type="text" value={todo.title}
            onChange={(e) => setTodo({
            ...todo, title: e.target.value })}/>
        <textarea className="form-control" value={todo.description}
            onChange={(e) => setTodo({ ...todo,
            description: e.target.value })} />
        <input className="form-control" value={todo.due} type="date"
            onChange={(e) => setTodo({
            ...todo, due: e.target.value })} />
        <label>
            <input type="checkbox" defaultChecked={todo.completed}
            onChange={(e) => setTodo({
            ...todo, completed: (e.target.checked) })}/>
            Completed
        </label>
        <button className="btn btn-primary" onClick={postTodo}> Post Todo </button>
        <button className="btn btn-success" onClick={updateTodo}>
        Update Todo
        </button>
        <ul className="list-group">
        {todos.map((todo) => (
          <li className="list-group-item" key={todo.id}>
            <button onClick={() => deleteTodo(todo)}
                className="btn btn-danger float-end ms-2">
                Delete
            </button>
            <button className="btn btn-warning" onClick={() => fetchTodoById(todo.id)} >
            Edit
            </button>
            <button className="btn btn-danger" onClick={() => removeTodo(todo)} >
            Remove
            </button>
            {todo.title}
          </li>
        ))}
        </ul>
        <h4>Retrieving Arrays</h4>
        <a className="btn btn-primary" href={API}>
          Get Todos
        </a>
        <h4>Retrieving an Item from an Array by ID</h4>
        <input className="form-control" value={todo.id}
            onChange={(e) => setTodo({ ...todo,
            id: parseInt(e.target.value) })}/>
        <input className="form-control" type="text" value={todo.title}
            onChange={(e) => setTodo({
            ...todo, title: e.target.value })}/>
        <input type="checkbox" defaultChecked={todo.completed}
            onChange={(e) => setTodo({
            ...todo, completed: (e.target.checked) })}/>
        <input className="form-control" type="text" value={todo.description}
            onChange={(e) => setTodo({
            ...todo, title: e.target.value })}/>
        <h3>Updating an Item in an Array</h3>
        <a className="btn btn-primary" href={`${API}/${todo.id}/title/${todo.title}`} >
            Update Title to {todo.title}
        </a>
        <a className="btn btn-primary" href={`${API}/${todo.id}/completed/${todo.completed}`} >
            Update Completed to {todo.completed.toString()}
        </a>
        <a className="btn btn-primary" href={`${API}/${todo.id}/description/${todo.description}`} >
            Update Description to {todo.description}
        </a>
        <a className="btn btn-primary" href={`${API}/${todo.id}`}>
            Get Todo by ID
        </a>
        <h3>Filtering Array Items</h3>
        <a className="btn btn-primary" href={`${API}?completed=true`}>
            Get Completed Todos
        </a>
        <h3>Creating new Items in an Array</h3>
        <a className="btn btn-primary" href={`${API}/create`}>
            Create Todo
        </a>
        <h3>Deleting from an Array</h3>
        <a className="btn btn-primary" href={`${API}/${todo.id}/delete`}>
            Delete Todo with ID = {todo.id}
        </a>
      </div>
    );
  }
export default WorkingWithArrays;