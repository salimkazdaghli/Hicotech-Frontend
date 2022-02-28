import { BrowserRouter as Switch, Route } from "react-router-dom";
import AccueilPage from "../Content/Accueil";
import Profile from "../Content/Profile";

const DashboardRouting = () => (
  <Switch>
    <Route exact path="/dashboard/accueil" component={AccueilPage} />
    <Route exact path="/dashboard/profile" component={Profile} />
  </Switch>
);

export default DashboardRouting;
