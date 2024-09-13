import React from "react";
import { Menu } from "antd";

interface SidebarProps {
  onSelect: (key: string) => void;
  selectedKey: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect, selectedKey }) => {
  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={({ key }) => onSelect(key)}
      className="sidebar"
    >
      <Menu.Item
        key="1"
        className={`py-4 px-6 text-lg ${
          selectedKey === "1" ? "bg-blue-500 text-white" : "text-black"
        }`}
      >
        Ishlar
      </Menu.Item>
      <Menu.Item
        key="2"
        className={`py-4 px-6 text-lg ${
          selectedKey === "2" ? "bg-blue-500 text-white" : "text-black"
        }`}
      >
        Kampaniyalar
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
