/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from "react";

// Create the context
const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

// Define the reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CANDIDATE":
      return { ...state, candidates: [...state.candidates, action.payload] };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Initial state
const initialState = {
  candidates: [],
};

// Create the provider
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

// Custom hooks for easier usage
export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
