import './App.css';
import PhotoUpload from './pages/PhotoUpload';
import CreateAccountForm from "./pages/CreateAccount.jsx";
import SignInForm from "./pages/SignIn.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Status from './pages/Status.jsx';
import Preferences from './pages/Preferences';
import Navbar from './components/Navbar.jsx';
import Settings from './pages/settings.jsx';

function App() {
    const location = useLocation();
    return (
        <div>
            {location.pathname !== '/signin' && location.pathname !== '/' && <Navbar />}
            <Routes>
                <Route path="/" element={<SignInForm />} />
                <Route path="/create" element={<CreateAccountForm />} />
                <Route path="/preferences" element={<Preferences />} />
                <Route path="/status" element={<Status />} />
                <Route path="/ticket" element={<PhotoUpload />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </div>
    );
}

export default App;