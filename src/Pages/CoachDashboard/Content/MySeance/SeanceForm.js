import React from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";

import {
  addSeanceApi,
  updateSeanceApi,
} from "../../../../Services/SeanceService";
import authService from "../../../../Services/authService";
import notificationComponent from "../../../../Components/NotificationComponent";

const dateFormat = "YYYY-MM-DD HH:mm";

const { Option } = Select;
const SeanceForm = (props) => {
  const [form] = Form.useForm();
  const {
    setIsModalVisible,
    isModalVisible,
    setSeances,
    seances,
    setLoading,
    seanceSelected,
  } = props;
  const modalTitle =
    seanceSelected._id === "0000"
      ? "Ajouter une séance"
      : "Modifier une séance ";
  const modalBtnText = seanceSelected._id === "0000" ? "Ajouter" : "Modifier";
  const worker = moment(seanceSelected.dateEvent);
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
        notificationComponent("Notification", "Seance ajoute ");
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
        notificationComponent("Notification", "Seance update ");
      });
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
          seanceName: seanceSelected ? seanceSelected.seanceName : null,

          dateSeance: worker,
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
          label="Date séance "
          name="dateSeance"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <DatePicker
            showTime
            format={dateFormat}
            style={{ display: "flex" }}
          />
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
          <Select showSearch placeholder="Sélectionner joueur ">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="seance"
          label="Seance"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <Select showSearch placeholder="Sélectionner joueur ">
            <Option value="jack">P1</Option>
            <Option value="lucy">P2</Option>
            <Option value="tom">P3</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="statistics"
          label="Statistiques"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <Select mode="multiple" showSearch placeholder="Sélectionner joueur ">
            <Option value="jack">P1</Option>
            <Option value="lucy">P2</Option>
            <Option value="tom">P3</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="lieu"
          label="Lieu"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <Input placeholder="Lieu séance.." />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default SeanceForm;
