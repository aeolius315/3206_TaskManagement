import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { CreateTask } from './pages/createTask';
import { Navbar } from './components/navbar';
import { AddedTasks } from './pages/addedTasks';
import PrivateRoutes from './hooks/PrivateRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/added" element={<AddedTasks />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
