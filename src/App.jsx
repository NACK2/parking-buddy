import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateAccountForm from "./CreateAccount.jsx";
import SignInForm from "./SignIn.jsx";
import {Route, Routes} from "react-router-dom";
import Status from './status.jsx';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<SignInForm />} />
                <Route path="/create" element={<CreateAccountForm />} />
                <Route path="/status" element={<Status />} />
            </Routes>
        </>

    );
}

export default App
