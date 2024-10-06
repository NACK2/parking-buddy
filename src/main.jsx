// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { EmailProvider } from './EmailContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <EmailProvider>
                <App />
            </EmailProvider>
        </BrowserRouter>
    </React.StrictMode>
);