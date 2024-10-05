import './App.css'
import CreateAccountForm from './pages/CreateAccount'
import SignInForm from "./pages/SignIn.jsx";
import Preferences from './pages/Preferences';
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<SignInForm />} />
                <Route path="/create" element={<CreateAccountForm />} />
                <Route path="/preferences" element={<Preferences />} />
            </Routes>
        </>

    );
}

export default App
