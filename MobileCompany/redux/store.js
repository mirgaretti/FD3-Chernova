import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './clientSlice'; 
import { thunk } from 'redux-thunk'; 

export const store = configureStore({
    reducer: {
        clients: clientReducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), 
});
