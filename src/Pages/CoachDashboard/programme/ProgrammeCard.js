import React from "react";
import { Card, Col, Skeleton } from "antd";
import { StopOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteProgrammeApi } from "../../../Services/ProgrammeService";
import notificationComponent from "../../../Components/NotificationComponent";

const ProgrammeCard = (props) => {
  const { Meta } = Card;
  const {
    programme,
    loading,
    programmes,
    setProgrammes,
    setLoading,
    setIsModalVisible,
    setProgrammeSelected,
  } = props;
  const { title, description } = programme;

  const onDelete = () => {
    setLoading(false);
    deleteProgrammeApi(programme._id).then(() => {
      setProgrammes(
        programmes.filter(
          (programmeItem) => programmeItem._id !== programme._id
        )
      );
      setLoading(true);
      notificationComponent("notification", "delete");
    });
  };

  const onUpdate = () => {
    setProgrammeSelected(programme);
    setIsModalVisible(true);
  };
  return (
    <Col span={8} key={programme._id}>
      <Skeleton loading={!loading} avatar active>
        <Card
          actions={[
            <DeleteOutlined
              key="delete"
              onClick={onDelete}
              style={{ color: "#e11111" }}
            />,
            <StopOutlined
              key="stop"
              onClick={onUpdate}
              style={{ color: "#ffcd00" }}
            />,
          ]}
          hoverable
          style={{ width: 320, marginTop: 40 }}
          cover={
            <img
              alt="example"
              src="https://www.lequipe.fr/_medias/img-photo-jpg/mar-13-2022-indian-wells-ca-usa-matteo-berrettini-ita-hits-a-shot-during-his-third-round-match-as-he-defeated-holger-rune-den-at-the-bnp-paribas-open-at-the-indian-wells-tennis-garden-mandatory-credit-jayne-kamin-oncea-usa-today-sports-local-caption/1500000001618318/0-828-552-75/fe714.jpg"
            />
          }
        >
          <Meta title={title} description={description} />
        </Card>
      </Skeleton>
    </Col>
  );
};
export default ProgrammeCard;
