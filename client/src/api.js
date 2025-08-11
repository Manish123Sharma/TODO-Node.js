import axios from "axios";

// Create axios instance
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Middleware: Attach token to every request if it exists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token"); // token from login/signup
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// -------------------- AUTH --------------------
export const signup = (formData) => API.post("/auth/signup", formData);
export const login = (formData) => API.post("/auth/login", formData);

// -------------------- TODOS --------------------
export const fetchTodos = () => API.get("/todos");
export const createTodo = (data) => API.post("/todos", data);
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
