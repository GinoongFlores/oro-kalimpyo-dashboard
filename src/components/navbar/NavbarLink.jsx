import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../../context/UserAuthContext";
import { useState, useEffect } from "react";
import { Collapse, Dropdown, Ripple, initTE } from "tw-elements";

const NavbarLink = () => {
	const { logout } = useAuth();
	const Links = [
		{
			name: "Home",
			path: "/",
		},
		{
			name: "Users",
			path: "/users",
		},
		{
			name: "Collectors",
			path: "/collectors",
		},
		{
			name: "Consolidators",
			path: "/consolidators",
		},
	];
	const dropDownLinks = [
		{
			name: "CLENRO Admin",
			path: "/clenro-admin",
		},
		{
			name: "Barangay Admin",
			path: "/barangay-admin",
		},
		{
			name: "Exit",
			path: "/login",
			isExit: true,
		},
	];
	useEffect(() => {
		initTE({ Collapse, Dropdown, Ripple });
	});

	return (
		<>
			<nav
				className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"
				data-te-navbar-ref
			>
				<div className="flex w-full flex-wrap items-center justify-between px-3">
					<div className="ml-2">
						<a
							className="text-xl text-neutral-800 dark:text-neutral-200"
							href="#"
						>
							CLENRO Dashboard
						</a>
					</div>

					<button
						className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
						type="button"
						data-te-collapse-init
						data-te-target="#navbarSupportedContent2"
						aria-controls="navbarSupportedContent2"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="[&>svg]:w-7">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="h-7 w-7"
							>
								<path
									fillRule="evenodd"
									d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
									clipRule="evenodd"
								/>
							</svg>
						</span>
					</button>

					<div
						className="!visible hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
						id="navbarSupportedContent2"
						data-te-collapse-item
					>
						<ul
							className="list-style-none ml-auto flex flex-col pl-0 lg:mt-1 lg:flex-row"
							data-te-navbar-nav-ref
						>
							{Links.map((link) => {
								return (
									<li
										className="my-2 pl-2 lg:my-0 lg:px-1"
										data-te-nav-item-ref
										key={link.name}
									>
										<NavLink
											to={link.path}
											className={({ isActive }) => {
												return (
													"px-3 py-2 rounded-md font-medium navLinks " +
													(!isActive
														? " hover:bg-success-600 text-gray-300 hover:text-white"
														: "bg-success-600 text-white")
												);
											}}
										>
											{link.name}
										</NavLink>
									</li>
								);
							})}
							{/* dropdown */}
							<div className="relative w-[180px]" data-te-dropdown-ref>
								<button
									className="flex items-center whitespace-nowrap rounded bg-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-dark shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-white-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-white-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-white-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
									href="#"
									type="button"
									id="dropdownMenuButton1"
									data-te-dropdown-toggle-ref
									aria-expanded="false"
									data-te-ripple-init
									data-te-ripple-color="light"
								>
									Admins & Exit
									<span className="ml-2 w-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											className="h-5 w-5"
										>
											<path
												fillRule="evenodd"
												d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
								</button>
								<ul
									className="absolute z-[1000] float-left m-0 p-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block my-1"
									aria-labelledby="dropdownMenuButton1"
									data-te-dropdown-menu-ref
								>
									{dropDownLinks.map((link) => {
										return (
											<li key={link.name}>
												<NavLink
													to={link.path}
													onClick={link.isExit ? () => logout() : null}
													className={({ isActive }) => {
														return (
															"flex items-center whitespace-nowrap rounded px-6 pb-2 pt-2.5 my-1 text-xs font-medium uppercase leading-normal " +
															(!isActive
																? "hover:bg-success-600 text-dark navLinks"
																: "bg-success-600 text-white")
														);
													}}
												>
													{link.name}
												</NavLink>
											</li>
										);
									})}
								</ul>
							</div>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default NavbarLink;
