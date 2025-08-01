import React from 'react'
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        // <Home />
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> */}
        </Routes>
    );
};

export default App
