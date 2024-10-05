import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PhotoUpload from './pages/PhotoUpload'
import CreateAccountForm from "./pages/CreateAccount.jsx";
import SignInForm from "./pages/SignIn.jsx";
import {Route, Routes} from "react-router-dom";
import ParkingSchedule from './pages/Status.jsx'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<SignInForm />} />
                <Route path="/create" element={<CreateAccountForm />} />
                <Route path="/status" element={<ParkingSchedule />} />
                <Route path="/ticket" element={<PhotoUpload />} />
            </Routes>
        </>

    );
}

export default App
