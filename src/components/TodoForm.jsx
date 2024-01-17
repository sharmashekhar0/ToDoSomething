import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo } from "../store/todoSlice";
import service from "../appwrite/config";

function TodoForm() {
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();

	async function addTodoHandler(data) {
		try {
			const task = data.text;
			const result = await service.createTodo({ task });
			dispatch(addTodo(task));
		} catch (error) {
			throw error;
		}
	}

	return (
		<div className="h-32 w-2/3 flex items-center justify-center mx-auto mt-5 rounded bg-slate-800">
			<div className="flex h-full w-full items-center justify-center">
				<form
					onSubmit={handleSubmit(addTodoHandler)}
					className="w-full flex justify-center"
				>
					<input
						type="text"
						placeholder="Enter Your Task"
						className="h-12 outline-none px-4 rounded-s-sm text-xl w-2/3 bg-slate-700 text-white"
						{...register("text", {
							required: true,
						})}
					/>
					<button
						type="submit"
						className="bg-slate-900 text-white text-2xl w-1/12 rounded-e-sm"
					>
						Add
					</button>
				</form>
			</div>
		</div>
	);
}

export default TodoForm;
