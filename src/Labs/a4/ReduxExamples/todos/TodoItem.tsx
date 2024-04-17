import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { TodoType } from "../../../store";

function TodoItem({ todo } : { todo: TodoType }) {
    const dispatch = useDispatch();
    return (
        <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
        {todo.title}
        <div>
        <button className="btn btn-danger" onClick={() => dispatch(deleteTodo(todo.id))}> Delete </button>
        <button className="btn btn-primary" onClick={() => dispatch(setTodo(todo))}> Edit </button>
        </div>
        </li>
    );
  }
  export default TodoItem;