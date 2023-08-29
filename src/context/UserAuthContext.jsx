import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
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
    const unsubscribe = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          setCurrentUser(user);
          // ...
        } else {
          // User is signed out
          // ...
          setCurrentUser(null);
        }
      });
    };
    return unsubscribe();
  }, []);

  const UserLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in

          navigate("/");
          // ...
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const UserSignup = async (email, password) => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log(errorMessage);
          // ..
        });
    } catch (e) {
      console.log(e);
    }
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
    UserSignup,
    UserLogin,
    logout,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserAuthContext;
