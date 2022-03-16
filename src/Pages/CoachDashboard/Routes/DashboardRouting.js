import { Switch, Route } from "react-router-dom";
import AccueilPage from "../Content/Accueil";
import GererDefi from "../Content/GererDefi";
import ManageTrainingGround from "../Content/ManageTrainingGround";
import ProfilePage from "../Content/Profile";
import Invitations from "../../Invitation/Invitations";
import MyStatistic from "../Content/MyStatistics/MyStatistic";

const DashboardRouting = () => (
  <Switch>
    <Route exact path="/dashboard/accueil" component={AccueilPage} />
    <Route exact path="/dashboard/mystatisitcs" component={MyStatistic} />
  </Switch>
);

export default DashboardRouting;
