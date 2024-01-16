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
				className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
			>
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<p>Logo</p>
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign up to create account
				</h2>
				<p className="mt-2 text-center text-base text-black/60">
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
					<div className="space-y-5">
						<div>
							<label htmlFor="">Full Name</label>
							<input
								type="text"
								placeholder="Enter your full name"
								{...register("name", {
									required: true,
								})}
							/>
						</div>
						<div>
							<label htmlFor="">Email</label>
							<input
								type="email"
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
						<div>
							<label htmlFor="">Password</label>
							<input
								type="password"
								placeholder="Enter your Password"
								{...register("password", {
									required: true,
								})}
							/>
						</div>
					</div>
					<button type="submit" className="w-full">
						Create Account
					</button>
				</form>
			</div>
		</div>
	);
}

export default Signup;
