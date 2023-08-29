import "./index.css";

// Packages
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
	typography: {
		fontFamily: "Poppins",
	},
});

// Pages testclenroadmin@gmail.com
import Home from "./pages/home/Home";
import ListUser from "./pages/users/ListUser";
import ListCollector from "./pages/collector/ListCollector";
import ListConsolidator from "./pages/consolidator/ListConsolidator";
import ListBarangayAdmin from "./pages/barangaysAdmin/ListBarangayAdmin";
import AddUser from "./components/modals/addUser/AddUser";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { useAuth } from "./context/UserAuthContext";

function App() {
	const { currentUser } = useAuth();
	// console.log(user);
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
					<Route path="/">
						<Route path="login" element={<Login />} />
						<Route path="signup" element={<SignUp />} />
						<Route
							index
							// path="home"
							element={
								<RequireAuth>
									<Home />
								</RequireAuth>
							}
						/>
						{/* <Route path="home" element={<Home />} /> */}
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
							path="barangay-admin"
							element={
								<RequireAuth>
									<ListBarangayAdmin />
								</RequireAuth>
							}
						/>
						<Route
							path="add"
							element={
								<RequireAuth>
									<AddUser />
								</RequireAuth>
							}
						/>
					</Route>
				</Routes>
			</ThemeProvider>
		</div>
	);
}

export default App;
