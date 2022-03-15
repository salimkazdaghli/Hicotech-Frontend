import "./App.css";
import "antd/dist/antd.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./Pages/Login";
import LogoutPage from "./Pages/Logout";
import RegisterPage from "./Pages/Register";
import Dashboard from "./Pages/CoachDashboard";
import CoachRoute from "./Routes/coachRoute";
import NotFound from "./Pages/Error/notFound";
import Invitation from "./Pages/Invitation";

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <CoachRoute path="/dashboard" component={Dashboard} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/invitation/:id" component={Invitation} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/invitation/:id" component={Invitation} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  </Router>
);

export default App;
