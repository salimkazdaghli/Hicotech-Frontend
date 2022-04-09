import React from "react";
import { Modal, Form, Input, Upload, Button, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";

import {
  addSeanceApi,
  updateSeanceApi,
} from "../../../../Services/SeanceService";
import authService from "../../../../Services/authService";
import notificationComponent from "../../../../Components/NotificationComponent";

const dateFormat = "YYYY/MM/DD";
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

  const handleOk = (values) => {
    const currentUser = authService.getCurrentUser();
    const seance = {
      ...values,
      image: values.image.fileList[0].thumbUrl,
      creacteBy: currentUser.id,
    };
    setLoading(false);
    if (seanceSelected._id === "0000") {
      addSeanceApi(seance).then((response) => {
        const { data } = response;
        seances.push(data);
        setSeances(seances);
        notificationComponent("Notification", "Séance est ajouté ");
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
        notificationComponent("Notification", "Séance est modifié ");
      });
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /* eslint-disable react/jsx-props-no-spreading */
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
          title: seanceSelected ? seanceSelected.title : null,
          description: seanceSelected ? seanceSelected.description : null,
          videoLink: seanceSelected ? seanceSelected.videoLink : null,
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
          <DatePicker format={dateFormat} style={{ display: "flex" }} />
        </Form.Item>

        <Form.Item name="videoLink" label="lien video" rules={[]}>
          <Input placeholder="lien video" />
        </Form.Item>
        <Form.Item name="image" rules={[]}>
          <Upload listType="picture" beforeupload={false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default SeanceForm;
