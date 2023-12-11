import React, { createContext, useReducer, useEffect } from "react";
import api from "~/services/apiService";
import { decryptUserId } from "~/utils/hashUserId";

const initialState = {
  userData: {},
  userId: localStorage.getItem("userId"),
  loading: false,
};

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        userId: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setUserData = (data) => {
    dispatch({ type: "SET_USER_DATA", payload: data });
  };

  const setUserId = (userId) => {
    dispatch({ type: "SET_USER_ID", payload: userId });
    localStorage.setItem("userId", userId);
  };

  const setLoading = (loading) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (state.userId) {
          setLoading(true);
          const decodeUserId = decryptUserId(
            state.userId,
            process.env.REACT_APP_SECRET_KEY_ENCODE
          );

          await api.get(`/user/info/${decodeUserId}`).then((response) => {
            setUserData(response.data.user);
            setLoading(false);
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [state.userId]);

  return (
    <AuthContext.Provider
      value={{
        userData: state.userData,
        setUserData,
        userId: state.userId,
        setUserId,
        logout,
        loading: state.loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
