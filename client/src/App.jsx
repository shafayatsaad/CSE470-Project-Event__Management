import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "./App.css"
import Navigation from './components/Navigation/Navigation'
import Registration from './pages/Register/Register'
import Login from './pages/Login/Login'
import FindEvents from './pages/FilterEvents/FilterEvents'
import Home from './pages/EventList/EventList'
import CreateEvent from './pages/createEvent/CreateEvent'
import DeleteEvent from './pages/Delete Event/DeleteEvent'
import SuccessPage from './pages/PaymentPage/Success'
import UserPage from './pages/UserPage/UserPage'

function App() {

  const mainuser = window.localStorage.getItem("username");
  return (
    <>
    <div>
      <Router>
        <div className="Nav">
          <Navigation />
        </div>
        <div className="Website">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/find-events" element={<FindEvents />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/delete-event" element={<DeleteEvent />} />
            <Route path="/success-payment" element={<SuccessPage />} />
            <Route path="/my-purchased-events/" element={<UserPage />} />
          </Routes>
        </div>
      </Router>
    </div>
    </>
  )
}

export default App