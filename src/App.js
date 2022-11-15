import Login from './components/authentication/Login';
import Register from './components/authentication/Register'
import { Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Company from './components/company/Company';


function App() {
  const user = localStorage.getItem('user')
  const isloggedIn = () => {
    if (user && user.access){
      return true;
    }
    else {return false};

  }
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
      <div className="">
        <Routes>
            <Route path="/register" element={<Register />} />: ''
        </Routes>
        <Routes>
            <Route path="/login" element={<Login />} />: ''
        </Routes>
        <Routes>
            <Route path="/add-company" element={<Company />} />: ''
        </Routes>
      </div> 
      </header>
    </div>
  );
}

export default App;
