import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import SignInForm from "./pages/SignIn.jsx";
import CreateAccountForm from "./pages/CreateAccount.jsx";
import Status from './pages/Status.jsx';
import PhotoUpload from './pages/PhotoUpload';
import { run } from './db.jsx';

function App() {
  useEffect(() => {
    run();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/create" element={<CreateAccountForm />} />
        <Route path="/status" element={<Status />} />
        <Route path="/ticket" element={<PhotoUpload />} />
      </Routes>
    </>
  );
}

export default App;