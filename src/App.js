import "./App.css";
import MainPage from "./page/MainPage";
import { Routes, Route } from "react-router-dom";
import SignUp from "./page/auth/SignUp";
import Login from "./page/auth/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/hows/*" element={<MainPage />}></Route>
        <Route path="/hows/auth/*" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
