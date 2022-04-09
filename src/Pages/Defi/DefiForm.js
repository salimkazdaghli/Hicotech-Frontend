import React from "react";
import { Col, Modal, Form, Input, Select, Row, Radio } from "antd";

import { addDefiApi, updateDefiApi } from "../../Services/defiService";
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
    defiSelected._id === "0000"
      ? "Ajouter un nouveau défi"
      : "Modifier un défi ";
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
        defis.push(data);
        setDefis(defis);
        notificationComponent("Notification", "Défi ajouté avec succés ");
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
        notificationComponent("Notification", "Défi modifié avec succés ");
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
          defiName: defiSelected ? defiSelected.defiName : "test",
          defiObjectif: defiSelected ? defiSelected.defiObjectif : "test",
          defiLien: defiSelected ? defiSelected.defiLien : "",
          dateExpiration: defiSelected ? defiSelected.dateExpiration : "",
          defiVisible: defiSelected ? defiSelected.defiVisible : "",
        }}
      >
        <Form.Item
          label="Le nom "
          name="defiName"
          rules={[
            {
              required: true,
              message: "Ce champs est requis",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Objectif "
          name="defiObjectif"
          rules={[
            {
              required: true,
              message: "Ce champs est requis",
            },
          ]}
        >
          <Input placeholder="Le but ..." />
        </Form.Item>
        <Form.Item
          label="Lien Vidéo "
          name="defiLien"
          rules={[
            {
              required: true,
              message: "Ce champs est requis",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
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
        </Form.Item> */}
        <Row>
          <Col>
            <Form.Item
              label="Visible :"
              name="defiVisible"
              initialValue="defiVisible"
              rules={[
                {
                  required: true,
                  message: "selectionner la visibilité de défi",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="false">Non</Radio>
                <Radio value="true">Oui</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <br />
      </Form>
    </Modal>
  );
};
export default DefiForm;
