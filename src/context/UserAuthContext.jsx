import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const userContext = createContext();
export const useAuth = () => {
	return useContext(userContext);
};

export const UserAuthContext = ({ children }) => {
	// console.log(auth.currentUser);
	// console.log(auth.setPersistence);
	const navigate = useNavigate();
	const location = useLocation();

	const [currentUser, setCurrentUser] = useState([]);

	useEffect(() => {
		if (
			(location.pathname === "/login" && currentUser) ||
			(location.pathname === "/signup" && currentUser)
		) {
			navigate("/");
		}
	}, [location, navigate]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				setCurrentUser(user);
				// ...
			} else {
				setCurrentUser(null);
			}
		});
		return unsubscribe; // Return the unsubscribe function directly
	}, []);

	const checkAuthorization = async (email) => {
		const q = query(
			collection(db, "Admins"),
			where("role", "==", "ClenroAdmin")
		);
		const querySnapshot = await getDocs(q);
		const emails = [];
		querySnapshot.forEach((doc) => {
			emails.push(doc.data().email);
		});
		return emails.includes(email);
	};

	const signInUser = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			return userCredential;
		} catch (error) {
			throw error;
		}
	};

	const UserLogin = async (email, password) => {
		console.time("Login")
		const isAuthorized = await checkAuthorization(email);
		if (isAuthorized) {
			try {
				const userCredential = await signInUser(email, password);
				navigate("/");
			} catch (error) {
				toast.error(error.message);
			}
		} else {
			toast.error("You are not authorized to access this page");
		}
		console.timeEnd("Login")
	};

	const logout = async () => {
		try {
			await signOut(auth);
			navigate("/login");
		} catch (error) {
			toast.error(error.message);
		}
	};

	const value = {
		currentUser,
		UserLogin,
		logout,
	};

	return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserAuthContext;
