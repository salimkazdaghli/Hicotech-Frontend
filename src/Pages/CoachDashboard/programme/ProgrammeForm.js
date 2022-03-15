import React from "react";
import { Modal, Form, Input } from "antd";
import { addProgrammeApi } from "../../../Services/ProgrammeService";
import authService from "../../../Services/authService";

const ProgrammeForm = (props) => {
  const [form] = Form.useForm();
  const { setIsModalVisible, isModalVisible } = props;

  const handleOk = (values) => {
    const currentUser = authService.getCurrentUser();

    const programme = {
      ...values,
      creacteBy: currentUser.id,
    };
    addProgrammeApi(programme).then(() => {
      // console.log(res)
    });
    setIsModalVisible(false);
    window.location.reload(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      visible={isModalVisible}
      title="Send Programme"
      okText="Create"
      cancelText="Cancel"
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleOk(values);
          })
          .catch(() => {
            // console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{}}
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
      </Form>
    </Modal>
  );
};
export default ProgrammeForm;
