import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import authReducer from "./authSLice";

const store = configureStore({
    reducer: {
        todos: todosReducer,
        auth: authReducer
    }
});

export default store;
