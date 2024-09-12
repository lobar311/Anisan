import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import GenreTable from "./components/Sidebar/BrandTable/index";
import MoviesTable from "./components/Sidebar/ContractsTable/index";
import Header from "./components/Sidebar/Header";
import { Provider } from "react-redux";
import { store } from "../src/components/Sidebar/store";
import "./App.css";

const { Content, Sider } = Layout;

const App = () => {
  const [selectedKey, setSelectedKey] = useState<string>("1");
  const [searchText, setSearchText] = useState<string>("");

  const handleMenuSelect = (key: string) => {
    setSelectedKey(key);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleAdd = () => {};

  return (
    <Provider store={store}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={200} className="bg-gray-100">
          <Sidebar onSelect={handleMenuSelect} selectedKey={selectedKey} />
        </Sider>
        <Layout>
          <Header
            searchText={searchText}
            onSearch={handleSearch}
            onChange={handleInputChange}
            onAdd={handleAdd}
            activeMenuKey={selectedKey}
          />
          <Content style={{ padding: "20px" }}>
            {selectedKey === "1" && <GenreTable searchText={searchText} />}
            {selectedKey === "2" && <MoviesTable searchText={searchText} />}
          </Content>
        </Layout>
      </Layout>
    </Provider>
  );
};

export default App;
