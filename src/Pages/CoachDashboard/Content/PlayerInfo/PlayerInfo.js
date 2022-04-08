import React, { useState, useEffect } from "react";
import { Tabs, Form, Select, Empty } from "antd";
import { v4 as uuidv4 } from "uuid";
import Statistics from "./Statistics";
import Skills from "./Skills";
import Alerts from "./Alerts";
import { getUserApi } from "../../../../Services/userService";
import auth from "../../../../Services/authService";
import { getAllStatisticsApi } from "../../../../Services/StatisticService";

const { Option } = Select;
const { TabPane } = Tabs;

const sessionData = [
  {
    date: "2022-03-18T22:12:13.337Z",
    creactedBy: "624c7753abed050989505811",
    player: "624c7753abed050989505811",
    programme: "624c7753abed050989505811",
    statistics: [
      {
        statistic: {
          _id: "62350366ea1da8a92a87d64c",
          statisticName: "100m",
          statisticType: "compteur",
          unit: "ml/h",
          description:
            "Cette statistique permet de mesurer me test4 d'un joueur",
          lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
          max: true,
          nbreFois: 2,
          alerted: true,
          discipline: "6231bf886725280bf7288f05",
          createdAt: "2022-03-18T22:12:13.337Z",
          updatedAt: "2022-03-18T22:12:13.337Z",
          __v: 0,
        },
        value: 12,
      },
      {
        statistic: {
          _id: "6235046bea1da8a92a87d655",
          statisticName: "100m",
          statisticType: "compteur",
          unit: "ml/h",
          description:
            "Cette statistique permet de mesurer me test4 d'un joueur",
          lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
          max: true,
          nbreFois: 2,
          alerted: true,
          discipline: "6231bf886725280bf7288f05",
          createdAt: "2022-03-18T22:12:13.337Z",
          updatedAt: "2022-03-18T22:12:13.337Z",
          __v: 0,
        },
        value: 120,
      },
    ],
    skills: [
      {
        skill: {
          _id: "623503bdea1da8a92a87d64f",
          skillName: "jonglage",
          description: "test",
          lien: "https://www.google.com/",
          max: true,
          nbreFois: 5,

          alerted: true,
        },
        value: 5,
      },
    ],
    trainingGround: undefined,
    feedback: undefined,
  },
  {
    date: "2022-03-18T22:12:13.337Z",
    creactedBy: "624c7753abed050989505811",
    player: "624c7753abed050989505811",
    programme: "624c7753abed050989505811",
    statistics: [
      {
        statistic: {
          _id: "62350366ea1da8a92a87d64c",
          statisticName: "100m",
          statisticType: "compteur",
          unit: "ml/h",
          description:
            "Cette statistique permet de mesurer me test4 d'un joueur",
          lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
          max: true,
          nbreFois: 2,
          alerted: true,
          discipline: "6231bf886725280bf7288f05",
          createdAt: "2022-03-18T22:12:13.337Z",
          updatedAt: "2022-03-18T22:12:13.337Z",
          __v: 0,
        },
        value: 12,
      },
      {
        statistic: {
          _id: "6235046bea1da8a92a87d655",
          statisticName: "100m",
          statisticType: "compteur",
          unit: "ml/h",
          description:
            "Cette statistique permet de mesurer me test4 d'un joueur",
          lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
          max: true,
          nbreFois: 2,
          alerted: true,
          discipline: "6231bf886725280bf7288f05",
          createdAt: "2022-03-18T22:12:13.337Z",
          updatedAt: "2022-03-18T22:12:13.337Z",
          __v: 0,
        },
        value: 120,
      },
    ],
    skills: [
      {
        skill: {
          _id: "623503bdea1da8a92a87d64f",
          skillName: "jonglage",
          description: "test",
          lien: "https://www.google.com/",
          max: true,
          nbreFois: 5,

          alerted: true,
        },
        value: 5,
      },
    ],
    trainingGround: undefined,
    feedback: undefined,
  },
  {
    date: "2022-03-18T22:12:13.337Z",
    creactedBy: "624c7753abed050989505811",
    player: "624c7753abed050989505811",
    programme: "624c7753abed050989505811",

    skills: [
      {
        skill: {
          _id: "623503bdea1da8a92a87d614",
          skillName: "controle",
          description: "test",
          lien: "https://www.google.com/",
          max: true,
          nbreFois: 5,

          alerted: true,
        },
        value: 3,
      },
    ],
    trainingGround: undefined,
    feedback: undefined,
  },
];
const StatChartData = (arr = [], statId = "") =>
  arr
    .filter((session) => !!session?.statistics)
    .map((session) =>
      session.statistics
        .filter((el) => el.statistic._id === statId && el.value !== null)
        .map((el) => ({
          value: el.value,
          date: session.date.slice(0, 10),
        }))
    )
    .filter((arr) => arr.length)
    .reduce((flat, next) => flat.concat(next), []);
