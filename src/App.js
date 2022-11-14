import Login from './components/authentication/Login';
import { Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';


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
      <div className="">
        <Routes>
          {!isloggedIn()?
            <Route path="/" element={<Login />} />: ''
          }
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} /> */}
        </Routes>
      </div>      </header>
    </div>
  );
}

export default App;
