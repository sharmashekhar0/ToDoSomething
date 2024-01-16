import React from "react";
import authService from "../../appwrite/authService";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function Logout() {
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			await authService.logout();
			console.log("Logouttted");
			dispatch(logout());
		} catch (error) {
			throw error;
		}
	};

	return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
