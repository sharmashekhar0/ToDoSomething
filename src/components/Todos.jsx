import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

function Todos() {
	const todos = useSelector((state) => state.todoReducer.todos);
	return (
		<div className="grid lg:grid-cols-2 gap-x-8 p-10 flex-col">
			{todos?.map((todo) => (
				<div key={todo.id}>
					<TodoItem todo={todo} />
				</div>
			))}
		</div>
	);
}

export default Todos;
