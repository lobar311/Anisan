/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { Button, Card, Modal, Form, Input, Dropdown, Select, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteContract, editContract } from "../store/slices/contractsSlice";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";

interface Genre {
  id: number;
  name: string;
  image: string;
  description: string;
  genre: string;
}

interface Contract {
  id: number;
  name: string;
  date: string;
  genre: string;
  img: string;
}

interface ContractsPageProps {
  searchText: string;
}

const genres: Genre[] = [
  {
    id: 1,
    name: "Fantastika",
    image: "https://asilmedia.org/rasmlar/images/2023/05/21/T6UJUJT6YUJ.jpg",
    description:
      "Fantastika janri o'ziga xos va ixtiroiy elementlarni o'z ichiga olgan hikoyalar va filmlarni o'z ichiga oladi.",
    genre: "Fantastika",
  },
  {
    id: 2,
    name: "Urush",
    image:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/76ea94a0-c0aa-4199-93ca-fe81b5534965/600x900",
    description:
      "Urush janri tarixiy voqealar va urushlarning hikoyalarini tasvirlaydi, janglar va strategiyalarni o'z ichiga oladi.",
    genre: "Urush",
  },
  {
    id: 3,
    name: "Jangari",
    image:
      "https://www.afisha.uz/uploads/media/2024/06/3016498ef7d512e319ad78e028b49edc_s.jpg",
    description:
      "Jangari janr aksiyalar va janglar bilan to'ldirilgan, tezkor harakat va qiziqarli sarguzashtlarni o'z ichiga oladi.",
    genre: "Jangari",
  },
  {
    id: 4,
    name: "Romantik",
    image: "https://example.com/romantic.jpg",
    description:
      "Romantik janr sevgi va munosabatlarga bag'ishlangan hikoyalarni o'z ichiga oladi.",
    genre: "Romantik",
  },
  {
    id: 5,
    name: "Triller",
    image: "https://example.com/thriller.jpg",
    description:
      "Triller janri yuqori darajadagi hayajon va tashvishlarni tasvirlaydi.",
    genre: "Triller",
  },
  {
    id: 6,
    name: "Drama",
    image: "https://example.com/drama.jpg",
    description:
      "Drama janri insoniy tajribalar va emosiyalarni chuqurroq o'rganadi.",
    genre: "Drama",
  },
  {
    id: 7,
    name: "Komediya",
    image: "https://example.com/comedy.jpg",
    description:
      "Komediya janri kulgili va o'yin-kulgi elementlarini o'z ichiga oladi.",
    genre: "Komediya",
  },
  {
    id: 8,
    name: "Sarguzasht",
    image: "https://example.com/adventure.jpg",
    description:
      "Sarguzasht janri qiziqarli va hayajonli sarguzashtlarni o'z ichiga oladi.",
    genre: "Sarguzasht",
  },
  {
    id: 9,
    name: "Horror",
    image: "https://example.com/horror.jpg",
    description: "Horror janri qo'rquv va vahima yaratishga qaratilgan.",
    genre: "Horror",
  },
  {
    id: 10,
    name: "Detektiv",
    image: "https://example.com/detective.jpg",
    description:
      "Detektiv janri sirli voqealarni va ularni hal qilish jarayonini tasvirlaydi.",
    genre: "Detektiv",
  },
  {
    id: 11,
    name: "Biografiya",
    image: "https://example.com/biography.jpg",
    description:
      "Biografiya janri real insonlar hayoti va tajribalari haqida hikoyalar o'z ichiga oladi.",
    genre: "Biografiya",
  },
  {
    id: 12,
    name: "Muzikal",
    image: "https://example.com/musical.jpg",
    description: "Muzikal janri musiqiy va raqsli sahnalarni o'z ichiga oladi.",
    genre: "Muzikal",
  },
  {
    id: 13,
    name: "Dokumental",
    image: "https://example.com/documentary.jpg",
    description: "Dokumental janri real voqealarni va faktlarni tasvirlaydi.",
    genre: "Dokumental",
  },
  {
    id: 14,
    name: "Felsefi",
    image: "https://example.com/philosophical.jpg",
    description:
      "Felsefi janri insoniy tafakkur va falsafiy masalalarni o'rganadi.",
    genre: "Felsefi",
  },
  {
    id: 15,
    name: "Tadqiqot",
    image: "https://example.com/research.jpg",
    description:
      "Tadqiqot janri ilmiy va tadqiqot asosida yaratilgan hikoyalarni o'z ichiga oladi.",
    genre: "Tadqiqot",
  },
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
    height: 350px;
    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
      transition: transform 0.3s ease;
    }
    &:hover img {
      transform: scale(1.1);
    }
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

  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(
    undefined
  );

  const filteredContracts = contracts.filter((contract) =>
    contract.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (record: Contract) => {
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

  const menu = (contract: Contract) => (
    <Menu>
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleEdit(contract)}
      >
        Edit
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
      <Select
        css={selectStyle}
        placeholder="Select Genre"
        onChange={handleGenreChange}
        value={selectedGenre}
      >
        <Select.Option value={undefined}>Barchasi</Select.Option>{" "}
        {genres.map((genre) => (
          <Select.Option key={genre.id} value={genre.genre}>
            {genre.name}
          </Select.Option>
        ))}
      </Select>

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
          >
            <Select>
              <Select.Option value={undefined}>Barchasi</Select.Option>
              {genres.map((genre) => (
                <Select.Option key={genre.id} value={genre.genre}>
                  {genre.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
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
