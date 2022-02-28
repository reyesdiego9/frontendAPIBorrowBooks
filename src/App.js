import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Customer } from "./pages/customer";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/customer" element={<Customer />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
