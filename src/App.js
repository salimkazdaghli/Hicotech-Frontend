import "./App.css";
import "antd/dist/antd.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import Dashboard from "./Pages/CoachDashboard";
import Invitation from "./Pages/Invitation";

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/register" />
        </Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/invitation/:id" component={Invitation} />
      </Switch>
    </div>
  </Router>
);

export default App;
