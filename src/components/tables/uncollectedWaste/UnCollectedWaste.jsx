import React from "react";

import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

// Firebase
import { db } from "../../../firebase";

// Firebase auth
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

// Table Columns
import { userColumn } from "./UserColumn";

import {
	collection,
	onSnapshot,
	query,
	doc,
	getDocs,
	getDoc,
} from "firebase/firestore";

const UnCollectedWaste = () => {
	return <div>UnCollectedWaste</div>;
};

export default UnCollectedWaste;
