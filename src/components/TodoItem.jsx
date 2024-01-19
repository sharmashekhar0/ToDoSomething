import React, { useState } from "react";
import { removeTodo, updateTodo, toggleComplete } from "../store/todoSlice";
import { useDispatch } from "react-redux";
import service from "../appwrite/config";

function TodoItem({ todo }) {
	const dispatch = useDispatch();
	const [text, setText] = useState(todo.text);
	const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
	const [isTodoEditable, setIsTodoEditable] = useState(false);

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
		if (isTodoEditable) {
			dispatch(updateTodo({ id, text }));
			updateFromServer(id, text);
		}
		setIsTodoEditable(!isTodoEditable);
	};

	async function updateFromServer(id, text, isCompleted) {
		try {
			const result = await service.updateTodo(id, text, isCompleted);
		} catch (error) {
			console.log("TodoItem :: updateFromServer :: ", error);
		}
	}

	const toggleCompleteItem = () => {
		dispatch(toggleComplete({ todo }));
		setIsCompleted(!isCompleted);
		updateFromServer(todo.id, todo.text, !isCompleted);
	};

	return (
		<div className="text-white w-full h-14 px-4 shadow-custom gap-8 flex items-center my-4 mx-auto justify-between bg-slate-800 rounded-sm">
			<div className="flex gap-4 w-full text-xl">
				<input
					type="checkbox"
					checked={isCompleted}
					onChange={toggleCompleteItem}
				/>
				<input
					type="text"
					value={text}
					className={`px-4 h-10 rounded w-full outline-none ${
						isTodoEditable
							? "bg-slate-700 shadow-custom"
							: "bg-slate-800"
					} ${isCompleted ? "line-through" : ""}`}
					readOnly={!isTodoEditable}
					onChange={(e) => setText(e.currentTarget.value)}
				/>
			</div>
			<div className="flex gap-4">
				<button
					className="text-xl"
					onClick={() => updateTodoHandler(todo.id, text)}
				>
					{isTodoEditable ? "📁" : "✏️"}
				</button>
				<button
					className="text-xl"
					onClick={() => removeTodoHandler(todo.id)}
				>
					❌
				</button>
			</div>
		</div>
	);
}

export default TodoItem;
