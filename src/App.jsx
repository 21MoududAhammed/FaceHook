import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App(){
    return (
        <Routes>
          <Route path="/" element={<HomePage/>} exact/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/me" element={<ProfilePage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
}