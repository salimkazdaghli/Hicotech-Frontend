import { React, useEffect, useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Col, Row } from "antd";
import { addSeanceApi, updateSeanceApi } from "../../../Services/seanceService";
import authService from "../../../Services/authService";
import notificationComponent from "../../../Components/NotificationComponent";

const SeanceForm = (props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const {
    setIsModalVisible,
    isModalVisible,
    setSeances,
    seances,
    setLoading,
    seanceSelected,
    statistics,
    programme,
    player,
  } = props;
  const modalTitle =
    seanceSelected._id === "0000" ? "Nouvelle séance" : "Modifier séance";
  const modalBtnText = seanceSelected._id === "0000" ? "Ajouter" : "Modifier";

  const handleOk = (values) => {
    const currentUser = authService.getCurrentUser();
    const seance = {
      ...values,
      creacteBy: currentUser.id,
    };
    setLoading(false);
    if (seanceSelected._id === "0000") {
      addSeanceApi(seance).then((response) => {
        const { data } = response;
        seances.push(data);
        setSeances(seances);
        notificationComponent("Notification", "Ajout avec succés ");
        setLoading(true);
      });
    } else {
      updateSeanceApi(seanceSelected._id, seance).then((res) => {
        const { data } = res;
        const newSeances = seances.map((seanceItem) => {
          if (seanceItem._id === seanceSelected._id) {
            return data;
          }
          return seanceItem;
        });
        setSeances(newSeances);
        setLoading(true);
        notificationComponent("Notification", "Modification avec succés ");
      });
    }

    setIsModalVisible(false);
  };
  const [data, setData] = useState([]);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function handleChangeStatistique(value) {
    setData(value);
    console.log(`selected `, value);
  }

  return (
    <Modal
      visible={isModalVisible}
      title={modalTitle}
      okText={modalBtnText}
      cancelText="Annuler"
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleOk(values);
          })
          .catch(() => {});
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          _id: seanceSelected ? seanceSelected._id : null,
          seanceName: seanceSelected ? seanceSelected.seanceName : "",
          dateSeance: seanceSelected ? seanceSelected.dateSeance : "",
          statistics: seanceSelected ? seanceSelected.statistics : [],
          skills: seanceSelected ? seanceSelected.skills : [],
          trainingGround: seanceSelected ? seanceSelected.trainingGround : [],
          player: seanceSelected ? seanceSelected.player : [],
          programme: seanceSelected ? seanceSelected.programme : [],
        }}
      >
        <Form.Item
          name="seanceName"
          label="Titre"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <Input placeholder="Titre" />
        </Form.Item>
        <Form.Item
          name="player"
          label="Joueur"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <Select style={{ width: 160 }}>
            <Option value="1">Joueur 1</Option>
            <Option value="2">Joueur 2</Option>
            <Option value="3">joueur 3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="programme"
          label="Programme"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Ajouter un programme"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="1">Programme 1 </Option>
            <Option value="2">Programme 3</Option>
            <Option value="3">Programme 4</Option>
          </Select>

          {statistics.map((statistic) => (
            <Option key={statistic._id} value={statistic._id}>
              {statistic.statisticName}
            </Option>
          ))}
        </Form.Item>

        <Form.Item
          label="Date de séance "
          name="dateSeance"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <DatePicker format="YYYY/MM/DD" style={{ display: "flex" }} />
        </Form.Item>
        <Form.Item
          label="Statistiques"
          name="statistics"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Ajouter des statistiques"
            defaultValue={[]}
          >
            {statistics.map((statistic) => (
              <Option key={statistic._id} value={statistic._id}>
                {statistic.statisticName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default SeanceForm;
