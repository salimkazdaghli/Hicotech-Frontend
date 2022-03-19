import { Switch, Route } from "react-router-dom";
import AccueilPage from "../Content/Accueil";
import GererDefi from "../Content/GererDefi";
import ManageTrainingGround from "../Content/ManageTrainingGround";
import Invitations from "../../Invitation/Invitations";
import SelectDiscipline from "../Content/SelectDiscipline";
import CoachRoute from "../../../Routes/coachRoute";
import MySkills from "../Content/MySkills/MySkills";
import MyStatistic from "../Content/MyStatistics/MyStatistic";
import Profile from "../Content/Profile";

const DashboardRouting = () => (
  <Switch>
    <Route exact path="/dashboard/accueil" component={AccueilPage} />
    <Route exact path="/dashboard/profile" component={GererDefi} />
    <CoachRoute
      exact
      path="/dashboard/gerer/lieuEntrainement"
      component={ManageTrainingGround}
    />
    <CoachRoute
      exact
      path="/dashboard/select/discipline"
      component={SelectDiscipline}
    />
    <CoachRoute exact path="/dashboard/invitations" component={Invitations} />
    <Route exact path="/dashboard/myskills" component={MySkills} />
    <Route exact path="/dashboard/profile" component={Profile} />
    <Route exact path="/dashboard/mystatisitcs" component={MyStatistic} />
  </Switch>
);

export default DashboardRouting;
