import "./index.css";

// Packages
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
	typography: {
		fontFamily: "Poppins",
	},
});

// CLENRO Admin Pages
import Home from "./pages/home/Home";
import ListUser from "./pages/users/ListUser";
import ListCollector from "./pages/collector/ListCollector";
import ListConsolidator from "./pages/consolidator/ListConsolidator";
import ListBarangayAdmin from "./pages/barangaysAdmin/ListBarangayAdmin";
import ListAdmins from "./pages/Admins/ListAdmins";
import Login from "./pages/login/Login";
import { useAuth } from "./context/UserAuthContext";
// import SignUp from "./pages/signup/SignUp";

// Barangay

import { useAuthBarangay } from "./barangayAdmin/context/BarangayAuthContext";
import BarangayLogin from "./barangayAdmin/pages/login/BarangayLogin";

function App() {
	const { currentUser } = useAuth();

	const RequireAuth = ({ children }) => {
		return currentUser ? children : <Navigate to="/login" />;
	};

	return (
		<div className="App">
			<ToastContainer
				position="top-center"
				limit={3}
				draggablePercent={60}
				autoClose={3000}
			/>
			<ThemeProvider theme={theme}>
				<Routes>
					<Route path="login" element={<Login />} />
					{/* <Route path="signup" element={<SignUp />} /> */}
					<Route
						index
						// path="home"
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route
						path="users"
						element={
							<RequireAuth>
								<ListUser />
							</RequireAuth>
						}
					/>
					<Route
						path="collectors"
						element={
							<RequireAuth>
								<ListCollector />
							</RequireAuth>
						}
					/>
					<Route
						path="consolidators"
						element={
							<RequireAuth>
								<ListConsolidator />
							</RequireAuth>
						}
					/>
					<Route
						path="admins"
						element={
							<RequireAuth>
								<ListAdmins />
							</RequireAuth>
						}
					/>
					{/* Barangay Admin */}
					<Route path="barangay-admin" element={<BarangayLogin />} />
				</Routes>
			</ThemeProvider>
		</div>
	);
}

export default App;
