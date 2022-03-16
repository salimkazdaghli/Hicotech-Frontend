import { Switch, Route } from "react-router-dom";
import AccueilPage from "../Content/Accueil";
import GererDefi from "../Content/GererDefi";
import ManageTrainingGround from "../Content/ManageTrainingGround";
import Invitations from "../../Invitation/Invitations";
import SelectDiscipline from "../Content/SelectDiscipline";
import CoachRoute from "../../../Routes/coachRoute";

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
  </Switch>
);

export default DashboardRouting;
