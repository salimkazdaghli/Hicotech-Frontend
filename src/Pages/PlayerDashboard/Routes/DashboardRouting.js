import { Switch } from "react-router-dom";
import MyChellenges from "../Content/MyChallenges";
import JoueurRoute from "../../../Routes/joueurRoute";
import Seances from "../Content/MySeance/Seances";
import Events from "../Content/event/Events";

const DashboardRouting = () => (
  <Switch>
    <JoueurRoute
      exact
      path="/joueur/dashboard/mesdefis"
      component={MyChellenges}
    />
    <JoueurRoute exact path="/joueur/dashboard/seances" component={Seances} />
    <JoueurRoute exact path="/joueur/dashboard/mesevents" component={Events} />
  </Switch>
);

export default DashboardRouting;
