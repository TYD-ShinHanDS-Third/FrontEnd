import "./App.css";
import MainPage from "./page/MainPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/hows/*" element={<MainPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
