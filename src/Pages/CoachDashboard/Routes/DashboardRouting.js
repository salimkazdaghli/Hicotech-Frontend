import { Switch, Route } from "react-router-dom";
import AccueilPage from "../Content/Accueil";
import GererDefi from "../Content/GererDefi";
import ManageTrainingGround from "../Content/ManageTrainingGround";
import ProfilePage from "../Content/Profile";
import Invitations from "../../Invitation/Invitations";
import Programmes from "../programme/Programmes";
import Players from "../Content/Players";

const DashboardRouting = () => (
  <Switch>
    <Route exact path="/dashboard/accueil" component={AccueilPage} />
    <Route exact path="/dashboard/profile" component={GererDefi} />
    <Route
      exact
      path="/dashboard/gerer/lieuEntrainement"
      component={ManageTrainingGround}
    />
    <Route exact path="/dashboard/profile" component={ProfilePage} />
    <Route exact path="/dashboard/invitations" component={Invitations} />
    <Route exact path="/dashboard/programmes" component={Programmes} />
    <Route exact path="/dashboard/players" component={Players} />
  </Switch>
);

export default DashboardRouting;
