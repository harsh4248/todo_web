import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import Landing from "./components/landing";
const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyD43q-BZA2qhlrsc0-401PfjsSK4XPQGrg",
    authDomain: "todo-web-e9131.firebaseapp.com",
    projectId: "todo-web-e9131",
    storageBucket: "todo-web-e9131.appspot.com",
    messagingSenderId: "130565600713",
    appId: "1:130565600713:web:00d9f807c5f02479bf6418",
    measurementId: "G-DGSN24YE65",
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const analytics = getAnalytics(app);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/landing" element={<Landing/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
