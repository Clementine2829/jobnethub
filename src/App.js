import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import JobListing from "./components/JobListing/JobListing";
import ViewJob from "./components/ViewJob/ViewJob";
import Signup from "./components/Signup/Signup";
import PostJob from "./components/PostJob/PostJob";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ViewProfile from "./components/ViewProfile/ViewProfile";
import MyJobApplications from "./components/MyJobApplications/MyJobApplications";
import UpdateProfile from "./components/UpdaeProfile/UpdateProfile";
import ChangePassword from "./components/ChangePassword/ChangePassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/listing" element={<JobListing />} />
        <Route path="/jobs" element={<JobListing />} />
        <Route path="/jobs/:job" element={<ViewJob />} />
        <Route path="/jobs/update" element={<PostJob />} />
        <Route path="/jobs/update/:job" element={<PostJob />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/job-applications" element={<MyJobApplications />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
