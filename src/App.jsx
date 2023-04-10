import "./style/overall.scss";

// Packages
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

// UserAuth
import { useAuth } from "./context/UserAuthContext";

// Pages
import Home from "./pages/home/Home";
import ListUser from "./pages/listUsers/ListUser";
import ListTBC from "./pages/listTBC/ListTBC";
import ListCompleted from "./pages/listCompleted/ListCompleted";
import ListBarangayAdmin from "./pages/listBarangayAdmin/ListBarangayAdmin";
import AddUser from "./components/modals/addUser/AddUser";
import Login from "./pages/login/Login";

function App() {
	const local = localStorage.getItem("user");
	const user = JSON.parse(local);

	// console.log(user);
	const RequireAuth = ({ children }) => {
		return user ? children : <Navigate to="/login" />;
	};

	return (
		<div className="App">
			<ToastContainer
				position="top-center"
				limit={3}
				draggablePercent={60}
				autoClose={3000}
			/>
			<Routes>
				<Route path="/">
					<Route path="login" element={<Login />} />
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
						path="tbc"
						element={
							<RequireAuth>
								<ListTBC />
							</RequireAuth>
						}
					/>
					<Route
						path="completed"
						element={
							<RequireAuth>
								<ListCompleted />
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
		</div>
	);
}

export default App;
