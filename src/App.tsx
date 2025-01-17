import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import { ThemeProvider } from "./components/ThemeContext";


function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:userId" element={<UserDetail />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
