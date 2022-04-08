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
import CoachDashboard from "./Pages/CoachDashboard";
import PlayerDashboard from "./Pages/PlayerDashboard";
import CoachRoute from "./Routes/coachRoute";
import NotFound from "./Pages/Error/notFound";
import Invitation from "./Pages/Invitation";
import JoueurRoute from "./Routes/joueurRoute";

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <CoachRoute path="/coach/dashboard/" component={CoachDashboard} />
        <JoueurRoute path="/joueur/dashboard/" component={PlayerDashboard} />
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
