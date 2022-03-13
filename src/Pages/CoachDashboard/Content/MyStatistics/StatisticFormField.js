import { useState } from "react";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { addStatisticApi } from "../../../../Services/StatisticService";

const StatisticFormField = ({
  showModal,
  setShowModal,
  setLoading,
  setStatData,
  setAlertMessage,
  setShowAlert,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form2] = Form.useForm();
  const [newStatistic, setNewStatistic] = useState({
    statisticName: "",
    statisticType: "",
    unit: "",
    description: "",
  });
  const setAlert = (msg, duration) => {
    setAlertMessage(msg);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, duration);
  };
  const resetStatForm = () => {
    form2.resetFields();
    setNewStatistic({
      statisticName: "",
      statisticType: "",
      unit: "",
      description: "",
    });
  };
  const onAddSTats = () => {
    setConfirmLoading(true);
    setLoading(true);
    addStatisticApi(newStatistic).then(({ data: { message, data } }) => {
      setConfirmLoading(false);
      // setStatData(...statData, data);
      setShowModal(!showModal);
      resetStatForm();
      setStatData((pre) => [data, ...pre]);
      setLoading(false);
      setAlert(message, 2000);
    });
  };
  return (
    <Modal
      title="Ajouter une nouvelle statistique"
      visible={showModal}
      okText="Ajouter"
      cancelText="Annuler"
      confirmLoading={confirmLoading}
      okButtonProps={{
        form: "statistic-editor-form",
        key: "ok",
        htmlType: "submit",
      }}
      onCancel={() => {
        setShowModal(!showModal);
        resetStatForm();
      }}
      onOk={() => form2.validateFields()}
      centered
      width={700}
    >
      <Form
        id="statistic-editor-form"
        initialValues={{
          statisticName: "",
          statisticType: "",
          unit: "",
          description: "",
        }}
        form={form2}
        onFinish={onAddSTats}
      >
        {/* row one */}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Nom statistique"
              name="statisticName"
              rules={[
                {
                  required: true,
                  message: "entrer le nom du statistique!",
                },
              ]}
            >
              <Input
                placeholder="Nom statistique"
                onChange={(e) => {
                  setNewStatistic((pre) => ({
                    ...pre,
                    statisticName: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="type"
              name="statisticType"
              rules={[
                {
                  required: true,
                  message: "entrer le type du statistique!",
                },
              ]}
            >
              <Select
                placeholder="type statistique"
                onChange={(value) =>
                  setNewStatistic((prev) => ({
                    ...prev,
                    statisticType: value,
                  }))
                }
              >
                <Select.Option key="compteur" value="compteur">
                  compteur
                </Select.Option>
                <Select.Option key="timer" value="timer">
                  timer
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* row two */}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="l'unité"
              name="unit"
              rules={[
                {
                  required: true,
                  message: "entrer l'unité du statistique!",
                },
              ]}
            >
              <Input
                placeholder="l'unité de mesure"
                onChange={(e) => {
                  setNewStatistic((pre) => ({
                    ...pre,
                    unit: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Lien"
              name="lien"
              rules={[
                {
                  required: true,
                  message: "entrer le lien associé au statistique!",
                },
              ]}
            >
              <Input
                placeholder="lien associé à cette statistique"
                onChange={(e) => {
                  setNewStatistic((pre) => ({
                    ...pre,
                    lien: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "entrer la description associé au statistique!",
                },
              ]}
            >
              <TextArea
                placeholder="description du statistique"
                autoSize={{ minRows: 2, maxRows: 3 }}
                onChange={(e) => {
                  setNewStatistic((pre) => ({
                    ...pre,
                    description: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default StatisticFormField;
