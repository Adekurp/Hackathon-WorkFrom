import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Profile from './pages/profile';
import About from './pages/about';
import Home from './pages/home';
import SignIn from './pages/signIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/sign-up" element={<SignUp />}/>
    <Route path="/about" element={<About />}/>
    <Route  element={<PrivateRoute />}>
      <Route path="/profile" element={<Profile />}/>
    </Route>
  </Routes>
  </BrowserRouter>;
}
