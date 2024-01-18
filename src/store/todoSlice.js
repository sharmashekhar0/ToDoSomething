import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
	todos: [],
};

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			const todo = {
				id: nanoid(),
				text: action.payload,
				isCompleted: false,
			};
			state.todos.push(todo);
		},
		removeTodo: (state, action) => {
			state.todos = state.todos.filter((todo) => {
				return todo.id !== action.payload;
			});
		},
		updateTodo: (state, action) => {
			state.todos = state.todos.map((todo) =>
				todo.id === action.payload.id
					? { id: todo.id, text: action.payload.text }
					: todo
			);
		},
		addAllTodos: (state, action) => {
			const receivedTodos = action.payload;
			console.log("Received Todos :: ", receivedTodos);
			const updatedTodos = receivedTodos.map((todo) => ({
				id: todo.$id,
				text: todo.task,
				isCompleted: todo.isCompleted,
			}));
			return {
				...state,
				todos: [...state.todos, ...updatedTodos],
			};
		},
		toggleComplete: (state, action) => {
			state.todos.map((todo) => {
				if (todo.id === action.payload.todo.id) {
					console.log(
						"Todo.isCompleted :: ",
						!action.payload.todo.isCompleted
					);
					return {
						...todo,
						isCompleted: !action.payload.todo.isCompleted,
					};
				}
				return todo;
			});
		},
	},
});

export const { addTodo, removeTodo, updateTodo, addAllTodos, toggleComplete } =
	todoSlice.actions;

export default todoSlice.reducer;
