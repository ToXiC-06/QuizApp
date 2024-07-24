import { createContext, useContext, useReducer } from "react";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const initialState = {
  isLoading: false,
  errors: { email: "", password: "" },
};

function reducer(state, action) {
  switch (action.type) {
    case "auth/reset":
      return initialState;
    case "auth/fetched":
      return { ...state, isLoading: false };
    case "auth/fetching":
      return { isLoading: true, errors: { email: "", password: "" } };
    case "auth/emailError":
      return { ...state, errors: { ...state.errors, email: action.payload } };
    case "auth/passwordError":
      return {
        ...state,
        errors: { ...state.errors, password: action.payload },
      };
    default:
      alert("Invalid Request.");
  }
}

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export function useAuthState() {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error("AuthStateContext was used outside the AuthStateProvider.");
  }

  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error(
      "AuthDispatchContext was used outside the AuthDispatchProvider."
    );
  }

  return context;
}
