import React, { useState, useEffect } from "react";
import { Row, Button } from "antd";
import { getAllProgrammeApi } from "../../../Services/ProgrammeService";
import ProgrammeCard from "./ProgrammeCard";
import ProgrammeForm from "./ProgrammeForm";
import authService from "../../../Services/authService";
import { getAllStatisticsApi } from "../../../Services/StatisticService";

const Programmes = () => {
  const [loading, setLoading] = useState(false);
  const [programmes, setProgrammes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [programmeSelected, setProgrammeSelected] = useState({});
  const [statistics, setStatistics] = useState([]);
  const showModal = () => {
    setProgrammeSelected({ _id: "0000" });
    setIsModalVisible(true);
  };

  async function getProgrammes() {
    const currentUser = authService.getCurrentUser();
    await getAllProgrammeApi({ creacteBy: currentUser.id })
      .then((response) => {
        setProgrammes(response.data);
        setLoading(true);
      })
      .catch(() => {});
  }
  async function getStatistics() {
    await getAllStatisticsApi()
      .then((response) => {
        setStatistics(response.data);
        setLoading(true);
      })
      .catch(() => {});
  }
  useEffect(() => {
    getProgrammes();
    getStatistics();
  }, []);
  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: "right" }}>
        create new programme
      </Button>
      <div className="site-card-wrapper">
        {loading && (
          <Row gutter={16}>
            {programmes.map((programme) => (
              <ProgrammeCard
                programme={programme}
                loading={loading}
                key={programme._id}
                programmes={programmes}
                setProgrammes={setProgrammes}
                setLoading={setLoading}
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
                setProgrammeSelected={setProgrammeSelected}
              />
            ))}
          </Row>
        )}
      </div>
      {loading && (
        <ProgrammeForm
          key={programmeSelected._id}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          setProgrammes={setProgrammes}
          programmes={programmes}
          setLoading={setLoading}
          loading={loading}
          programmeSelected={programmeSelected}
          statistics={statistics}
        />
      )}
    </>
  );
};
export default Programmes;
