import React, { useState, useEffect } from "react";
import { Row, Button } from "antd";
import { getAllProgrammeApi } from "../../../Services/ProgrammeService";
import ProgrammeCard from "./ProgrammeCard";
import ProgrammeForm from "./ProgrammeForm";
import authService from "../../../Services/authService";

const Programmes = () => {
  const [loading, setLoading] = useState(false);
  const [programmes, setProgrammes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
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
  useEffect(() => {
    getProgrammes();
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
              />
            ))}
          </Row>
        )}
        ;
      </div>
      <ProgrammeForm
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        setProgrammes={setProgrammes}
        programmes={programmes}
        setLoading={setLoading}
        loading={loading}
      />
    </>
  );
};
export default Programmes;
