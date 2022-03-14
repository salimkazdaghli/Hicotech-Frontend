import { Switch, Route } from "react-router-dom";
import AccueilPage from "../Content/Accueil";
import ProfilePage from "../Content/Profile";

const DashboardRouting = () => (
  <Switch>
    <Route exact path="/dashboard/accueil" component={AccueilPage} />
    <Route exact path="/dashboard/profile" component={ProfilePage} />
  </Switch>
);

export default DashboardRouting;
