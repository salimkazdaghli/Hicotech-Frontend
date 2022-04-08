import React from "react";
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { addEventApi, updateEventApi } from "../../../Services/EventService";
import authService from "../../../Services/authService";
import notificationComponent from "../../../Components/NotificationComponent";

const EventForm = (props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const {
    setIsModalVisible,
    isModalVisible,
    setEvents,
    events,
    setLoading,
    eventSelected,
  } = props;
  const modalTitle =
    eventSelected._id === "0000"
      ? "Créer un nouveau évenement"
      : "Modifier un évenement ";
  const modalBtnText = eventSelected._id === "0000" ? "Créer" : "Modifier";

  const handleOk = (values) => {
    const currentUser = authService.getCurrentUser();
    const event = {
      ...values,
      creacteBy: currentUser.id,
    };
    setLoading(false);
    if (eventSelected._id === "0000") {
      addEventApi(event).then((response) => {
        const { data } = response;
        events.push(data);
        setEvents(events);
        notificationComponent("Notification", "Event ajoute ");
        setLoading(true);
      });
    } else {
      updateEventApi(eventSelected._id, event).then((res) => {
        const { data } = res;
        const newEvents = events.map((eventItem) => {
          if (eventItem._id === eventSelected._id) {
            return data;
          }
          return eventItem;
        });
        setEvents(newEvents);
        setLoading(true);
        notificationComponent("Notification", "Event modifié ");
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
          _id: eventSelected ? eventSelected._id : null,
          title: eventSelected ? eventSelected.title : "test",
          description: eventSelected ? eventSelected.description : "test",
          etat: eventSelected ? eventSelected.etat : "",
        }}
      >
        <Form.Item
          name="title"
          label="Titre"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <Input placeholder="Titre " />
        </Form.Item>
        <Form.Item
          label="Description "
          name="description"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <Input placeholder="Description de l'évenement" />
        </Form.Item>
        <Form.Item label="Etats" name="Visibilité" rules={[]}>
          <Select
            mode="simple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={[]}
            rules={[
              {
                required: true,
                message: "Ce champs est obligatoire",
              },
            ]}
          >
            <Select.Option value="Pour Tous">Pour Tous</Select.Option>
            <Select.Option value="Mes Joueurs">Mes Joueurs</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date de l'évenement "
          name="dateEvent"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <DatePicker format="YYYY/MM/DD" style={{ display: "flex" }} />
        </Form.Item>
        <Button type="primary" icon={<DownloadOutlined />}>
          Télecharger Affiche
        </Button>
      </Form>
    </Modal>
  );
};
export default EventForm;
