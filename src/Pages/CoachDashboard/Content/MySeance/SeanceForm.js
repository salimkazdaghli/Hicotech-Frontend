import React from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  addSeanceApi,
  updateSeanceApi,
} from "../../../../Services/SeanceService";
import authService from "../../../../Services/authService";
import notificationComponent from "../../../../Components/NotificationComponent";

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
    seanceSelected._id === "0000" ? "Creer un seance" : "Modifier un seance ";
  const modalBtnText = seanceSelected._id === "0000" ? "Creer" : "Modifier";

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
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "email est requis",
            },
          ]}
        >
          <Input placeholder="title" />
        </Form.Item>
        <Form.Item
          label="description "
          name="description"
          rules={[
            {
              required: true,
              message: "description est requis",
            },
          ]}
        >
          <Input placeholder="description" />
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
