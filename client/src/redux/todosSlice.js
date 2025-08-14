import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:3000";

// Get todos
export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.get(`${API_URL}/api/todos`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch todos");
        }
    }
);

// Add todo
export const addTodo = createAsyncThunk(
    "todos/addTodo",
    async ({ title, dueDate }, { getState, rejectWithValue }) => {
        try {
            console.log('Title: ', title);
            console.log('Date: ', dueDate);
            const token = getState().auth.token;
            const res = await axios.post(
                `${API_URL}/api/todos`,
                { title, dueDate }, // ✅ send title
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to add todo");
        }
    }
);

// Update todo
export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async ({ id, title, completed, dueDate }, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.put(
                `${API_URL}/api/todos/${id}`,
                { ...(title !== undefined && { title }), ...(completed !== undefined && { completed }), ...(dueDate && { dueDate }) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to update todo");
        }
    }
);

// Delete todo
export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            await axios.delete(`${API_URL}/api/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to delete todo");
        }
    }
);

const todosSlice = createSlice({
    name: "todos",
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add
            .addCase(addTodo.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.items.findIndex((t) => t._id === action.payload._id);
                if (index !== -1) state.items[index] = action.payload;
            })
            // Delete
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.items = state.items.filter((t) => t._id !== action.payload);
            });
    }
});

export default todosSlice.reducer;
