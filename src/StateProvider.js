//prepares the datalayer for uploading our components to it 
//then will fetch those components to the basket by clicking on 
//add to basket button 


//prepares the datalayer
import React, {createContext, useContext, useReducer} from "react";


//wrap our app and provide the datalayer
export const StateContext = createContext(); 

export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value = {useReducer(reducer, initialState)}>
    {children}
    </StateContext.Provider>
);
//pull info from datalayer
export const useStateValue = () => useContext(StateContext);