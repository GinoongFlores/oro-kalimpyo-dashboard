import React from "react";
import { useState } from "react";
import { db } from "../firebase";
import { useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";

const useFetch = (queryName) => {
    const [data, setData] = useState([]);

    // Read data from firebase database
    const q = query(collection(db, queryName));

    let unsubscribe;
    const getData = async () => {
        unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            setData(data);
        });
    };
    useEffect(() => {
        getData();
        return () => {
            unsubscribe();
        };
    }, []);

    return { data };
};

export default useFetch;
