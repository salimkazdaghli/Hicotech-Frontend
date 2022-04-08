import { Switch, Route } from "react-router-dom";
import AccueilPage from "../Content/Accueil";
import ManageTrainingGround from "../Content/MyTrainingGrounds/ManageTrainingGround";
import Invitations from "../../Invitation/Invitations";
import SelectDiscipline from "../Content/SelectDiscipline";
import CoachRoute from "../../../Routes/coachRoute";
import MySkills from "../Content/MySkills/MySkills";
import MyStatistic from "../Content/MyStatistics/MyStatistic";
import PlayerInfo from "../Content/PlayerInfo/PlayerInfo";
import Programmes from "../programme/Programmes";
import Players from "../Content/Players";
import ShowChallenges from "../Content/ManageChallenges/ShowChallenges";

const DashboardRouting = () => (
  <Switch>
    <Route exact path="/coach/dashboard/accueil" component={AccueilPage} />
    <CoachRoute
      exact
      path="/coach/dashboard/gerer/lieuEntrainement"
      component={ManageTrainingGround}
    />
    <CoachRoute
      exact
      path="/coach/dashboard/select/discipline"
      component={SelectDiscipline}
    />
    <CoachRoute
      exact
      path="/coach/dashboard/invitations"
      component={Invitations}
    />
    <Route exact path="/coach/dashboard/myskills" component={MySkills} />
    <Route exact path="/coach/dashboard/mystatisitcs" component={MyStatistic} />
    <CoachRoute
      exact
      path="/coach/dashboard/player/info"
      component={PlayerInfo}
    />
    <Route exact path="/coach/dashboard/programmes" component={Programmes} />
    <Route exact path="/coach/dashboard/players" component={Players} />
    <Route exact path="/coach/dashboard/invitations" component={Invitations} />
    <Route
      exact
      path="/coach/dashboard/manageChallenge"
      component={ShowChallenges}
    />
  </Switch>
);

export default DashboardRouting;
