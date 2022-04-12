import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, List, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import authService from "../../../../../Services/authService";
import { deleteObjectiveSkillByCoachAndPlayerApi } from "../../../../../Services/objectiveService";
import ModifySkill from "./ModifySkill";

const StatisticObjective = ({
  objectiveData,
  setAlert,
  player,
  setRerender,
  rerender,
}) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});
  const showModal = (item) => {
    setDataToEdit(item);
    setModalVisible(true);
  };
  const handleDelete = (id) => {
    setLoading(true);
    deleteObjectiveSkillByCoachAndPlayerApi(id, {
      creactedBy: authService.getCurrentUser().id,
      player: player._id,
    }).then(({ data }) => {
      setAlert(data);
      setTimeout(() => {
        setLoading(null);
        setRerender(!rerender);
      }, 750);
    });
  };
  return (
    <>
      <ModifySkill
        setRerender={setRerender}
        rerender={rerender}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        dataToEdit={dataToEdit}
        objectiveData={objectiveData}
        setAlert={setAlert}
      />
      <Spin spinning={loading}>
        <List
          size="large"
          rowKey={uuidv4()}
          header={<Title level={5}>Liste des Compétences :</Title>}
          bordered
          dataSource={objectiveData.skills}
          renderItem={(item) => (
            <List.Item
              actions={[
                <>
                  <Button
                    onClick={() => showModal(item)}
                    type="link"
                    icon={<EditOutlined />}
                    size="middle"
                  />
                  <Button
                    type="link"
                    onClick={() => handleDelete(item._id)}
                    icon={
                      <DeleteOutlined
                        style={{
                          color: "red",
                          fontSize: "16px",
                        }}
                      />
                    }
                    size="middle"
                  />
                </>,
              ]}
            >
              <List.Item.Meta
                title={`atteindre ${item.value} étoile en ${item.skill.skillName}`}
                description={`avant le ${moment(item.beforeDate).format(
                  "DD/MM/YYYY"
                )}`}
              />
              {item.done ? (
                <>
                  <CheckOutlined style={{ color: "green" }} />
                  <span> achevé</span>
                </>
              ) : (
                <>
                  <CloseOutlined style={{ color: "#e11111" }} />
                  <span> non achevé</span>
                </>
              )}
            </List.Item>
          )}
        />
      </Spin>
    </>
  );
};

export default StatisticObjective;
