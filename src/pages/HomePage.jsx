import Header from "../components/common/Header";
import useAuth from "../hooks/useAuth";
import {Link} from 'react-router-dom'

export default function HomePage(){
    const {auth} = useAuth();
    console.log(auth)
    return (
       <>
        <h1>Home Page</h1>
        <Link to='/me'>Profile</Link>
       </>
    );
}