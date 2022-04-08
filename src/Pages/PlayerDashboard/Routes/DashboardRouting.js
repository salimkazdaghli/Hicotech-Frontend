import { Switch } from "react-router-dom";
import MyChellenges from "../Content/MyChallenges";
import JoueurRoute from "../../../Routes/joueurRoute";

const DashboardRouting = () => (
  <Switch>
    <JoueurRoute
      exact
      path="/joueur/dashboard/mesdefis"
      component={MyChellenges}
    />
  </Switch>
);

export default DashboardRouting;
