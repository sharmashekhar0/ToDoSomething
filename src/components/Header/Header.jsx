import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../store/authSlice";
import Logout from "./Logout";
import { addAllTodos } from "../../store/todoSlice";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/authService";
import service from "../../appwrite/config";

function Header() {
	const authStatus = useSelector((state) => state.authReducer.status);
	const dispatch = useDispatch();

	const navItems = [
		{
			name: "Home",
			url: "/",
			active: true,
		},
		{
			name: "Login",
			url: "/login",
			active: !authStatus,
		},
		{
			name: "Signup",
			url: "/signup",
			active: !authStatus,
		},
	];

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login(userData));
					return getAllTodos();
				}
			})
			.catch(() => {
				console.log("No User Loggin In");
			});
	}, []);

	const getAllTodos = useCallback(async () => {
		try {
			const result = await service.getTodos();
			if (result) {
				dispatch(addAllTodos(result.documents));
			}
		} catch (error) {
			console.log("Header :: getAllTodos :: ", error);
		}
	}, []);

	return (
		<div
			className={`text-[#FBCEB1] h-12 flex items-center justify-center mx-auto p-4 font-semibold bg-[#00308F] bg-opacity-20 shadow-custom w-2/5 rounded-md ${
				authStatus ? "w-2/6" : "w-2/5 px-20"
			}`}
		>
			<div
				className={`flex justify-between ${
					authStatus ? "w-2/3" : "w-full"
				} text-2xl`}
			>
				{navItems.map(
					(item) =>
						item.active && (
							<Link key={item.url} to={item.url}>
								{item.name}
							</Link>
						)
				)}
				{authStatus && <Logout />}
			</div>
		</div>
	);
}

export default Header;
