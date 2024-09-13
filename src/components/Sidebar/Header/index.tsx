/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { Input, Button, Modal, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addBrand } from "../store/slices/brandsSlice";
import { addContract } from "../store/slices/contractsSlice";

const headerStyle = css`
  background-color: #3f51b5;
  padding: 10px;
  color: white;
  display: flex;
  justify-content: space-between;
`;

interface HeaderProps {
  searchText: string;
  onSearch: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  activeMenuKey: string;
}

const Header: React.FC<HeaderProps> = ({
  searchText,
  onSearch,
  onChange,
  onAdd,
  activeMenuKey,
}) => {
  const [isBrandModalVisible, setIsBrandModalVisible] = useState(false);
  const [isContractModalVisible, setIsContractModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const showBrandModal = () => {
    setIsBrandModalVisible(true);
  };

  const showContractModal = () => {
    setIsContractModalVisible(true);
  };

  const handleBrandCancel = () => {
    setIsBrandModalVisible(false);
  };

  const handleContractCancel = () => {
    setIsContractModalVisible(false);
  };

  const handleAddBrand = (values: any) => {
    dispatch(
      addBrand({ id: Date.now(), name: values.name, image: values.image })
    );
    form.resetFields();
    setIsBrandModalVisible(false);
    setTimeout(() => window.location.reload(), 500);
  };

  const handleAddContract = (values: any) => {
    dispatch(
      addContract({
        id: Date.now(),
        name: values.name,
        date: values.date,
        genre: values.genre,
        img: values.img,
        description: values.description,
      })
    );
    form.resetFields();
    setIsContractModalVisible(false);
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <div css={headerStyle}>
      <h1>{activeMenuKey === "1" ? "Ishchi" : "Kampaniya"}</h1>
      <div>
        {activeMenuKey === "1" && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showBrandModal}
          >
            ishchi qoshish
          </Button>
        )}
        {activeMenuKey === "2" && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showContractModal}
          >
            Kampaniya qoshish
          </Button>
        )}
        <Input.Search
          placeholder="Search..."
          style={{ width: 200, marginLeft: 20 }}
          value={searchText}
          onChange={onChange}
          onSearch={onSearch}
        />
        <Modal
          title="Add New Brand"
          visible={isBrandModalVisible}
          onCancel={handleBrandCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleAddBrand} layout="vertical">
            <Form.Item
              name="name"
              label="Brand Name"
              rules={[
                { required: true, message: "Please enter the brand name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image URL"
              rules={[
                { required: true, message: "Please enter the image URL!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Add New Contract"
          visible={isContractModalVisible}
          onCancel={handleContractCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleAddContract} layout="vertical">
            <Form.Item
              name="name"
              label="Contract Name"
              rules={[
                { required: true, message: "Please enter the contract name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="date"
              label="Date"
              rules={[
                { required: true, message: "Please enter the contract date!" },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              name="genre"
              label="Genre"
              rules={[
                { required: true, message: "Please enter the contract genre!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="img"
              label="Image URL"
              rules={[
                { required: true, message: "Please enter the image URL!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Qo'shish
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Header;
