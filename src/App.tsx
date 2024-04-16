import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/auth/Auth';
import Main from './pages/main/main';
import 'leaflet/dist/leaflet.css';
import { useAuthStore } from './store/auth/auth';


function App() {

    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    {isAuthenticated ? (
                        <>
                            <Route path="/main" element={<Main/>} />
                        </>
                    ) : (
                        <Route path="*" element={<Navigate to="/" replace />} />
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
