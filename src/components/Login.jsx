import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../appwrite/authService";
import { useForm } from "react-hook-form";

function Login() {
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();

	const login = async (data) => {
		setError("");
		console.log("Data", data);
		try {
			const session = await authService.login(data);
			if (session) {
				const userData = await authService.getCurrentUser();
				if (userData) {
					dispatch(authLogin(userData));
					navigate("/");
				}
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center w-full ">
			<div
				className={`mx-auto mt-20 min-h-[400px] flex flex-col justify-between w-full max-w-lg bg-slate-800 text-white  rounded-xl p-8 shadow-custom`}
			>
				{/* <div className="mb-2 flex justify-center">
					<span className=" p-2 w-2/3 font-semibold text-center">
						<p className="text-2xl">ToDoSomething</p>
					</span>
				</div> */}
				<h2 className="text-center text-3xl font-bold leading-tight">
					Sign in to your account
				</h2>
				<p className=" text-center text-xl text-white">
					Don&apos;t have any account?&nbsp;
					<Link
						to="/signup"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign Up
					</Link>
				</p>
				{error && (
					<p className="text-red-600 mt-8 text-center">{error}</p>
				)}
				<form onSubmit={handleSubmit(login)} className="mt-8">
					<div className="space-y-5 flex p-2 flex-col">
						<div className="flex gap-8 text-xl items-center  justify-between">
							<label htmlFor="">Email</label>
							<input
								type="email"
								className="px-2 p-1 outline-none bg-[#290529] rounded-sm w-2/3"
								placeholder="Enter your email"
								{...register("email", {
									required: true,
									validate: {
										matchPatern: (value) =>
											/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
												value
											) ||
											"Email address must be a valid address",
									},
								})}
							/>
						</div>
						<div className="flex gap-8 text-xl items-center justify-between">
							<label htmlFor="">Password</label>
							<input
								type="password"
								className="p-1 px-2 outline-none bg-[#290529] rounded-sm w-2/3"
								placeholder="Enter your password"
								{...register("password", {
									required: true,
								})}
							/>
						</div>
						<button
							type="submit"
							className="w-1/2 mx-auto p-2 shadow-custom font-semibold bg-[#230427] text-xl rounded-md"
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
