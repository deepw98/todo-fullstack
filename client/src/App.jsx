import './App.css'
import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import SignupForm from './components/SignupForm'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {


  return (
    <>
      <BrowserRouter>
        <div className='App'>
          <Navbar/>
          <Routes>
            <Route path="/" element={<SignupForm/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/homepage" element={<Homepage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
