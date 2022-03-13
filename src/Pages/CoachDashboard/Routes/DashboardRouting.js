import { BrowserRouter as Switch, Route } from "react-router-dom";
import AccueilPage from "../Content/Accueil";
import Profile from "../Content/Profile";
import Invitations from "../../Invitation/Invitations";

const DashboardRouting = () => (
  <Switch>
    <Route exact path="/dashboard/accueil" component={AccueilPage} />
    <Route exact path="/dashboard/profile" component={Profile} />
    <Route exact path="/dashboard/invitations" component={Invitations} />
  </Switch>
);

export default DashboardRouting;
