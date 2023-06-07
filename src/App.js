import "./App.css";
import MainPage from "./page/MainPage";
import { Routes, Route } from "react-router-dom";
import SignUp from "./page/auth/SignUp";
import Login from "./page/auth/Login";
import LoanSuccess from "./page/loan/LoanSuccess";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/hows/*" element={<MainPage />}></Route>
        <Route path="/hows/auth/*" element={<SignUp />} />
        <Route
          path="/hows/loan/detail/consult/success"
          element={<LoanSuccess />}
        />
      </Routes>
    </div>
  );
}

export default App;
