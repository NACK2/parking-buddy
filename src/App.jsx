import './App.css'
import PhotoUpload from './pages/PhotoUpload'
import CreateAccountForm from "./pages/CreateAccount.jsx";
import SignInForm from "./pages/SignIn.jsx";
import {Route, Routes} from "react-router-dom";
import Status from './pages/Status.jsx';
import Preferences from './pages/Preferences';
import Navbar from './components/Navbar.jsx'

function App() {
    return (
        <>
            <div>
                <Navbar />
            </div>
            <Routes>
                <Route path="/" element={<SignInForm />} />
                <Route path="/create" element={<CreateAccountForm />} />
                <Route path="/preferences" element={<Preferences />} />
                <Route path="/status" element={<Status />} />
                <Route path="/ticket" element={<PhotoUpload />} />
            </Routes>
        </>

    );
}

export default App
