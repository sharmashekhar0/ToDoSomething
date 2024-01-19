import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/authService";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";

function Signup() {
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();

	const create = async (data) => {
		setError("");
		try {
			const userData = await authService.createAccount(data);
			if (userData) {
				const userData = authService.getCurrentUser();
				if (userData) dispatch(login(userData));
				navigate("/");
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div
				className={`mx-auto mt-20 w-full max-w-lg bg-slate-800 min-h-[400px] flex flex-col justify-between text-white rounded-xl px-8 py-6 `}
			>
				{/* <div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<p>Logo</p>
					</span>
				</div> */}
				<h2 className="text-center text-3xl font-bold leading-tight">
					Sign up to create account
				</h2>
				<p className="text-center text-xl text-white">
					Already have an account?&nbsp;
					<Link
						to="/login"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign In
					</Link>
				</p>
				{error && (
					<p className="text-red-600 mt-8 text-center">{error}</p>
				)}

				<form onSubmit={handleSubmit(create)}>
					<div className="space-y-5 flex p-2 flex-col">
						<div className="flex gap-8 text-xl items-center  justify-between">
							<label htmlFor="">Full Name</label>
							<input
								type="text"
								className="px-2 p-1 outline-none bg-[#290529] rounded-sm w-2/3"
								placeholder="Enter your full name"
								{...register("name", {
									required: true,
								})}
							/>
						</div>
						<div className="flex gap-8 text-xl items-center justify-between">
							<label htmlFor="">Email</label>
							<input
								type="email"
								placeholder="Enter your email"
								className="p-1 px-2 outline-none bg-[#290529] rounded-sm w-2/3"
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
								placeholder="Enter your Password"
								{...register("password", {
									required: true,
								})}
							/>
						</div>
						<button
							type="submit"
							className="w-1/2 mx-auto p-2 shadow-custom font-semibold bg-[#230427] text-xl rounded-md"
						>
							Create Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
