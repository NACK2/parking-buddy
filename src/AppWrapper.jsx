// AppWrapper.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { EmailProvider } from './EmailContext';

const AppWrapper = () => (
    <Router>
        <EmailProvider>
            <App />
        </EmailProvider>
    </Router>
);

export default AppWrapper;