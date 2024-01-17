import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

function Todos() {
	const todos = useSelector((state) => state.todoReducer.todos);
	console.log("Todos :: Todos :: ", todos);
	return (
		<div>
			{todos?.map((todo) => (
				<div key={todo.id}>
					<TodoItem todo={todo} />
				</div>
			))}
		</div>
	);
}

export default Todos;
