import { useReducer } from "react";
import { createContext } from "react";
import { initialState, reducer } from "./reducer/reducer";

const CountContext = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CountContext.Provider value={[state, dispatch]}>
      {children}
    </CountContext.Provider>
  );
};

export { CountContext, Provider };
