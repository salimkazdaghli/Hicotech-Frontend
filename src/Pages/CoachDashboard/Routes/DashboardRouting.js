import { Switch, Route } from "react-router-dom";
import AccueilPage from "../Content/Accueil";
import GererDefi from "../Content/GererDefi";
import ManageTrainingGround from "../Content/ManageTrainingGround";
import Invitations from "../../Invitation/Invitations";
import Programmes from "../programme/Programmes";
import Players from "../Content/Players";
import SelectDiscipline from "../Content/SelectDiscipline";
import CoachRoute from "../../../Routes/coachRoute";
import MySkills from "../Content/MySkills/MySkills";
import MyStatistic from "../Content/MyStatistics/MyStatistic";
import Profile from "../Content/Profile";
import ModifyPlayer from "../Content/MyClients/UpdatePlayer/ModifyPlayer";
import DisplayPlayers from "../Content/MyClients/UpdatePlayer/DisplayPlayers";
import PayMembership from "../Content/PayMembership/PayMembership";

const DashboardRouting = () => (
  <Switch>
    <Route exact path="/dashboard/accueil" component={AccueilPage} />
    <Route exact path="/dashboard/profile" component={GererDefi} />
    <Route
      exact
      path="/dashboard/gerer/lieuEntrainement"
      component={ManageTrainingGround}
    />
    <Route exact path="/dashboard/profile" component={Profile} />
    <Route exact path="/dashboard/invitations" component={Invitations} />
    <Route exact path="/dashboard/programmes" component={Programmes} />
    <Route exact path="/dashboard/players" component={Players} />
    <CoachRoute
      exact
      path="/dashboard/select/discipline"
      component={SelectDiscipline}
    />
    <CoachRoute exact path="/dashboard/invitations" component={Invitations} />
    <Route exact path="/dashboard/myskills" component={MySkills} />
    <Route exact path="/dashboard/profile" component={Profile} />
    <Route exact path="/dashboard/mystatisitcs" component={MyStatistic} />
    <CoachRoute exact path="/dashboard/modifier" component={DisplayPlayers} />
    <CoachRoute
      exact
      path="/dashboard/payer-abonnement"
      component={PayMembership}
    />
    <CoachRoute
      exact
      path="/dashboard/modifier/profileJoueur"
      component={ModifyPlayer}
    />
  </Switch>
);

export default DashboardRouting;
