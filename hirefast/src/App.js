import { Routes, Route } from "react-router-dom";
import "./App.css";
import Email from "./components/email";
import Error404 from "./components/error/404";
import Unauthorize from "./components/error/unauthorize";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import OwnerDashboard from "./components/dashboard/owner";
import Listing from "./components/job/components/listing";
import ProtectedPath from "./ProtectedPath";
import UnProtectedPath from "./UnProtectedPath";
import useAuth from "./hooks/useAuth";
import { ContextProvider } from "./context";
import JobDashBoard from "./components/job/components/jobdashboard";
import {
  JobOwnerTemplate,
  JobSeekerTemplate,
} from "./components/templates/template";
import SeekerDashboard from "./components/dashboard/seeker/center";
import SeekerProfile from "./components/dashboard/seeker/profile";
import SeekerJob from "./components/dashboard/seeker/job";
import SeekerJobPage from "./components/dashboard/seeker/job/jobpage";

function App() {
  const [status, setStatus] = useAuth();
  return (
    <ContextProvider value={{ state: status, setState: setStatus }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <UnProtectedPath>
              <Login />
            </UnProtectedPath>
          }
        />
        <Route
          path="/signup"
          element={
            <UnProtectedPath>
              <Register />
            </UnProtectedPath>
          }
        />
        <Route
          path="/email"
          element={
            <UnProtectedPath>
              <Email />
            </UnProtectedPath>
          }
        />
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedPath role={"0"}>
              <OwnerDashboard />
            </ProtectedPath>
          }
        />
        <Route
          path="/seeker/dashboard"
          element={
            <ProtectedPath role={"1"}>
              <JobSeekerTemplate current={0} rightIndicator={true}>
                <SeekerDashboard />
              </JobSeekerTemplate>
            </ProtectedPath>
          }
        />
        <Route
          path="/owner/joblist"
          element={
            <ProtectedPath role={"0"}>
              <JobOwnerTemplate current={1} rightIndicator={false}>
                <Listing />
              </JobOwnerTemplate>
            </ProtectedPath>
          }
        />
        <Route
          path="/owner/job/:id"
          element={
            <ProtectedPath role={"0"}>
              <JobOwnerTemplate current={0} rightIndicator={true}>
                <JobDashBoard />
              </JobOwnerTemplate>
            </ProtectedPath>
          }
        />
        <Route
          path="/owner/profile"
          element={
            <ProtectedPath role={"0"}>
              <Error404 />
            </ProtectedPath>
          }
        />
        <Route
          path="/seeker/profile"
          element={
            <ProtectedPath role={"1"}>
              <JobSeekerTemplate current={2} rightIndicator={true}>
                <SeekerProfile />
              </JobSeekerTemplate>
            </ProtectedPath>
          }
        />
        <Route
          path="/seeker/job/:id"
          element={
            <ProtectedPath role={"1"}>
              <JobOwnerTemplate current={1} rightIndicator={true}>
                <SeekerJobPage />
              </JobOwnerTemplate>
            </ProtectedPath>
          }
        />
        <Route
          path="/seeker/joblist"
          element={
            <ProtectedPath role={"1"}>
              <JobSeekerTemplate current={1} rightIndicator={true}>
                <SeekerJob />
              </JobSeekerTemplate>
            </ProtectedPath>
          }
        />
        <Route path="/unauthorize" element={<Unauthorize />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
