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
	// console.log(auth.currentUser);
	// console.log(auth.setPersistence);
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user")); // get user from local storage
		if (storedUser) {
			setUser(storedUser);
		} else {
			navigate("/login");
		}
	}, [navigate]);

	const UserLogin = async (email, password) => {
		try {
			if (email === "testclenroadmin@gmail.com") {
				await signInWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						// Signed in
						const userCred = userCredential.user;
						localStorage.setItem("user", JSON.stringify(userCred));
						setUser(userCred);
						navigate("/", { replace: true });
						// ...
					})
					.catch((error) => {
						toast.error(error.message);
					});
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			localStorage.removeItem("user");
			setUser(null);
			navigate("/login", { replace: true });
		} catch (error) {
			toast.error(error.message);
		}
	};

	const value = {
		user, // set user
		UserLogin,
		logout,
	};

	return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserAuthContext;
