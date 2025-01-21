import React from "react";
import {
  Card,
  Col,
  Row,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
} from "antd";

function AddExpense({ isExpenseModalVisible, handleExpenseCancel, onFinish }) {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={isExpenseModalVisible}
      style={{ fontWeight: 600 }}
      title="Add Expense"
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input"></Input>
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the expense amount!",
            },
          ]}
        >
          <Input type="number" className="custom-input"></Input>
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select the expense date!",
            },
          ]}
        >
          <DatePicker className="custom-input" format="YYYY-MM-DD"></DatePicker>
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Please select the a tag!",
            },
          ]}
        >
          <Select className="select-input-2">
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="transport">Transport</Select.Option>
            <Select.Option value="friend">Friend</Select.Option>
            <Select.Option value="office">Office</Select.Option>
            <Select.Option value="houserent">House Rent</Select.Option>
            <Select.Option value="gym">Gym</Select.Option>
            <Select.Option value="medicine">Medicine</Select.Option>
            <Select.Option value="fashion">Fashion</Select.Option>
            <Select.Option value="cosmetics">Cosmetics</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpense;
