import React from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import { addDefiApi, updateDefiApi } from "../../Services/DefiService";
import authService from "../../Services/authService";
import notificationComponent from "../../Components/NotificationComponent";

const DefiForm = (props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const {
    setIsModalVisible,
    isModalVisible,
    setDefis,
    defis,
    setLoading,
    defiSelected,
  } = props;
  const modalTitle =
    defiSelected._id === "0000" ? "Ajouter un défi" : "Modifier un defi ";
  const modalBtnText = defiSelected._id === "0000" ? "Créer" : "Modifier";

  const handleOk = (values) => {
    const currentUser = authService.getCurrentUser();
    const defi = {
      ...values,
      creacteBy: currentUser.id,
    };
    setLoading(false);
    if (defiSelected._id === "0000") {
      addDefiApi(defi).then((response) => {
        const { data } = response;
        defi.push(data);
        setDefis(defis);
        notificationComponent("Notification", "défi est ajouté ");
        setLoading(true);
      });
    } else {
      updateDefiApi(defiSelected._id, defi).then((res) => {
        const { data } = res;
        const newDefis = defis.map((defiItem) => {
          if (defiItem._id === defiSelected._id) {
            return data;
          }
          return defiItem;
        });
        setDefis(newDefis);
        setLoading(true);
        notificationComponent("Notification", "Modification avec succés ");
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
          _id: defiSelected ? defiSelected._id : null,
          defiName: defiSelected ? defiSelected.title : "test",
          description: defiSelected ? defiSelected.description : "test",
          defiObjectif: defiSelected ? defiSelected.defiObjectif : "test",
          defiLien: defiSelected ? defiSelected.defiLien : "",
          dateExpiration: defiSelected ? defiSelected.dateExpiration : "",
        }}
      >
        <Form.Item
          name="defiName"
          label="Nom défi"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire ",
            },
          ]}
        >
          <Input placeholder="Défi" />
        </Form.Item>
        <Form.Item
          label="Objectif"
          name="defiObjectif"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <Input.TextArea placeholder="Objectif de défi" />
        </Form.Item>
        <Form.Item
          label="Lien vidéo"
          name="defiLien"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire ",
            },
          ]}
        >
          <Input placeholder="https://www.youtube.com/" />
        </Form.Item>
        <Form.Item
          label="Date d'expiration "
          name="dateExpiration"
          rules={[
            {
              required: true,
              message: "Ce champs est obligatoire",
            },
          ]}
        >
          <DatePicker format="YYYY/MM/DD" style={{ display: "flex" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default DefiForm;
