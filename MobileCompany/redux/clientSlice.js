import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    error: null,
    isLoading: false
};

export const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        requestStarted: (state) => ({ ...state, isLoading: true }),
        requestFailed: (state, { payload }) => ({ ...state, isLoading: false, error: payload }),
        requestSucceeded: (state, { payload }) => ({ ...state, isLoading: false, data: payload }),
        addClient: (state, { payload }) => ({ ...state, data: [...state.data, payload] }),
        updateClient: (state, { payload }) => ({ ...state, data: state.data.map((client) => client.id === payload.id ? payload : client) }),
        removeClient: (state, { payload }) => ({ ...state, data: state.data.filter((client) => client.id !== payload) }),
    }
})

export const { requestStarted, requestFailed, requestSucceeded, addClient, updateClient, removeClient } = clientSlice.actions;

export default clientSlice.reducer;