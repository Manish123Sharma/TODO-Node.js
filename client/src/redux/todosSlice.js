// src/redux/todosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos"; // your backend endpoint

// Get todos for logged-in user
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
});

// Create task
export const createTodo = createAsyncThunk("todos/createTodo", async (todo, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await axios.post(API_URL, todo, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
});

// Update task
export const updateTodo = createAsyncThunk("todos/updateTodo", async ({ id, updates }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await axios.put(`${API_URL}/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
});

// Delete todo
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return id;
});

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.items.findIndex((todo) => todo._id === action.payload._id);
                if (index >= 0) state.items[index] = action.payload;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.items = state.items.filter((todo) => todo._id !== action.payload);
            });
    }
});

export default todosSlice.reducer;
