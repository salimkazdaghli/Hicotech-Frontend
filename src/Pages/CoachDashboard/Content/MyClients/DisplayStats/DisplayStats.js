import { Divider } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import authService from "../../../../../Services/authService";
import { getObjectiveByCoachAndPlayerApi } from "../../../../../Services/objectiveService";
import StatisticObjective from "./StatisticObjective";
import SkillObjective from "./SkillObjective";

const DisplayStats = ({ player, setAlert }) => {
  const [objectiveData, setObjectiveData] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    getObjectiveByCoachAndPlayerApi({
      creactedBy: authService.getCurrentUser().id,
      player: player._id,
    }).then(({ data }) => {
      setObjectiveData(data);
    });
  }, [rerender]);
  return (
    <>
      <Divider orientation="center">
        <Title level={4}> Les Statistiques à atteindre</Title>
      </Divider>
      <StatisticObjective
        objectiveData={objectiveData}
        setObjectiveData={setObjectiveData}
        setAlert={setAlert}
        player={player}
        setRerender={setRerender}
        rerender={rerender}
      />

      <Divider orientation="center">
        <Title level={4}> Les Compétences à atteindre</Title>
      </Divider>
      <SkillObjective
        objectiveData={objectiveData}
        setObjectiveData={setObjectiveData}
        setAlert={setAlert}
        player={player}
        setRerender={setRerender}
        rerender={rerender}
      />
    </>
  );
};
export default DisplayStats;
