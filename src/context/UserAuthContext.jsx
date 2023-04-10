import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const userContext = createContext();
export const useAuth = () => {
	return useContext(userContext);
};

export const UserAuthContext = ({ children }) => {
	const navigate = useNavigate();
	const UserLogin = (email, password) => {
		if (email === "nazarethadmin@gmail.com") {
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					localStorage.setItem("user", JSON.stringify(user));
					navigate("/");
					if (location.reload()) {
						localStorage.removeItem("user");
					}
					// ...
				})
				.catch((error) => {
					toast.error(error.message);
				});
		} else {
			toast.error("Not an Admin");
		}
	};

	const logout = () => {
		signOut(auth)
			.then(() => {
				localStorage.removeItem("user");
				navigate("/login");
			})
			.catch((error) => {
				// An error happened.
				toast.error(error.message);
			});
	};

	const value = {
		UserLogin,
		logout,
	};

	return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserAuthContext;
