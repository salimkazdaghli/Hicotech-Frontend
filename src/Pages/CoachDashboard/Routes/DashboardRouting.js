import { Switch, Route } from "react-router-dom";
import AccueilPage from "../Content/Accueil";
import MyStatistic from "../Content/MyStatistics/MyStatistic";
import Profile from "../Content/Profile";

const DashboardRouting = () => (
  <Switch>
    <Route exact path="/dashboard/accueil" component={AccueilPage} />
    <Route exact path="/dashboard/profile" component={Profile} />
    <Route exact path="/dashboard/mystatisitcs" component={MyStatistic} />
  </Switch>
);

export default DashboardRouting;
