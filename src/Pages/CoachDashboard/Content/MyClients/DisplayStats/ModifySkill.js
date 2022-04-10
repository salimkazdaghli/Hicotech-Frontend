import { Modal, Form, Row, Col, InputNumber, DatePicker, Radio } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { updateObjectiveSkillByCoachAndPlayerApi } from "../../../../../Services/objectiveService";

const ModifySkill = ({
  modalVisible,
  setModalVisible,
  dataToEdit,
  objectiveData,
  setAlert,
  setRerender,
  rerender,
}) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [form] = Form.useForm();
  const [ModifiedStat, setModifiedStat] = useState();
  useEffect(() => {
    form.setFieldsValue({
      value: dataToEdit.value,
      beforeDate: moment(dataToEdit.beforeDate),
      done: dataToEdit.done,
    });
    setModifiedStat({
      value: dataToEdit.value,
      beforeDate: dataToEdit.beforeDate,
      done: dataToEdit.done,
    });
  }, [dataToEdit]);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 100);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setRerender(!rerender);
  };
  const onModifySkill = (values) => {
    setModifiedStat(values);
    setConfirmLoading(true);
    updateObjectiveSkillByCoachAndPlayerApi(
      objectiveData._id,
      dataToEdit._id,
      values
    )
      .then(({ data }) => {
        setAlert(data);
        setTimeout(() => {
          setAlert(null);
        }, 1400);
      })
      .catch((err) => {
        if (err && err.response && err.response.data.error) {
          setAlert(err.response.data.error);
          setTimeout(() => {
            setAlert(null);
          }, 1400);
        } else {
          setAlert({ type: "error", message: "erreur de serveur" });
        }
      })
      .finally(() => {
        setModalVisible(false);
        setRerender(!rerender);
        form.resetFields();
      });
    // setLoading(true);
    // addSkillApi(newStatistic).then(({ data: { message, data } }) => {
    //   setConfirmLoading(false);
    //   // setStatData(...statData, data);
    //   setShowModal(!showModal);
    //   resetStatForm();
    //   setStatData((pre) => [data, ...pre]);
    //   setLoading(false);
    //   setAlert(message, 2000);
    // });
  };

  return (
    <Modal
      visible={modalVisible}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      title="Modifier une compétence"
      okText="Modifier"
      cancelText="Annuler"
      okButtonProps={{
        form: "competence-update-form",
        key: "ok",
        htmlType: "submit",
      }}
      onOk={handleOk}
      centered
      width={700}
    >
      <Form
        id="competence-update-form"
        layout="vertical"
        form={form}
        onFinish={onModifySkill}
      >
        {/* row one */}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Valeur"
              name="value"
              rules={[
                {
                  required: true,
                  message: "entrer la valeur du statistique à atteindre!",
                },
              ]}
            >
              <InputNumber placeholder="Valeur statistique" />
            </Form.Item>
          </Col>
        </Row>
        {/* row two */}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Avant la date :"
              name="beforeDate"
              rules={[
                {
                  required: true,
                  message: "entrer la date pour atteindre ce but!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              label="atteint :"
              name="done"
              rules={[
                {
                  required: true,
                  message: "entrer la date pour atteindre ce but!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value={false}>Non</Radio>
                <Radio value>Oui</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default ModifySkill;
