import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../store/authSlice";
import Logout from "./Logout";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/authService";

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
				}
			})
			.catch(() => {
				console.log("No User Loggin In");
			});
	}, []);

	return (
		<div className="text-white h-16 px-20 p-4 border-b-2">
			<div className="flex gap-8 text-2xl">
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
