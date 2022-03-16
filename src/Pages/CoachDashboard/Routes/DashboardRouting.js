import { Switch, Route } from "react-router-dom";
import AccueilPage from "../Content/Accueil";
import GererDefi from "../Content/GererDefi";
import ManageTrainingGround from "../Content/ManageTrainingGround";
import ProfilePage from "../Content/Profile";
import Invitations from "../../Invitation/Invitations";
import MySkills from "../Content/MySkills/MySkills";
import MyStatistic from "../Content/MyStatistics/MyStatistic";

const DashboardRouting = () => (
  <Switch>
    <Route exact path="/dashboard/accueil" component={AccueilPage} />
    <Route exact path="/dashboard/mystatisitcs" component={MyStatistic} />
    <Route exact path="/dashboard/myskills" component={MySkills} />
    <Route exact path="/dashboard/profile" component={ProfilePage} />
    <Route exact path="/dashboard/invitations" component={Invitations} />
    <Route
      exact
      path="/dashboard/gerer/lieuEntrainement"
      component={ManageTrainingGround}
    />
    <Route exact path="/dashboard/gerer/defi" component={GererDefi} />
  </Switch>
);

export default DashboardRouting;
