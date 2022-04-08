import { Switch, Route } from "react-router-dom";
import MyChellenges from "../Content/MyChallenges";

const DashboardRouting = () => (
  <Switch>
    <Route exact path="/joueur/dashboard/mesdefis" component={MyChellenges} />
  </Switch>
);

export default DashboardRouting;
