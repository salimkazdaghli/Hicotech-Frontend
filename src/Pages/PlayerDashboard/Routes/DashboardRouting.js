import { Switch } from "react-router-dom";
import MyChellenges from "../Content/MyChallenges";
import JoueurRoute from "../../../Routes/joueurRoute";
import Seances from "../Content/MySeance/Seances";

const DashboardRouting = () => (
  <Switch>
    <JoueurRoute
      exact
      path="/joueur/dashboard/mesdefis"
      component={MyChellenges}
    />
    <JoueurRoute exact path="/joueur/dashboard/seances" component={Seances} />
  </Switch>
);

export default DashboardRouting;
