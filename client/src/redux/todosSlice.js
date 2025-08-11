import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get todos
export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.get("http://localhost:5000/api/todos", {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to fetch todos");
        }
    }
);

// Add todo
export const addTodo = createAsyncThunk(
    "todos/addTodo",
    async (text, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.post(
                "http://localhost:5000/api/todos",
                { text },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to add todo");
        }
    }
);

// Update todo
export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async ({ id, completed }, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.put(
                `http://localhost:5000/api/todos/${id}`,
                { completed },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to update todo");
        }
    }
);

// Delete todo
export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            await axios.delete(`http://localhost:5000/api/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Failed to delete todo");
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
