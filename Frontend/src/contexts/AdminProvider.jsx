import { createContext, useContext, useReducer } from "react";

const AdminStateContext = createContext();
const AdminDispatchContext = createContext();

const initialState = {
  isLoading: false,
  errors: { fetch: "" },
  questions: [],
  users: [],
  editQuestion: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "admin/fetching":
      return { ...initialState, isLoading: true };
    case "question/fetched":
      return { ...state, isLoading: false, questions: action.payload };
    case "user/fetched":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case "admin/error":
      return {
        ...state,
        isLoading: false,
        errors: {
          ...state.errors,
          fetch: "There was a error while fetching the data",
        },
      };
    case "admin/editing":
      return { ...state, editQuestion: action.payload };

    case "admin/reset":
      return initialState;
    default:
      alert("Invalid Request.");
  }
}

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AdminStateContext.Provider value={state}>
      <AdminDispatchContext.Provider value={dispatch}>
        {children}
      </AdminDispatchContext.Provider>
    </AdminStateContext.Provider>
  );
}

export function useAdminState() {
  const context = useContext(AdminStateContext);

  if (context === undefined) {
    throw new Error(
      "AdminStateContext was used outside the AdminStateProvider."
    );
  }

  return context;
}

export function useAdminDispatch() {
  const context = useContext(AdminDispatchContext);

  if (context === undefined) {
    throw new Error(
      "AdminDispatchContext was used outside the AdminDispatchProvider."
    );
  }

  return context;
}
