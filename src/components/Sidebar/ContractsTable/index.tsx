/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { Button, Card, Modal, Form, Input, Dropdown, Select, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteContract, editContract } from "../store/slices/contractsSlice";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";

interface Company {
  id: number;
  name: string;
  image: string;
  description: string;
  genre: string;
}

interface Job {
  id: number;
  name: string;
  date: string;
  genre: string;
  img: string;
  description: string;
}

interface ContractsPageProps {
  searchText: string;
}

const genres: Company[] = [
  // {
  //   id: 1,
  //   name: "yangi ishchi",
  //   image: "https://xabar.uz/static/crop/2/6/920__95_2675552507.jpg",
  //   description: "ichiga oladi.",
  //   genre: "kardiolg",
  // },
];

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
`;

const cardStyle = css`
  position: relative;
  cursor: pointer;
  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  .actions-container {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }
  .ant-card-cover {
    overflow: hidden;
    height: 400px;
    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    
    }
   
`;

const selectStyle = css`
  margin-bottom: 16px;
`;

const ContractsPage: React.FC<ContractsPageProps> = ({ searchText }) => {
  const dispatch = useDispatch();
  const contracts = useSelector(
    (state: RootState) => state.contracts.contracts
  );

  const [editingContract, setEditingContract] = useState<Job | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(
    undefined
  );

  const filteredContracts = contracts.filter((contract) =>
    contract.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (record: Job) => {
    setEditingContract(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteContract(id));
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingContract(null);
  };

  const handleSubmit = (values: any) => {
    if (editingContract) {
      dispatch(editContract({ ...editingContract, ...values }));
      handleCloseModal();
    }
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value);
  };

  const menu = (contract: Job) => (
    <Menu>
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleEdit(contract)}
      >
        Edet
      </Menu.Item>
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        onClick={() => handleDelete(contract.id)}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div css={gridStyle}>
        {filteredContracts
          .filter(
            (contract) => !selectedGenre || contract.genre === selectedGenre
          )
          .map((contract) => (
            <Card
              key={contract.id}
              title={contract.name}
              cover={<img alt="example" src={contract.img} />}
              css={cardStyle}
            >
              <div className="actions-container">
                <Dropdown overlay={menu(contract)} trigger={["click"]}>
                  <Button icon={<MoreOutlined />} />
                </Dropdown>
              </div>
              <p>Date: {contract.date}</p>
              <p>Genre: {contract.genre}</p>
            </Card>
          ))}
      </div>

      <Modal
        visible={isModalVisible}
        title="Edit Contract"
        okText="Save"
        cancelText="Cancel"
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the customer name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[
              { required: true, message: "Please input the order date!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="genre"
            label="Genre"
            rules={[{ required: true, message: "Please select the genre!" }]}
          ></Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the customer description!",
              },
            ]}
          ></Form.Item>

          <Form.Item
            name="img"
            label="Image URL"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContractsPage;