// const SkillsChartData = (arr = sessionData) =>
//   arr
//     .filter((session) => !!session.skills)
//     .map((session) =>
//       session.skills
//         .filter((skill) => skill.value !== null)
//         .map((el) => ({
//           name: el.skill.skillName,
//           value: el.value,
//         }))
//     )
//     .filter((arr) => arr.length)
//     .reduce((flat, next) => flat.concat(next), [])
//     .reduce((group, skill) => {
//       group[skill.name] = (group[skill.name] || 0) + age.age || 1;
//       return group;
//     }, {});
// console.log("SkillsChartData: ", SkillsChartData());

const PlayerInfo = () => {
  const [form] = Form.useForm();
  const [statisticTypes, setStatisticTypes] = useState([]);
  const [statisticData, setStatisticData] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(undefined);
  const [players, setPlayers] = useState([]);

  const FilterStats = (statId) => {
    const filtredData = StatChartData(sessionData, statId);
    setStatisticData(filtredData);
    // filter session data to get statistics
    // setStatisticData(statData)
  };

  useEffect(() => {
    // fetch statistics and skills and alerts from session (using coach and player ids)
    if (selectedPlayer) {
      if (auth.getCurrentUser()) {
        getAllStatisticsApi(auth.getCurrentUser().discipline)
          .then(({ data }) => {
            setStatisticTypes(data.statistic);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [selectedPlayer]);

  useEffect(() => {
    // fetch statistics and skills and alerts from session (using coach and player ids)
    if (auth.getCurrentUser()) {
      getUserApi(auth.getCurrentUser().id)
        .then(({ data: { myPlayers } }) => {
          console.log("myPlayers: ", myPlayers);
          setPlayers(myPlayers);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onFinish = () => {};
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  return (
    <Form
      form={form}
      autoComplete="off"
      name="Afficher Info Joueur"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Tabs
        defaultActiveKey="1"
        tabBarExtraContent={
          <Form.Item
            style={{ margin: 0 }}
            name="player"
            label="Sélectionnez joueur :"
            rules={[
              {
                required: true,
                message: "Veuiller selectionner le joueur",
              },
            ]}
          >
            <Select placeholder="Joueur" onChange={(p) => setSelectedPlayer(p)}>
              {players.map((p) => (
                <Option key={uuidv4()} value={p._id}>
                  {`${p.firstName} ${p.lastName}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
        }
      >
        <TabPane tab="Statistiques" key="1">
          {selectedPlayer ? (
            <>
              <Form.Item
                style={{ maxWidth: "20%" }}
                name="Statistic"
                label="Statistique :"
                rules={[
                  {
                    required: true,
                    message: "Veuiller selectionner une statistique",
                  },
                ]}
              >
                <Select placeholder="Statestique" onChange={FilterStats}>
                  {statisticTypes.map((stat) => (
                    <Option key={uuidv4()} value={stat._id}>
                      {stat.statisticName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Statistics data={statisticData} />
            </>
          ) : (
            <Empty description="Aucune Donnée" />
          )}
        </TabPane>
        <TabPane tab="Compétences" key="2">
          {selectedPlayer ? <Skills /> : <Empty description="Aucune Donnée" />}
        </TabPane>
        <TabPane tab="Alerts" key="3">
          {selectedPlayer ? <Alerts /> : <Empty description="Aucune Donnée" />}
        </TabPane>
      </Tabs>
    </Form>
  );
};

export default PlayerInfo;
