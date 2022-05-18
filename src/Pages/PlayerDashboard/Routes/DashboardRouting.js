import { Switch } from "react-router-dom";
import Seances from "../Content/MySeance/Seances";
import MyChellenges from "../Content/MyChallenges";
import JoueurRoute from "../../../Routes/joueurRoute";
import ModifyProfile from "../Content/MyProfile/ModifyProfile";

const DashboardRouting = () => (
  <Switch>
    <JoueurRoute
      exact
      path="/joueur/dashboard/mesdefis"
      component={MyChellenges}
    />
    <JoueurRoute exact path="/joueur/dashboard/seances" component={Seances} />
    <JoueurRoute
      exact
      path="/joueur/dashboard/modifierProfile"
      component={ModifyProfile}
    />
  </Switch>
);

export default DashboardRouting;
