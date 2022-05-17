import React, { useState, useEffect } from "react";
import {
  Row,
  Button,
  Spin,
  Space,
  Col,
  DatePicker,
  Input,
  Select,
  Table,
} from "antd";
import moment from "moment";
import { getAllSeanceApi } from "../../../../Services/SeancesService";
import userService from "../../../../Services/userService";
import { getAllProgrammeApi } from "../../../../Services/ProgrammeService";
import SeanceForm from "./SeanceForm";
import authService from "../../../../Services/authService";

const { RangePicker } = DatePicker;
const { Option } = Select;
const Seances = () => {
  const [loading, setLoading] = useState(false);
  const [seances, setSeances] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [seanceSelected, setSeanceSelected] = useState({});
  const [playersData, setplayersData] = useState([]);
  const [programmes, setProgrammes] = useState([]);
  const [lieux, setLieux] = useState(["tunis", "Beja"]);
  const [joueurs, setJoueurs] = useState(["test1", "test2"]);
  const [dataSource, setDataSource] = useState(null);
  const currentUser = authService.getCurrentUser();

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const columns = [
    {
      title: "Nom séance",
      dataIndex: "seanceName",
      key: "seanceName",
    },
    {
      title: "Joueur",
      dataIndex: ["player", "email"],
    },
    {
      title: "Date",
      dataIndex: "dateSeance",
      key: "dateSeance",
    },
    {
      title: "Programme",
      dataIndex: ["programme", "title"],
      key: "programme",
    },
  ];

  const data2 = [
    {
      key: "1",
      name: "S1",
      joueur: "test2",
      competences: "compet 4",
      statistique: "stat 2",
      jour: "09/04/2022",
      lieu: "tunis",
      programme: "prog 2",
    },
    {
      key: "2",
      name: "S2",
      joueur: "test2",
      competences: "compet 4",
      statistique: "stat 2",
      jour: "29/04/2022",
      lieu: "tunis",
      programme: "prog 3",
    },
    {
      key: "3",
      name: "S3",
      joueur: "test2",
      competences: "compet 4",
      statistique: "stat 2",
      jour: "09/04/2022",
      lieu: "Beja",
      programme: "prog 2",
    },
    {
      key: "4",
      name: "S3",
      joueur: "test2",
      competences: "compet 4",
      statistique: "stat 2",
      jour: "10/04/2022",
      lieu: "Beja",
      programme: "prog 2",
    },
  ];

  const [data, setData] = useState(data2);
  const showModal = () => {
    setSeanceSelected({ _id: "0000" });
    setIsModalVisible(true);
  };

  async function getSeances() {
    await getAllSeanceApi({ creacteBy: currentUser.id })
      .then((response) => {
        setDataSource(response.data);
        setLoading(true);
      })
      .catch(() => {});
  }
  const onJoueurChange = (value) => {
    const dataChange = dataSource.filter(
      (seance) => seance.player.email === value
    );
    setData(dataChange);
  };
  const onProgrammeChange = (value) => {
    setLoading(true);
    const dataChange = dataSource.filter(
      (seance) => seance.programme.title === value
    );
    setData(dataChange);
  };

  const onDateNowChange = (value) => {
    const dataChange = data2.filter((seance) => seance.jour === value);
    setData(dataChange);
  };
  useEffect(() => {
    userService
      .getUserApi(authService.getCurrentUser().id)
      .then(({ data: { myPlayers } }) => {
        setplayersData(myPlayers);
      })
      .catch(() => {});
    getAllProgrammeApi({ creacteBy: currentUser.id })
      .then((response) => {
        setProgrammes(response.data);
      })
      .catch(() => {});
    getSeances();
  }, []);
  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button key={date} onClick={onDateNowChange}>
          {date}
        </Button>
        <Select
          showSearch
          onChange={onJoueurChange}
          placeholder="Filter par joueur "
        >
          {playersData.map((player) => (
            <Option key={player._id} value={player._id}>
              {`${player.email}`}
            </Option>
          ))}
        </Select>
        <Select
          showSearch
          onChange={onProgrammeChange}
          placeholder="Filter par programme "
        >
          {programmes.map((programme) => (
            <Option key={programme._id} value={programme._id}>
              {programme.title}
            </Option>
          ))}
        </Select>
      </Space>
      <Button type="primary" onClick={showModal} style={{ float: "right" }}>
        Nouvelle séance
      </Button>
      <div className="site-card-wrapper">
        {loading && (
          <Table
            tableLayout="fixed"
            columns={columns}
            dataSource={dataSource}
            pagination={{
              pageSize: 5,
            }}
          />
        )}
        {!loading && (
          <Row gutter={16}>
            <Col span={8}>
              <Space size="middle" style={{ marginTop: 250, marginLeft: 600 }}>
                <Spin size="large" tip="Loading..." />
              </Space>
            </Col>
          </Row>
        )}
      </div>
      {loading && (
        <SeanceForm
          key={seanceSelected._id}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          setSeances={setSeances}
          seances={seances}
          setLoading={setLoading}
          loading={loading}
          seanceSelected={seanceSelected}
        />
      )}
    </>
  );
};
export default Seances;
