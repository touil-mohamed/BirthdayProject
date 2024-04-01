import { useReducer } from "react";
import { createContext } from "react";
import { initialState, reducer } from "./reducer/reducer";
import PropTypes from 'prop-types';


const CountContext = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <CountContext.Provider value={[state, dispatch]}>
      {children}
    </CountContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node // Validation de children en tant que nœud React
};

export { CountContext, Provider };
