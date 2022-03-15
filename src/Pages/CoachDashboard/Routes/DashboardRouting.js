import { Switch, Route } from "react-router-dom";
import AccueilPage from "../Content/Accueil";
import ProfilePage from "../Content/Profile";
import Invitations from "../../Invitation/Invitations";


const DashboardRouting = () => (
  <Switch>
    <Route exact path="/dashboard/accueil" component={AccueilPage} />
    <Route exact path="/dashboard/profile" component={ProfilePage} />
    <Route exact path="/dashboard/invitations" component={Invitations} />
  </Switch>
);

export default DashboardRouting;
