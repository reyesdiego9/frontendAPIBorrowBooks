import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Customer } from "./pages/customer";
import { Author } from "./pages/authors";
import { Book } from "./pages/book";
import { AuthorsByBook } from "./pages/authorsByBook";
import { Reservation } from "./pages/reservation";
import "animate.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/books" element={<Book />}></Route>
          <Route exact path="/author" element={<Author />}></Route>
          <Route exact path="/customer" element={<Customer />}></Route>
          <Route
            exact
            path="/authorsByBook/:id"
            element={<AuthorsByBook />}
          ></Route>
          <Route exact path="/reservation" element={<Reservation />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
