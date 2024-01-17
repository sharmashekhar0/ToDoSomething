import React, { useState } from "react";
import { removeTodo, updateTodo } from "../store/todoSlice";
import { useDispatch } from "react-redux";
import service from "../appwrite/config";

function TodoItem({ todo }) {
	const dispatch = useDispatch();
	const [text, setText] = useState(todo.text);
	const removeTodoHandler = (id) => {
		dispatch(removeTodo(id));
		deleteFromServer(id);
	};

	async function deleteFromServer(id) {
		try {
			const result = await service.deleteTodo(id);
		} catch (error) {
			console.log("TodoItem :: deleteFromServer :: ", error);
		}
	}

	const updateTodoHandler = (id, text) => {
		dispatch(updateTodo({ id, text }));
		updateFromServer(id, text);
	};

	async function updateFromServer(id) {
		try {
			const result = await service.updateTodo(id, text);
		} catch (error) {
			console.log("TodoItem :: updateFromServer :: ", error);
		}
	}

	return (
		<div className="text-white w-1/2 h-12 px-4 gap-8 flex items-center my-4 mx-auto justify-between bg-slate-800 rounded-sm">
			<div className="flex gap-4 w-full">
				<input type="checkbox" />
				<input
					type="text"
					value={text}
					className="bg-slate-700 px-4 h-10 rounded w-full outline-none"
					onChange={(e) => setText(e.currentTarget.value)}
				/>
			</div>
			<div className="flex gap-4">
				<button onClick={() => updateTodoHandler(todo.id, text)}>
					Update
				</button>
				<button onClick={() => removeTodoHandler(todo.id)}>
					Delete
				</button>
			</div>
		</div>
	);
}

export default TodoItem;
