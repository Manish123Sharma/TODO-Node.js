import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:3000";

// Login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            localStorage.setItem("token", res.data.token);
            alert('Login Successful');
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Login failed");
        }
    }
);

// Signup
export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/register`, {
                firstName,
                lastName,
                email,
                password
            });
            localStorage.setItem("token", res.data.token);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Signup failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || null,
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Signup
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
