import {Link} from "react-router-dom"
import "./Navigation.css"
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"

const Navigation = ()=>{
  const [cookie, setCookie] = useCookies(["access_token"]);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() =>{
    const username = window.localStorage.getItem("username");
    setUser(username);
  }, []);

  const Logout = () =>{
    setCookie("access_token", null);
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("username");
    navigate("/login");
  }

  return (
    <nav>
        <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/find-events">Find Events</Link>
            </li>
            {window.localStorage.getItem("username") == "admin" ?(
              <>
                <li><Link to="/create-event" className="AdminButton">Create Event</Link></li>
                <li><Link to="/delete-event" className="AdminButton">Delete Event</Link></li>
              </>
              ):(
                <></>
              )}
            {!cookie.access_token ? (
                <ul className="login-register">
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              ):(
                <ul className="login-register">
                  <li><Link to="/my-purchased-events/"> <p className="userid">User: {user}</p></Link></li>
                  <button className="btn" onClick={Logout}>Logout</button>
                </ul>
                
              )
            }
        </ul>
    </nav>
  )
}
export default Navigation;
